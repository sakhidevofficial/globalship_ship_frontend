import { ShoppingBag, Search, User, Menu, Heart, Sparkles, Pill, Coffee, Baby, Home } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

interface NavigationProps {
  onNavigate: (page: "home" | "browse") => void;
  currentPage: "home" | "browse";
}

export function Navigation({ onNavigate, currentPage }: NavigationProps) {
  const navCategories = [
    { name: "Electronics", icon: ShoppingBag },
    { name: "Fashion", icon: Sparkles },
    { name: "Home & Living", icon: Home },
    { name: "Sports", icon: Heart },
    { name: "Beauty", icon: Sparkles },
    { name: "Health", icon: Pill },
    { name: "Food & Drinks", icon: Coffee },
    { name: "Baby Care", icon: Baby }
  ];

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6 flex-1">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-8 w-8 text-blue-600" />
              <span className="text-xl">Glozum</span>
            </div>
            
            <div className="md:flex items-center gap-2 flex-1 max-w-xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search Glozum" 
                  className="pl-20"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="md:flex relative">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="md:flex relative">
              <ShoppingBag className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-blue-600">
                3
              </Badge>
            </Button>
            <div className="md:flex items-center gap-2 ml-2">
              <Button variant="ghost">
                Sign In
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Sign Up
              </Button>
            </div>
            <Button variant="ghost" size="icon" className="hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="lg:flex items-center gap-1 h-12 overflow-x-auto">
          {navCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Button 
                key={category.name} 
                variant="ghost" 
                className="rounded-none hover:bg-gray-100 flex flex-col items-center gap-0.5 h-full py-1"
              >
                <Icon className="h-4 w-4 text-gray-600" />
                <span className="text-xs">{category.name}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}