
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Users } from "lucide-react";

interface ChildSelectorProps {
  selectedChildId: string;
  onSelectChild: (childId: string) => void;
  children: {
    id: string;
    name: string;
  }[];
}

export function ChildSelector({ selectedChildId, onSelectChild, children }: ChildSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <Users className="h-5 w-5 text-muted-foreground hidden sm:block" />
      <Select value={selectedChildId} onValueChange={onSelectChild}>
        <SelectTrigger className="w-[180px] bg-background">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {children.map((child) => (
            <SelectItem key={child.id} value={child.id}>
              {child.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
