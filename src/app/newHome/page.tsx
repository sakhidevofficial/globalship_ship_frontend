"use client"
import { Navigation } from '@/components/newComponents/Navigation';
import { ShoppingBag, Smartphone, Shirt, Home, Dumbbell, Sparkles, BookOpen, Watch, Gamepad2, Car } from "lucide-react";
import { useState } from "react";
import { Banner } from '@/components/newComponents/Banner';
import { Features } from '@/components/newComponents/Features';
import { CategoryCard } from '@/components/newComponents/CategoryCard';
import { ProductSection } from '@/components/newComponents/ProductSection';
import { Footer } from '@/components/newComponents/Footer';
import styles from './page.module.css';

export default function NewHomePage() {
      const [currentPage, setCurrentPage] = useState<"home" | "browse">("home");

  const categories = [
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
  return (
    <div className={`${styles.pageTheme} min-h-screen bg-gray-50`}>
      <Navigation onNavigate={setCurrentPage} currentPage={currentPage} />
      
      {currentPage === "home" ? (
        <main className="container mx-auto px-4 py-8">
          <Banner />
          
          <Features />
          
          <div className="mt-12">
            <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>

          <ProductSection />
        </main>
      ) : (
        // <Browse />
        <p>this no item</p>
      )}
      
      <Footer />
    </div>
  );
}
