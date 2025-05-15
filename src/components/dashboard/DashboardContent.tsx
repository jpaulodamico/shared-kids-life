
import { useNavigate } from "react-router-dom";
import { DashboardStats } from "./DashboardStats";
import { UpcomingEvents } from "./UpcomingEvents";
import { RecentMessages } from "./RecentMessages";
import { RecentExpenses } from "./RecentExpenses";
import { ChildProfiles } from "./ChildProfiles";

interface DashboardContentProps {
  selectedChildId: string;
}

export const DashboardContent = ({ selectedChildId }: DashboardContentProps) => {
  return (
    <>
      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingEvents selectedChildId={selectedChildId} />
        <RecentMessages selectedChildId={selectedChildId} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentExpenses selectedChildId={selectedChildId} />
        <ChildProfiles selectedChildId={selectedChildId} />
      </div>
    </>
  );
};
