import { Button } from "./ui/button";  // Assuming Button is a custom component
import { ImageWithFallback } from "./figma/ImageWithFallback";  // Custom Image component
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";  // Assuming this is a custom Carousel component

export function Banner() {
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaG9wcGluZyUyMGJhbm5lcnxlbnwxfHx8fDE3NjI2MzI4NTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      badge: "New Arrivals",
      title: "Authentic US Products, Delivered Globally",
      description: "Shop the best American brands and have them shipped directly to your door, no matter where you are in the world."
    },
    {
      image: "https://images.unsplash.com/photo-1759153820384-12c9ddf8bd8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaG9wcGluZyUyMG1vZGVybiUyMHN0b3JlfGVufDF8fHx8MTc2MzAzOTIzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      badge: "Trending Now",
      title: "Discover the Latest Trends",
      description: "Explore our curated collection of trending products from top US brands, handpicked just for you."
    },
    {
      image: "https://images.unsplash.com/photo-1570857502809-08184874388e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwYm91dGlxdWV8ZW58MXx8fHwxNzYyOTI2OTAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      badge: "Fashion Week",
      title: "Style That Speaks to You",
      description: "Find your perfect look with our exclusive fashion collection from America's finest boutiques."
    },
    {
      image: "https://images.unsplash.com/photo-1717295248230-93ea71f48f92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljcyUyMHRlY2glMjBnYWRnZXRzfGVufDF8fHx8MTc2MzAzOTIzMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      badge: "Tech Deals",
      title: "Innovation at Your Fingertips",
      description: "Get the latest tech gadgets and electronics from leading American brands, delivered worldwide."
    }
  ];

  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg">
      <Carousel className="w-full" opts={{ loop: true }}>
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="relative h-72 md:h-96">
                <ImageWithFallback
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
                
                <div className="absolute inset-0 flex flex-col items-start justify-center px-8 md:px-16">
                  <span className="inline-block px-3 py-1 bg-blue-600 text-white rounded-full mb-4">
                    {slide.badge}
                  </span>
                  <h1 className="text-white mb-4 max-w-xl text-3xl md:text-4xl lg:text-5xl">
                    {slide.title}
                  </h1>
                  <p className="text-white/90 mb-6 max-w-md">
                    {slide.description}
                  </p>
                  <div className="flex gap-4">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                      Shop Now
                    </Button>
                    <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20">
                      View Categories
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 bg-white" />
        <CarouselNext className="right-4 bg-white" />
      </Carousel>
    </div>
  );
}
