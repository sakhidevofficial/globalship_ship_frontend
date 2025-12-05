import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  category: {
    id: number;
    title: string;
    description: string;
    image: string;
    icon: LucideIcon;
  };
}

export function CategoryCard({ category }: CategoryCardProps) {
  const Icon = category.icon;

  return (
    <Card className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative h-32 overflow-hidden">
        <ImageWithFallback
          src={category.image}
          alt={category.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        
        <div className="absolute top-2 left-2">
          <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg">
            <Icon className="h-3.5 w-3.5 text-blue-600" />
          </div>
        </div>
        
        <div className="absolute bottom-2 left-2 right-2">
          <h3 className="text-white mb-0.5">{category.title}</h3>
          <div className="flex items-center text-white/90 group-hover:gap-1 transition-all text-xs">
            <span>Explore</span>
            <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Card>
  );
}