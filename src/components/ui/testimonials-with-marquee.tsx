import React, { useRef } from "react"
import { cn } from "@/lib/utils"
import { TestimonialCard, TestimonialAuthor } from "@/components/ui/testimonial-card"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface TestimonialsSectionProps {
  title: string
  description?: string
  testimonials: Array<{
    author: TestimonialAuthor
    text: string
    rating: number
    href?: string
  }>
  className?: string
}

export function TestimonialsSection({
  title,
  description,
  testimonials,
  className
}: TestimonialsSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const firstChild = current.children[0] as HTMLElement;
      const scrollAmount = firstChild ? firstChild.offsetWidth + 24 : 424;

      const maxScroll = current.scrollWidth - current.clientWidth;

      if (direction === 'right') {
        if (current.scrollLeft >= maxScroll - 10) {
          // Wrap around to start
          current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      } else {
        if (current.scrollLeft <= 10) {
          // Wrap around to end
          current.scrollTo({ left: maxScroll, behavior: 'smooth' });
        } else {
          current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <section className={cn(
      "bg-forest text-cream",
      "py-12 sm:py-24 md:py-32 px-0",
      className
    )}>
      <div className="mx-auto flex flex-col items-center gap-4 text-center sm:gap-16 w-full">
        <div className="flex flex-col items-center gap-4 px-4 sm:gap-8">
          <h2 className="max-w-[720px] text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight font-serif text-cream">
            {title}
          </h2>
          {description && (
            <p className="text-md max-w-[600px] font-medium text-cream/70 sm:text-xl font-sans">
              {description}
            </p>
          )}
        </div>

        <div className="relative flex w-full flex-col items-center justify-center">
          <div className="w-full relative px-4 sm:px-12 max-w-[100vw] sm:max-w-7xl mx-auto group">
            <button
              onClick={() => scroll('left')}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-bronze text-cream rounded-full flex items-center justify-center shadow-lg hover:bg-cream hover:text-forest transition-colors hidden sm:flex opacity-0 group-hover:opacity-100 disabled:opacity-0"
              aria-label="Nach links scrollen"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 pt-4 px-4 hide-scrollbar w-full"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>
              {testimonials.map((testimonial, i) => (
                <div key={i} className="snap-center shrink-0 w-[85vw] sm:w-[400px]">
                  {React.createElement(TestimonialCard, {
                    author: testimonial.author,
                    text: testimonial.text,
                    rating: testimonial.rating,
                    href: testimonial.href
                  })}
                </div>
              ))}
            </div>

            <button
              onClick={() => scroll('right')}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-bronze text-cream rounded-full flex items-center justify-center shadow-lg hover:bg-cream hover:text-forest transition-colors hidden sm:flex opacity-0 group-hover:opacity-100 disabled:opacity-0"
              aria-label="Nach rechts scrollen"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
