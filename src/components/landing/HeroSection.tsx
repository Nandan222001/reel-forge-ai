import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-accent/20 blur-[100px] animate-float" style={{ animationDelay: "-3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-glow opacity-50" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-primary/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-secondary-foreground">
              AI-Powered Content Revolution
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6"
          >
            Train Your AI Avatar.{" "}
            <span className="text-gradient">Generate Reels</span>{" "}
            in Seconds.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Upload a video of yourself, let AI extract your gestures, and prompt endless 
            personalized content. No editing skills required.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button variant="hero" size="xl" className="group" asChild>
              <Link to="/auth">
                Get Started Free
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="glass" size="xl" className="group">
              <Play className="w-5 h-5" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Demo Preview */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative max-w-4xl mx-auto"
          >
            {/* Glow behind the preview */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 blur-3xl opacity-50 -z-10 scale-95" />
            
            {/* Preview Card */}
            <div className="relative rounded-2xl overflow-hidden border border-border/50 shadow-lifted bg-card">
              {/* Browser Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-accent/60" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="h-6 bg-background rounded-md flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">reelforge.ai/dashboard</span>
                  </div>
                </div>
              </div>
              
              {/* Dashboard Preview */}
              <div className="aspect-video bg-gradient-to-br from-background via-muted/30 to-background p-8">
                <div className="h-full rounded-xl border border-border/30 bg-card/50 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow animate-float">
                      <Sparkles className="w-10 h-10 text-primary-foreground" />
                    </div>
                    <p className="text-muted-foreground font-medium">AI Dashboard Preview</p>
                    <div className="flex justify-center gap-2">
                      <div className="h-2 w-16 rounded-full bg-primary/30 animate-pulse" />
                      <div className="h-2 w-24 rounded-full bg-accent/30 animate-pulse" style={{ animationDelay: "0.2s" }} />
                      <div className="h-2 w-12 rounded-full bg-primary/30 animate-pulse" style={{ animationDelay: "0.4s" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
