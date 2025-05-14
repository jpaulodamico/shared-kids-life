
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Image, X, Upload } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
  onRemove: () => void;
  className?: string;
  disabled?: boolean;
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  className,
  disabled = false,
}: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setIsLoading(true);
      
      const reader = new FileReader();
      
      reader.onloadend = () => {
        onChange(reader.result as string);
        setIsLoading(false);
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setIsLoading(true);
      
      const reader = new FileReader();
      
      reader.onloadend = () => {
        onChange(reader.result as string);
        setIsLoading(false);
      };
      
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div
        onClick={() => !disabled && inputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative cursor-pointer rounded-md border-2 border-dashed border-muted-foreground/25 transition-colors",
          dragActive && "border-primary/50 bg-muted/50",
          disabled && "cursor-not-allowed opacity-60"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          disabled={disabled}
          className="hidden"
        />
        
        {isLoading ? (
          <div className="p-10">
            <Skeleton className="h-32 w-full" />
          </div>
        ) : value ? (
          <div className="relative">
            <AspectRatio ratio={1} className="overflow-hidden rounded-md">
              <img
                src={value}
                alt="Imagem carregada"
                className="h-full w-full object-cover"
              />
            </AspectRatio>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="absolute top-2 right-2 rounded-full bg-foreground/80 p-1 text-white shadow-sm transition-colors hover:bg-foreground"
              disabled={disabled}
              type="button"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2 p-10">
            <div className="rounded-full bg-muted p-3">
              <Image className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium">
                Arraste uma imagem ou clique para selecionar
              </p>
              <p className="text-xs text-muted-foreground">
                JPG, PNG ou GIF. Max 5MB.
              </p>
            </div>
          </div>
        )}
      </div>
      
      {!value && !isLoading && (
        <div className="flex justify-center">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => inputRef.current?.click()}
            disabled={disabled}
            className="text-xs"
            type="button"
          >
            <Upload className="mr-2 h-4 w-4" />
            Escolher imagem
          </Button>
        </div>
      )}
    </div>
  );
}
