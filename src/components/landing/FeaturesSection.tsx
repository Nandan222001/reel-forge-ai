import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Cpu, 
  Lightbulb, 
  Code2, 
  Download, 
  Lock, 
  BarChart3 
} from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const FeatureCard = ({ icon, title, description, index }: FeatureCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative p-6 rounded-2xl border border-border/50 bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-soft"
    >
      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <div className="text-primary group-hover:text-accent transition-colors duration-300">
            {icon}
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "Gesture-Powered Training",
      description: "AI analyzes your unique movements and expressions for authentic, personalized outputs that truly represent you.",
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Prompt Magic",
      description: "Type 'energetic fitness tip' or 'funny pet reaction' – get a polished reel starring you in seconds.",
    },
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "API for Pros",
      description: "Embed our powerful AI in your app. Scale effortlessly with our developer-friendly REST endpoints.",
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "One-Click Export",
      description: "TikTok, Instagram, YouTube Shorts – export in platform-optimized formats with a single click.",
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Secure & Private",
      description: "Your videos stay yours. Enterprise-grade encryption, GDPR compliant, with full data control.",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Pro Analytics",
      description: "Predict engagement before you publish. AI-powered insights to maximize your content's reach.",
    },
  ];

  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider mb-4 block">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Everything You Need to{" "}
            <span className="text-gradient">Create Magic</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            From AI training to instant export, we've built the complete toolkit for modern content creators.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
