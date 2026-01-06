"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface IssueTableProps {
  role: "FIELD_WORKER" | "WARD_ENGINEER" | "ZONE_OFFICER" | "SUPER_ADMIN";
}

const mockIssues = [
  {
    id: "ISS-001",
    type: "Pothole",
    location: "MG Road, Ward 12",
    status: "Open",
    priority: "High",
    reportedBy: "Field Worker #42",
    date: "2024-01-05",
  },
  {
    id: "ISS-002",
    type: "Garbage",
    location: "Sayaji Gunj, Ward 8",
    status: "In Progress",
    priority: "Medium",
    reportedBy: "Field Worker #17",
    date: "2024-01-05",
  },
  {
    id: "ISS-003",
    type: "Drainage",
    location: "Alkapuri, Ward 5",
    status: "Resolved",
    priority: "Low",
    reportedBy: "Field Worker #23",
    date: "2024-01-04",
  },
];

export default function IssueTable({ role }: IssueTableProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "in progress":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "resolved":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      default:
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "medium":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "low":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
      <div className="p-4 border-b border-white/10">
        <h2 className="text-lg font-semibold text-white">Recent Issues</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300">ID</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300">Type</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300">Location</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300">Priority</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockIssues.map((issue) => (
              <tr 
                key={issue.id} 
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                <td className="px-4 py-3 text-sm font-mono text-blue-400">{issue.id}</td>
                <td className="px-4 py-3 text-sm text-white">{issue.type}</td>
                <td className="px-4 py-3 text-sm text-slate-300">{issue.location}</td>
                <td className="px-4 py-3">
                  <Badge className={`${getStatusColor(issue.status)} border`}>
                    {issue.status}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <Badge className={`${getPriorityColor(issue.priority)} border`}>
                    {issue.priority}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  {role === "WARD_ENGINEER" && (
                    <Button size="sm" variant="default" className="text-xs">
                      Verify
                    </Button>
                  )}
                  {role === "ZONE_OFFICER" && (
                    <Button size="sm" variant="default" className="text-xs">
                      View
                    </Button>
                  )}
                  {role === "SUPER_ADMIN" && (
                    <Button size="sm" variant="default" className="text-xs">
                      Manage
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
