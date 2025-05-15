
import { Folder } from "lucide-react";

interface Folder {
  id: number;
  name: string;
  count: number;
}

interface FolderListProps {
  folders: Folder[];
}

export const FolderList = ({ folders }: FolderListProps) => {
  if (folders.length === 0) {
    return null;
  }

  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium text-muted-foreground mb-2">Pastas</h3>
      <div className="space-y-2">
        {folders.map((folder) => (
          <div 
            key={folder.id}
            className="flex items-center p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
          >
            <Folder className="h-8 w-8 text-family-600 mr-3" />
            <div className="flex-1 min-w-0">
              <h3 className="font-medium">{folder.name}</h3>
              <div className="text-sm text-muted-foreground">
                {folder.count} documento(s)
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
