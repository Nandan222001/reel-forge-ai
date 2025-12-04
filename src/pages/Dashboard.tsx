import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { 
  Zap, 
  Plus, 
  Video, 
  BarChart3, 
  Settings, 
  LogOut, 
  User,
  Sparkles,
  FolderOpen,
  Clock
} from "lucide-react";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
        if (!session?.user) {
          navigate("/auth");
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
      if (!session?.user) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow animate-pulse">
          <Zap className="w-5 h-5 text-primary-foreground" />
        </div>
      </div>
    );
  }

  const userName = user?.user_metadata?.name || user?.email?.split("@")[0] || "Creator";

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              Reel<span className="text-gradient">Forge</span>
            </span>
          </a>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs text-primary-foreground font-semibold">
                {userName[0].toUpperCase()}
              </div>
              <span className="text-sm font-medium text-foreground hidden sm:block">
                {userName}
              </span>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Hey {userName}! 👋
          </h1>
          <p className="text-muted-foreground text-lg">
            Ready to forge some amazing reels today?
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <Button
            variant="hero"
            size="lg"
            className="h-auto py-6 flex-col gap-2"
          >
            <Plus className="w-6 h-6" />
            <span>New Reel</span>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-auto py-6 flex-col gap-2"
          >
            <FolderOpen className="w-6 h-6" />
            <span>My Projects</span>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-auto py-6 flex-col gap-2"
          >
            <BarChart3 className="w-6 h-6" />
            <span>Analytics</span>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-auto py-6 flex-col gap-2"
          >
            <Settings className="w-6 h-6" />
            <span>Settings</span>
          </Button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-card border border-border/50 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Video className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">0</p>
                <p className="text-muted-foreground text-sm">Reels Generated</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border/50 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">5</p>
                <p className="text-muted-foreground text-sm">Credits Remaining</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border/50 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                <User className="w-6 h-6 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">0</p>
                <p className="text-muted-foreground text-sm">Models Trained</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Empty State */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border/50 rounded-2xl p-12 text-center"
        >
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6">
              <Video className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              No projects yet
            </h3>
            <p className="text-muted-foreground mb-6">
              Upload your first video to train your AI avatar and start generating 
              amazing personalized reels.
            </p>
            <Button variant="hero" size="lg" className="group">
              <Plus className="w-5 h-5" />
              Create Your First Reel
            </Button>
          </div>
        </motion.div>

        {/* Recent Activity (placeholder) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-muted-foreground" />
            Recent Activity
          </h2>
          <div className="bg-muted/30 border border-border/30 rounded-xl p-6 text-center">
            <p className="text-muted-foreground">No recent activity to show.</p>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
