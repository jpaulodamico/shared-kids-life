
import { ChildProfile } from "./ChildProfile";
import { ScheduleCard } from "./ScheduleCard";
import { ActivitiesCard } from "./ActivitiesCard";
import { Child, ScheduleDay } from "@/types/children";

interface ChildContentProps {
  child: Child;
  schedule: ScheduleDay[];
}

export const ChildContent = ({ child, schedule }: ChildContentProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <ChildProfile child={child} />
      
      <div className="md:col-span-2 space-y-6">
        <ScheduleCard schedule={schedule} />
        <ActivitiesCard activities={child.activities} />
      </div>
    </div>
  );
};
