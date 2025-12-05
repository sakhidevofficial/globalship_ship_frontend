import { Truck, Shield, CreditCard, Headphones } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: Truck,
      title: "Global Shipping",
      description: "Fast delivery to 180+ countries worldwide"
    },
    {
      icon: Shield,
      title: "Authentic Products",
      description: "100% genuine US brands guaranteed"
    },
    {
      icon: CreditCard,
      title: "Secure Payment",
      description: "Safe and encrypted transactions"
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Expert customer service available"
    }
  ];

  return (
    <div className="bg-white py-8 px-4 rounded-lg shadow-sm mt-8">
      <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div key={feature.title} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center mb-3">
                <Icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="mb-1">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
