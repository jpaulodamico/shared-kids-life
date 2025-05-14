
import React from 'react';
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  toggleShowPassword: () => void;
  placeholder?: string;
  minLength?: number;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  value,
  onChange,
  showPassword,
  toggleShowPassword,
  placeholder = "••••••••",
  minLength
}) => {
  return (
    <div className="relative">
      <Input
        id={id}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        minLength={minLength}
      />
      <button 
        type="button" 
        onClick={toggleShowPassword}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
      >
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
};
