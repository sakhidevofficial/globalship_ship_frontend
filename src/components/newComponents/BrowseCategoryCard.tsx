import { Circle, LucideIcon } from "lucide-react";

interface BrowseCategoryCardProps {
  title: string;
  icon: LucideIcon;
  viewers: string;
}

export function BrowseCategoryCard({ title, icon: Icon, viewers }: BrowseCategoryCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
      <div className="p-4">
        <h3 className="mb-4">{title}</h3>
        
        <div className="aspect-square bg-white rounded-lg flex items-center justify-center overflow-hidden mb-4">
          <Icon className="w-16 h-16 text-gray-700 group-hover:scale-110 transition-transform duration-300" />
        </div>
        
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Circle className="h-2 w-2 fill-red-500 text-red-500" />
          <span>{viewers} Viewers</span>
        </div>
      </div>
    </div>
  );
}