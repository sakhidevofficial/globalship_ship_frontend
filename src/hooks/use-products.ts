import useSWR from 'swr'
import { ProductService, type Product, type ProductsResponse, type Brand } from '@/services/products'

// Fetcher function for SWR
const fetcher = async (url: string) => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }
  return response.json()
}

// Custom hook for products with SWR
export const useProducts = (params?: {
  page?: number
  per_page?: number
  category?: string
  brand?: string
  search?: string
  sort?: string
  price_min?: number
  price_max?: number
}) => {
  const queryString = params ? new URLSearchParams(params as Record<string, any>).toString() : ''
  const key = queryString ? `/api/products?${queryString}` : '/api/products'

  const { data, error, isLoading, mutate } = useSWR<ProductsResponse>(
    key,
    () => ProductService.getProducts(params),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 60000, // 1 minute
    }
  )

  return {
    products: data?.data || [],
    meta: data?.meta,
    isLoading,
    error,
    mutate,
  }
}

// Custom hook for a single product
export const useProduct = (slug: string) => {
  const { data, error, isLoading, mutate } = useSWR<Product | null>(
    slug ? `/api/products/${slug}` : null,
    () => ProductService.getProduct(slug),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 300000, // 5 minutes
    }
  )

  return {
    product: data,
    isLoading,
    error,
    mutate,
  }
}

// Custom hook for product categories
export const useCategories = () => {
  // Temporarily disable categories fetching to prevent 404 errors
  return {
    categories: [],
    isLoading: false,
    error: null,
    mutate: () => {},
  }
}

// Custom hook for brands
export const useBrands = () => {
  // Temporarily disable brands fetching to prevent 404 errors
  return {
    brands: [],
    isLoading: false,
    error: null,
    mutate: () => {},
  }
}

// Custom hook for related products
export const useRelatedProducts = (slug: string) => {
  const { data, error, isLoading, mutate } = useSWR<Product[]>(
    slug ? `/api/products/${slug}/related` : null,
    () => ProductService.getRelatedProducts(slug),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 300000, // 5 minutes
    }
  )

  return {
    relatedProducts: data || [],
    isLoading,
    error,
    mutate,
  }
}

// Custom hook for product reviews
export const useProductReviews = (slug: string) => {
  // First get the product to get its ID
  const { product } = useProduct(slug)
  
  const { data, error, isLoading, mutate } = useSWR(
    product?.id ? `/api/products/${product.id}/reviews` : null,
    () => product?.id ? ProductService.getProductReviews(product.id) : Promise.resolve([]),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 300000, // 5 minutes
    }
  )

  return {
    reviews: data || [],
    isLoading,
    error,
    mutate,
  }
}

// Custom hook for flash sale products
export const useFlashSaleProducts = () => {
  // Temporarily disable flash sale fetching to prevent errors
  return {
    flashSaleProducts: [],
    isLoading: false,
    error: null,
    mutate: () => {},
  }
}

// Custom hook for search products
export const useSearchProducts = (query: string, params?: {
  page?: number
  per_page?: number
  category?: string
  brand?: string
  sort?: string
}) => {
  // Temporarily disable search fetching to prevent errors
  return {
    products: [],
    meta: undefined,
    isLoading: false,
    error: null,
    mutate: () => {},
  }
} 