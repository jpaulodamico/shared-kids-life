
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
  trend?: {
    value: number;
    positive: boolean;
  };
}

export function StatCard({ 
  title, 
  value, 
  description, 
  icon, 
  className,
  trend 
}: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden shadow-sm rounded-xl", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium font-montserrat">{title}</CardTitle>
        {icon && <div className="w-5 h-5 text-coparent-gray">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold font-montserrat">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1 font-inter">{description}</p>
        )}
        {trend && (
          <div className="flex items-center mt-1">
            <span className={cn(
              "text-xs font-poppins",
              trend.positive ? "text-coparent-green" : "text-destructive"
            )}>
              {trend.positive ? "+" : "-"}{trend.value}%
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
