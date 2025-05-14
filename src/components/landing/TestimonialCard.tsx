
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
}

export const TestimonialCard = ({ quote, author, role }: TestimonialCardProps) => {
  return (
    <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex mb-4">
          {[...Array(5)].map((_, index) => (
            <Star key={index} className="text-accent fill-accent w-5 h-5" />
          ))}
        </div>
        <p className="text-gray-600 italic flex-grow">{quote}</p>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="font-bold text-gray-900">{author}</p>
          <p className="text-gray-500 text-sm">{role}</p>
        </div>
      </CardContent>
    </Card>
  );
};
