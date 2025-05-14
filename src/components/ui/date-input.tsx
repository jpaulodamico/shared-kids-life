
import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface DateInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onValueChange?: (value: string) => void;
}

export const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  ({ className, onValueChange, onChange, value, ...props }, ref) => {
    const formatDate = (input: string): string => {
      // Remove todos os caracteres não numéricos
      const numbers = input.replace(/[^\d]/g, "");
      
      // Formata como dd/mm/aaaa
      if (numbers.length <= 2) {
        return numbers;
      } else if (numbers.length <= 4) {
        return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
      } else {
        return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`;
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatDate(e.target.value);
      
      // Atualiza o valor do input
      e.target.value = formatted;
      
      // Chama os callbacks de mudança
      if (onChange) onChange(e);
      if (onValueChange) onValueChange(formatted);
    };

    return (
      <Input
        type="text"
        className={cn(className)}
        onChange={handleChange}
        value={value}
        placeholder="DD/MM/AAAA"
        maxLength={10}
        ref={ref}
        {...props}
      />
    );
  }
);

DateInput.displayName = "DateInput";
