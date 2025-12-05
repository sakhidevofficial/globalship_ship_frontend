import { ShoppingBag, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Footer() {
  const footerSections = [
    {
      title: "Shop",
      links: ["Women", "Men", "Kids", "Accessories", "Sale"],
    },
    {
      title: "Company",
      links: ["About Us", "Careers", "Press", "Sustainability", "Affiliates"],
    },
    {
      title: "Help",
      links: ["Customer Service", "Track Order", "Returns", "Shipping Info", "Size Guide"],
    },
    {
      title: "Resources",
      links: ["Gift Cards", "Find a Store", "Student Discount", "Become a Member", "Feedback"],
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Newsletter Section */}
        <div className="border-b border-gray-800 pb-8 mb-8">
          <div className="max-w-2xl">
            <h3 className="text-white mb-2">Stay in the loop</h3>
            <p className="mb-4">Subscribe to our newsletter for exclusive deals and updates</p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
              <Button className="bg-blue-600 hover:bg-blue-700">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-5 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-4 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingBag className="h-8 w-8 text-blue-600" />
              <span className="text-xl text-white">Glozum</span>
            </div>
            <p className="text-sm mb-4">
              Your one-stop destination for all your shopping needs. Quality products, great prices.
            </p>
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" className="hover:bg-gray-800 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-gray-800 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-gray-800 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-gray-800 hover:text-white">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-white mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">
              © 2025 Glozum. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}