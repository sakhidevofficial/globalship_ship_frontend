import type { Product as BotbleProduct } from '@/services/products'
import type { Product as CartzillaProduct } from '@/types/product'

export function mapBotbleToCartzillaProduct(product: BotbleProduct): CartzillaProduct {
  return {
    id: product.id.toString(),
    image: [product.images?.[0] || '', product.images?.[1] || product.images?.[0] || ''],
    title: product.name,
    href: `/shop/electronics/product/${product.slug}`,
    price: product.sale_price ? [product.sale_price, product.price] : [product.price],
    description: product.description,
    quantity: product.quantity,
    outOfStock: product.is_out_of_stock || false,
    // Add other mappings as needed
  }
}

export function mapBotbleToCartzillaProductForCategory(product: BotbleProduct, categorySlug: string): CartzillaProduct {
  return {
    id: product.id.toString(),
    image: [product.images?.[0] || '', product.images?.[1] || product.images?.[0] || ''],
    title: product.name,
    href: `/shop/${categorySlug}/product/${product.slug}`,
    price: product.sale_price ? [product.sale_price, product.price] : [product.price],
    description: product.description,
    quantity: product.quantity,
    outOfStock: product.is_out_of_stock || false,
    // Add other mappings as needed
  }
} 