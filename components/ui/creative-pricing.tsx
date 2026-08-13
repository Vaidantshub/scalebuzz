import React from "react";
import { Button } from "@/components/ui/button";
import { Check, Pencil, Star, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PricingTier {
  name: string;
  icon: React.ReactNode;
  price: number | string;
  originalPrice?: number | string;
  description: string;
  features: string[];
  popular?: boolean;
  color: string;
  buttonText?: string;
  ctaHref?: string;
}

function CreativePricing({
  tag = "Simple. Transparent. Creator-First.",
  title = "UGC That Gets People To Stop Scrolling",
  description = "Choose the package that fits your content needs. No hidden fees.",
  tiers,
}: {
  tag?: string;
  title?: string;
  description?: string;
  tiers: PricingTier[];
}) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-16 relative">
      <div className="text-center space-y-4 mb-16 relative z-10">
        <div className="font-handwritten text-xl text-blue-600 dark:text-blue-400 rotate-[-1deg] font-bold">
          {tag}
        </div>
        <div className="relative inline-block max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold font-handwritten text-zinc-900 dark:text-white rotate-[-1deg] leading-tight">
            {title}
            <div className="absolute -right-8 -top-4 text-amber-500 rotate-12 text-2xl">
              ✨
            </div>
            <div className="absolute -left-8 -bottom-2 text-blue-500 -rotate-12 text-2xl">
              ⭐️
            </div>
          </h2>
          <div
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-44 h-3 bg-blue-500/20 
            rotate-[-1deg] rounded-full blur-sm"
          />
        </div>
        <p className="font-handwritten text-xl text-zinc-600 dark:text-zinc-400 rotate-[-1deg] pt-2">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {tiers.map((tier, index) => (
          <div
            key={tier.name}
            className={cn(
              "relative group flex flex-col justify-between",
              "transition-all duration-300",
              index === 0 && "rotate-[-1deg]",
              index === 1 && "rotate-[1deg] z-10",
              index === 2 && "rotate-[-2deg]"
            )}
          >
            {/* Background & Shadow Container */}
            <div
              className={cn(
                "absolute inset-0 bg-white dark:bg-zinc-900",
                "border-2 border-zinc-900 dark:border-white",
                "rounded-2xl shadow-[6px_6px_0px_0px] shadow-zinc-900 dark:shadow-white",
                "transition-all duration-300",
                "group-hover:shadow-[10px_10px_0px_0px] group-hover:shadow-zinc-900 dark:group-hover:shadow-white",
                "group-hover:-translate-x-1 group-hover:-translate-y-1"
              )}
            />

            <div className="relative p-6 md:p-8 flex flex-col justify-between h-full z-10">
              <div>
                {tier.popular && (
                  <div
                    className="absolute -top-3 -right-3 bg-amber-400 text-zinc-900 
                    font-handwritten px-3 py-1 rounded-full rotate-12 text-xs md:text-sm font-bold border-2 border-zinc-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase tracking-wider"
                  >
                    MOST POPULAR
                  </div>
                )}

                <div className="mb-6">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full mb-4",
                      "flex items-center justify-center",
                      "border-2 border-zinc-900 dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
                      tier.color === "amber"
                        ? "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400"
                        : tier.color === "purple"
                        ? "bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400"
                        : "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400"
                    )}
                  >
                    {tier.icon}
                  </div>
                  <h3 className="font-handwritten text-2xl font-bold text-zinc-900 dark:text-white">
                    {tier.name}
                  </h3>
                  <p className="font-handwritten text-zinc-600 dark:text-zinc-400 mt-1 min-h-[44px]">
                    {tier.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-6 font-handwritten flex items-baseline gap-2">
                  <span className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white">
                    {typeof tier.price === "number" ? `₹${tier.price.toLocaleString("en-IN")}` : tier.price}
                  </span>
                  {tier.originalPrice && (
                    <span className="text-xl text-zinc-400 dark:text-zinc-500 line-through">
                      {typeof tier.originalPrice === "number"
                        ? `₹${tier.originalPrice.toLocaleString("en-IN")}`
                        : tier.originalPrice}
                    </span>
                  )}
                </div>

                <div className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div
                        className="w-5 h-5 rounded-full border-2 border-zinc-900 
                        dark:border-white flex items-center justify-center shrink-0 bg-blue-500 text-white"
                      >
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="font-handwritten text-base md:text-lg text-zinc-800 dark:text-zinc-200">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href={tier.ctaHref || "#contact"}
                className="w-full text-center block no-underline"
              >
                <Button
                  className={cn(
                    "w-full h-12 font-handwritten text-lg relative font-bold",
                    "border-2 border-zinc-900 dark:border-white",
                    "transition-all duration-300 cursor-pointer",
                    "shadow-[4px_4px_0px_0px] shadow-zinc-900 dark:shadow-white",
                    "hover:shadow-[6px_6px_0px_0px]",
                    "hover:-translate-x-0.5 hover:-translate-y-0.5",
                    tier.popular
                      ? [
                          "bg-amber-400 text-zinc-900",
                          "hover:bg-amber-300",
                          "active:bg-amber-400",
                          "dark:hover:bg-amber-300",
                          "dark:active:bg-amber-400",
                        ]
                      : [
                          "bg-zinc-50 dark:bg-zinc-800",
                          "text-zinc-900 dark:text-white",
                          "hover:bg-zinc-100 dark:hover:bg-zinc-700",
                          "active:bg-zinc-50 dark:active:bg-zinc-800",
                        ]
                  )}
                >
                  {tier.buttonText || "Get Started"}
                </Button>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Decorative Background Icons */}
      <div className="absolute -z-10 inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-4xl rotate-12 opacity-30 select-none">
          ✎
        </div>
        <div className="absolute bottom-20 right-10 text-4xl -rotate-12 opacity-30 select-none">
          ✏️
        </div>
      </div>
    </div>
  );
}

export { CreativePricing };
