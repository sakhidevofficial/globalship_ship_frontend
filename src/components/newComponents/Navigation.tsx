import { ShoppingBag, Search, Menu, Heart, ChevronDown, BellIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { useState } from "react";
import Link from "next/link";
import { mainNavigation } from "@/app/(default)/navigation";

interface NavigationProps {
  onNavigate: (page: "home" | "browse") => void;
  currentPage: "home" | "browse";
}

export function Navigation({ onNavigate, currentPage }: NavigationProps) {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

  const toggleMenu = (index: number) => {
    setOpenMenuIndex(prev => (prev === index ? null : index));
  };

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6 flex-1">
            <div className="flex items-center gap-2 cursor-pointer">
              <ShoppingBag className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-semibold">Glozum</span>
            </div>

            <div className="hidden md:flex items-center gap-2 flex-1 max-w-xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search Glozum" className="pl-10" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/notifications">
              <Button variant="ghost" size="icon" className="relative">
                <BellIcon className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-blue-600">
                  3
                </Badge>
              </Button>
            </Link>

            <div className="md:flex items-center gap-2">
              <Link href="/account">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/account/signup">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Sign Up</Button>
              </Link>
            </div>

            <Button variant="ghost" size="icon" className="hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="relative lg:flex items-center border-t border-gray-100">
          {mainNavigation.map((item, index) => (
            <div key={item.href} className="relative">
              {item.submenu && item.submenu.length > 0 ? (
                <>
                  {/* Main Menu Button */}
                  <button
                    onClick={() => toggleMenu(index)}
                    className={`flex items-center gap-1.5 px-4 h-12 text-sm font-medium border-b-2 transition-colors ${
                      openMenuIndex === index
                        ? 'text-blue-600 border-blue-600 bg-blue-50'
                        : 'text-gray-700 border-transparent hover:bg-gray-50 hover:border-blue-600'
                    }`}
                  >
                    {item.title}
                    <ChevronDown
                      className={`h-3 w-3 transition-transform ${openMenuIndex === index ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* Dropdown */}
                  {openMenuIndex === index && (
                    <div className="absolute left-0 top-full mt-1 bg-white shadow-lg rounded-md py-2 min-w-max z-50 border border-gray-200 pointer-events-auto">
                      {item.submenu.map((sub) => (
                        <div key={sub.href}>
                          <Link href={sub.href}>
                            <div className="block px-6 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 whitespace-nowrap border-b border-gray-100 last:border-b-0">
                              {sub.title}
                            </div>
                          </Link>

                          {/* Nested Submenu */}
                          {sub.submenu && sub.submenu.length > 0 && (
                            <div className="bg-gray-50 border-l-2 border-gray-200">
                              {sub.submenu.map((subitem) => (
                                <Link key={subitem.href} href={subitem.href}>
                                  <div className="block px-8 py-2 text-xs text-gray-600 hover:bg-white hover:text-blue-600 whitespace-nowrap">
                                    {subitem.title}
                                  </div>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link href={item.href}>
                  <div className="flex items-center gap-1.5 px-4 h-12 hover:bg-gray-50 text-sm font-medium text-gray-700 border-b-2 border-transparent hover:border-blue-600 transition-colors">
                    {item.title}
                  </div>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  )
}
