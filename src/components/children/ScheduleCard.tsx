
import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScheduleDay } from "@/types/children";

interface ScheduleCardProps {
  schedule: ScheduleDay[];
}

export const ScheduleCard = ({ schedule }: ScheduleCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Horário Semanal
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg divide-y">
          {schedule.map((day, index) => (
            <div key={index} className="flex p-3">
              <div className="font-medium w-24">{day.day}</div>
              <div className="flex-1">
                <ul className="list-disc list-inside space-y-1">
                  {day.activities.map((activity, actIndex) => (
                    <li key={actIndex} className="text-sm">{activity}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
