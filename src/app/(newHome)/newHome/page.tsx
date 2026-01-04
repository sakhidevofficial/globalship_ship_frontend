"use client"
import '@/styles/tailwind.css';
import { Navigation } from '@/components/newComponents/Navigation';
import { ShoppingBag, Smartphone, Shirt, Home, Dumbbell, Sparkles, BookOpen, Watch, Gamepad2, Car } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Banner } from '@/components/newComponents/Banner';
import { Features } from '@/components/newComponents/Features';
import { CategoryCard } from '@/components/newComponents/CategoryCard';
import { ProductSection } from '@/components/newComponents/ProductSection';
import { Footer } from '@/components/newComponents/Footer';
import { ProductService, Product as ServiceProduct } from '@/services/products'

type Store = {
  id: number
  name: string
  slug: string
}
type Product = ServiceProduct & {
  store?: Store
  image_url?: string
  original_price?: number
  price_formatted?: string
  original_price_formatted?: string
}

type HomeData = {
  featuredProducts: Product[]
  trendingProducts: Product[]
  categories: any[]
  brands: any[]
}

export default function NewHomePage() {
  const [currentPage, setCurrentPage] = useState<'home' | 'browse'>('home')
  const [data, setData] = useState<HomeData>({
    featuredProducts: [],
    trendingProducts: [],
    categories: [],
    brands: [],
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const hasAttempted = useRef(false)

  useEffect(() => {
    if (hasAttempted.current) return; // Prevent multiple fetch attempts
    hasAttempted.current = true;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

    async function fetchHomeData() {
      try {
        setIsLoading(true)
        setError(null)
        
        const [featured, trending, categoriesData, brandsData] = await Promise.all([
          ProductService.getProducts({ page: 1, per_page: 8 }),
          ProductService.getProducts({ page: 2, per_page: 8 }),
          ProductService.getCategories(),
          ProductService.getBrands(),
        ])
        
        setData({
          featuredProducts: (featured.data || []) as Product[],
          trendingProducts: (trending.data || []) as Product[],
          categories: categoriesData.data || [],
          brands: brandsData.data || [],
        })
      } catch (err) {
        console.warn('Failed to fetch home data:', err)
        setError('Failed to load products. Using default data.')
        // Keep empty state - don't retry
        setData({
          featuredProducts: [],
          trendingProducts: [],
          categories: [],
          brands: [],
        })
      } finally {
        setIsLoading(false)
        clearTimeout(timeoutId)
      }
    }

    fetchHomeData()

    return () => {
      controller.abort()
      clearTimeout(timeoutId)
    }
  }, [])

  const featuredProducts = data.featuredProducts
  const trendingProducts = data.trendingProducts
  const categories = data.categories
  const brands = data.brands
  const storeSet = new Set(featuredProducts.map((product) => product?.store?.name).filter(Boolean))
  const stores = [...storeSet]



  const categoriess = [
    {
      id: 1,
      title: "Electronics",
      description: "Latest gadgets and tech",
      image: "https://images.unsplash.com/photo-1717295248302-543d5a49091f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljcyUyMGdhZGdldHN8ZW58MXx8fHwxNzYyNTM0MTIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: Smartphone,
    },
    {
      id: 2,
      title: "Fashion",
      description: "Trending styles and apparel",
      image: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwY2xvdGhpbmd8ZW58MXx8fHwxNzYyNTczMzM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: Shirt,
    },
    {
      id: 3,
      title: "Home & Living",
      description: "Comfort meets style",
      image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwZGVjb3J8ZW58MXx8fHwxNzYyNjA4NDI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: Home,
    },
    {
      id: 4,
      title: "Sports & Fitness",
      description: "Get active and stay fit",
      image: "https://images.unsplash.com/photo-1602211844066-d3bb556e983b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzYyNTg5MjQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: Dumbbell,
    },
    {
      id: 5,
      title: "Beauty",
      description: "Cosmetics and skincare",
      image: "https://images.unsplash.com/photo-1602260395251-0fe691861b56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBjb3NtZXRpY3N8ZW58MXx8fHwxNzYyNTM0NjMzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: Sparkles,
    },
    {
      id: 6,
      title: "Books",
      description: "Explore new worlds",
      image: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rcyUyMHJlYWRpbmd8ZW58MXx8fHwxNzYyNTgxMzM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: BookOpen,
    },
    {
      id: 7,
      title: "Toys & Games",
      description: "Fun for all ages",
      image: "https://images.unsplash.com/photo-1705334494891-61cd42dfe036?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3lzJTIwa2lkc3xlbnwxfHx8fDE3NjI1NDA0OTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: Gamepad2,
    },
    {
      id: 8,
      title: "Automotive",
      description: "Parts and accessories",
      image: "https://images.unsplash.com/photo-1695357605057-059efb3d1b71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbW90aXZlJTIwY2FyfGVufDF8fHx8MTc2MjYwNjE2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: Car,
    },
  ];
  
  // Build a render list preferring fetched categories, with fallback to static `categoriess`.
  const transformedCategories = categories.map((category, idx) => ({
    ...category,
    href: `/shop/${category.slug}`,
    subcategories: [], // Add subcategories if needed
    parent_id: category.parent_id || 0, // Ensure parent_id is always a number
    id: category.id ?? idx,
  }));

  const categoriesToRender = (transformedCategories && transformedCategories.length)
    ? transformedCategories.map((cat, idx) => ({
        id: cat.id ?? idx,
        title: (cat as any).name || (cat as any).title || cat.slug || `Category ${idx + 1}`,
        description: (cat as any).description || '',
        image: (cat as any).image || `https://picsum.photos/seed/${cat.slug ?? idx}/800/600`,
        icon: ShoppingBag,
        href: cat.href,
      }))
    : categoriess;
  return (
    <div className="isolate min-h-screen bg-white text-black" style={{all: 'revert'}}>
      <Navigation onNavigate={setCurrentPage} currentPage={currentPage} />
      
      {currentPage === "home" ? (
        <main className="container mx-auto px-4 py-8">
          <Banner />
          
          <Features />
          

          
          <div className="mt-12">
            <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categoriesToRender.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>

          <ProductSection sections={[
            { title: 'Featured', products: featuredProducts },
            { title: 'Trending', products: trendingProducts },
          ]} />
        </main>
      ) : (
        // <Browse />
        <p>this no item</p>
      )}
      
      <Footer />
    </div>
  );
}
