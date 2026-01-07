import Dexie, { Table } from 'dexie';

export interface CivicIssue {
  id?: number;
  type: string;
  description: string;
  location: {
    lat: number;
    lng: number;
    address?: string;
  };
  ward?: string;
  photos: string[]; // Base64 encoded images
  timestamp: Date;
  reportedBy: string;
  status: 'draft' | 'pending_sync' | 'synced';
  priority: 'low' | 'medium' | 'high' | 'critical';
  aiSuggestion?: string;
}

export interface Ward {
  id: number;
  name: string;
  boundaries: number[][]; // Polygon coordinates
  engineer: string;
  zone: string;
}

class CiviSenseDB extends Dexie {
  issues!: Table<CivicIssue>;
  wards!: Table<Ward>;

  constructor() {
    super('CiviSenseDB');
    this.version(1).stores({
      issues: '++id, type, timestamp, status, ward',
      wards: '++id, name, zone'
    });
  }
}

export const db = new CiviSenseDB();

// Utility functions
export const offlineStorage = {
  // Save issue offline
  async saveIssue(issue: Omit<CivicIssue, 'id'>): Promise<number> {
    return await db.issues.add(issue);
  },

  // Get all pending issues
  async getPendingIssues(): Promise<CivicIssue[]> {
    return await db.issues.where('status').equals('pending_sync').toArray();
  },

  // Get all draft issues
  async getDraftIssues(): Promise<CivicIssue[]> {
    return await db.issues.where('status').equals('draft').toArray();
  },

  // Update issue status
  async updateIssueStatus(id: number, status: CivicIssue['status']): Promise<void> {
    await db.issues.update(id, { status });
  },

  // Delete synced issues (cleanup)
  async deleteSyncedIssues(): Promise<void> {
    await db.issues.where('status').equals('synced').delete();
  },

  // Get ward by coordinates (simple point-in-polygon check)
  async getWardByLocation(lat: number, lng: number): Promise<Ward | null> {
    const wards = await db.wards.toArray();
    
    for (const ward of wards) {
      if (this.isPointInPolygon(lat, lng, ward.boundaries)) {
        return ward;
      }
    }
    return null;
  },

  // Simple point-in-polygon algorithm
  isPointInPolygon(lat: number, lng: number, polygon: number[][]): boolean {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      if (((polygon[i][1] > lng) !== (polygon[j][1] > lng)) &&
          (lat < (polygon[j][0] - polygon[i][0]) * (lng - polygon[i][1]) / (polygon[j][1] - polygon[i][1]) + polygon[i][0])) {
        inside = !inside;
      }
    }
    return inside;
  },

  // Initialize sample ward data
  async initializeWards(): Promise<void> {
    const wardCount = await db.wards.count();
    if (wardCount === 0) {
      // Sample Vadodara ward data (simplified)
      const sampleWards: Ward[] = [
        {
          id: 1,
          name: "Ward 1 - Alkapuri",
          boundaries: [[22.3072, 73.1812], [22.3100, 73.1850], [22.3050, 73.1900], [22.3020, 73.1860]],
          engineer: "Eng. Patel",
          zone: "Zone A"
        },
        {
          id: 2,
          name: "Ward 2 - Fatehgunj",
          boundaries: [[22.3100, 73.1850], [22.3150, 73.1900], [22.3120, 73.1950], [22.3080, 73.1920]],
          engineer: "Eng. Shah",
          zone: "Zone A"
        },
        // Add more wards as needed
      ];
      
      await db.wards.bulkAdd(sampleWards);
    }
  }
};