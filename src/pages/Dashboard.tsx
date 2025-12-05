import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { 
  Plus, 
  Video, 
  Sparkles,
  User,
  Clock,
  Play,
  ArrowRight,
  Zap
} from "lucide-react";

const Dashboard = () => {
  // Mock data - would come from database in real app
  const recentProjects: any[] = [];
  const stats = {
    reelsGenerated: 0,
    creditsRemaining: 5,
    modelsTrained: 0,
  };

  return (
    <DashboardLayout>
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Welcome back! 👋
        </h1>
        <p className="text-muted-foreground">
          Ready to create some amazing AI-powered reels?
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
      >
        <div className="bg-card border border-border/50 rounded-2xl p-5 hover:shadow-soft transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Video className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.reelsGenerated}</p>
              <p className="text-muted-foreground text-sm">Reels Generated</p>
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-2xl p-5 hover:shadow-soft transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.creditsRemaining}</p>
              <p className="text-muted-foreground text-sm">Credits Left</p>
            </div>
          </div>
          <div className="mt-3">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-accent to-primary rounded-full transition-all"
                style={{ width: `${(stats.creditsRemaining / 5) * 100}%` }}
              />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-2xl p-5 hover:shadow-soft transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
              <User className="w-6 h-6 text-secondary-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.modelsTrained}</p>
              <p className="text-muted-foreground text-sm">AI Models</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
      >
        <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-2xl p-6 hover:shadow-glow transition-all cursor-pointer group">
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
              <Plus className="w-7 h-7 text-primary-foreground" />
            </div>
            <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Create New Reel</h3>
          <p className="text-muted-foreground text-sm">Upload a video and generate AI-powered content</p>
        </div>

        <div className="bg-card border border-border/50 rounded-2xl p-6 hover:shadow-soft transition-all cursor-pointer group">
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center">
              <Play className="w-7 h-7 text-secondary-foreground" />
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-1">API Playground</h3>
          <p className="text-muted-foreground text-sm">Test and explore our generation API</p>
        </div>
      </motion.div>

      {/* Recent Projects / Empty State */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Recent Projects</h2>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            View All
          </Button>
        </div>

        {recentProjects.length === 0 ? (
          <div className="bg-card border border-dashed border-border rounded-2xl p-12 text-center">
            <div className="max-w-sm mx-auto">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 animate-float">
                <Video className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No projects yet
              </h3>
              <p className="text-muted-foreground mb-6">
                Upload your first video to train your AI avatar and start generating personalized reels.
              </p>
              <Button variant="hero" size="lg" className="group">
                <Plus className="w-5 h-5" />
                Create Your First Reel
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Project cards would go here */}
          </div>
        )}
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8"
      >
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
        </div>
        <div className="bg-muted/30 border border-border/30 rounded-xl p-8 text-center">
          <p className="text-muted-foreground">Your activity will appear here once you start creating.</p>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Dashboard;
