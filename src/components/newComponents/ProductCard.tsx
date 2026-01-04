import Link from "next/link";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Star } from "lucide-react";
import { Badge } from "./ui/badge";

interface ProductCardProps {
  product: any;
}

function parsePrice(value: any) {
  if (value == null) return undefined;
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    // try to parse numeric strings, possibly with currency symbols
    const cleaned = value.replace(/[^0-9.-]+/g, '');
    const n = Number(cleaned);
    return Number.isFinite(n) ? n : undefined;
  }
  return undefined;
}

export function ProductCard({ product }: ProductCardProps) {
  const currentPrice = parsePrice(product?.currentPrice ?? product?.current_price ?? product?.price ?? product?.price_formatted);
  const originalPrice = parsePrice(product?.originalPrice ?? product?.original_price ?? product?.original_price_formatted);
  const discount = product?.discount ?? (currentPrice && originalPrice ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : undefined);
  const rating = product?.rating ?? product?.average_rating ?? 0;
  const imageSrc = product?.image ?? product?.image_url ?? product?.thumbnail ?? '';
  
  // Generate product slug from title or use ID
  const productSlug = product?.slug ?? product?.title?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') ?? `product-${product?.id}`;
  
  return (
    <Link href={`/shop/electronics/product?slug=${productSlug}`}>
      <div className="group cursor-pointer">
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-3">
        <ImageWithFallback
          src={imageSrc}
          alt={product?.title ?? product?.name ?? ''}
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
          <span className="ml-1 text-sm">{rating}</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {typeof currentPrice === 'number' ? (
            <span className="text-gray-900">${currentPrice.toFixed(2)}</span>
          ) : (
            <span className="text-gray-900">&nbsp;</span>
          )}

          {typeof originalPrice === 'number' ? (
            <span className="text-gray-400 line-through text-sm">${originalPrice.toFixed(2)}</span>
          ) : null}

          {typeof discount === 'number' ? (
            <span className="text-green-600 text-sm">{discount}% off</span>
          ) : null}
        </div>
      </div>
      </div>
    </Link>
  );
}