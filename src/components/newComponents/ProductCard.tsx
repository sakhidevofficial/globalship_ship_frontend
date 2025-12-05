import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Star } from "lucide-react";
import { Badge } from "./ui/badge";

interface ProductCardProps {
  product: {
    id: number;
    image: string;
    brand: string;
    title: string;
    rating: number;
    currentPrice: number;
    originalPrice: number;
    discount: number;
    exclusive?: boolean;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-3">
        <ImageWithFallback
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.exclusive && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-purple-600 hover:bg-purple-700">
              Best Seller
            </Badge>
          </div>
        )}
        
        {/* Carousel dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full ${
                i === 0 ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-sm text-gray-900 uppercase font-bold">{product.brand}</div>
        <h3 className="text-gray-700 line-clamp-2">{product.title}</h3>
        
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="h-3.5 w-3.5 fill-black text-black"
            />
          ))}
          <span className="ml-1 text-sm">{product.rating}</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-gray-900">${product.currentPrice.toFixed(2)}</span>
          <span className="text-gray-400 line-through text-sm">${product.originalPrice.toFixed(2)}</span>
          <span className="text-green-600 text-sm">{product.discount}% off</span>
        </div>
      </div>
    </div>
  );
}