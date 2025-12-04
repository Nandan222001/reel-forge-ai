import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Testimonial {
  name: string;
  handle: string;
  avatar: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Chen",
    handle: "@sarahcreates",
    avatar: "SC",
    content: "ReelForge completely transformed my workflow. What used to take hours now takes seconds. The gesture recognition is incredibly accurate!",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    handle: "@mjfitness",
    avatar: "MJ",
    content: "As a fitness creator, authenticity is everything. ReelForge captures my energy perfectly. My engagement has doubled since I started using it.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    handle: "@emilycooks",
    avatar: "ER",
    content: "The API integration into my content pipeline was seamless. Now I can batch-generate content while focusing on what I love - cooking!",
    rating: 5,
  },
  {
    name: "Alex Kim",
    handle: "@alextech",
    avatar: "AK",
    content: "I was skeptical at first, but the quality blew me away. The AI understands exactly what I want from simple prompts. Game changer.",
    rating: 5,
  },
  {
    name: "Priya Patel",
    handle: "@priyalifestyle",
    avatar: "PP",
    content: "The analytics feature helps me understand what content will perform before I even post. It's like having a crystal ball for engagement!",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-glow opacity-30" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider mb-4 block">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Loved by <span className="text-gradient">Creators</span> Worldwide
          </h2>
          <p className="text-muted-foreground text-lg">
            Join thousands of content creators who've revolutionized their workflow.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="bg-card border border-border/50 rounded-2xl p-8 md:p-12 shadow-lifted"
          >
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-xl md:text-2xl text-foreground text-center font-medium leading-relaxed mb-8">
              "{testimonials[currentIndex].content}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold">
                {testimonials[currentIndex].avatar}
              </div>
              <div className="text-left">
                <div className="font-semibold text-foreground">
                  {testimonials[currentIndex].name}
                </div>
                <div className="text-muted-foreground text-sm">
                  {testimonials[currentIndex].handle}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-primary w-6"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
