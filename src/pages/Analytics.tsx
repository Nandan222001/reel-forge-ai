import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Video,
  Eye,
  Heart,
  Share2,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

// Mock data for charts
const reelGenerationData = [
  { name: "Mon", reels: 2 },
  { name: "Tue", reels: 5 },
  { name: "Wed", reels: 3 },
  { name: "Thu", reels: 8 },
  { name: "Fri", reels: 6 },
  { name: "Sat", reels: 12 },
  { name: "Sun", reels: 9 },
];

const engagementData = [
  { name: "Week 1", views: 1200, likes: 340, shares: 89 },
  { name: "Week 2", views: 1800, likes: 520, shares: 134 },
  { name: "Week 3", views: 2400, likes: 680, shares: 178 },
  { name: "Week 4", views: 3200, likes: 890, shares: 245 },
];

const topPrompts = [
  { prompt: "Energetic fitness tip", count: 24, trend: "up" },
  { prompt: "Product showcase casual", count: 18, trend: "up" },
  { prompt: "Dance tutorial fun", count: 15, trend: "down" },
  { prompt: "Cooking hack quick", count: 12, trend: "up" },
  { prompt: "Morning routine chill", count: 9, trend: "down" },
];

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ElementType;
  delay: number;
}

const StatCard = ({ title, value, change, trend, icon: Icon, delay }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-card border border-border/50 rounded-2xl p-5 hover:shadow-soft transition-shadow"
  >
    <div className="flex items-start justify-between mb-3">
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className={`flex items-center gap-1 text-sm font-medium ${
        trend === "up" ? "text-accent" : "text-destructive"
      }`}>
        {trend === "up" ? (
          <ArrowUpRight className="w-4 h-4" />
        ) : (
          <ArrowDownRight className="w-4 h-4" />
        )}
        {change}
      </div>
    </div>
    <p className="text-2xl font-bold text-foreground">{value}</p>
    <p className="text-muted-foreground text-sm">{title}</p>
  </motion.div>
);

const Analytics = () => {
  return (
    <DashboardLayout>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <BarChart3 className="w-6 h-6 text-primary" />
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Analytics</h1>
        </div>
        <p className="text-muted-foreground">
          Track your content performance and engagement metrics.
        </p>
      </motion.div>

      {/* Date Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="flex items-center gap-2 mb-6"
      >
        <button className="px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg">
          7 Days
        </button>
        <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted rounded-lg transition-colors">
          30 Days
        </button>
        <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted rounded-lg transition-colors">
          90 Days
        </button>
        <button className="ml-auto flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted rounded-lg transition-colors">
          <Calendar className="w-4 h-4" />
          Custom
        </button>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Reels"
          value="45"
          change="+12%"
          trend="up"
          icon={Video}
          delay={0.1}
        />
        <StatCard
          title="Total Views"
          value="8.6K"
          change="+24%"
          trend="up"
          icon={Eye}
          delay={0.15}
        />
        <StatCard
          title="Total Likes"
          value="2.4K"
          change="+18%"
          trend="up"
          icon={Heart}
          delay={0.2}
        />
        <StatCard
          title="Total Shares"
          value="646"
          change="-3%"
          trend="down"
          icon={Share2}
          delay={0.25}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Reel Generation Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border/50 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-foreground">Reels Generated</h3>
              <p className="text-sm text-muted-foreground">This week's output</p>
            </div>
            <div className="flex items-center gap-1 text-accent text-sm font-medium">
              <TrendingUp className="w-4 h-4" />
              +23%
            </div>
          </div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reelGenerationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Bar 
                  dataKey="reels" 
                  fill="hsl(var(--primary))" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Engagement Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-card border border-border/50 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-foreground">Engagement Trend</h3>
              <p className="text-sm text-muted-foreground">Views, likes & shares</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-primary" />
                Views
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-accent" />
                Likes
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-secondary-foreground" />
                Shares
              </span>
            </div>
          </div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={engagementData}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorLikes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Area 
                  type="monotone" 
                  dataKey="views" 
                  stroke="hsl(var(--primary))" 
                  fillOpacity={1} 
                  fill="url(#colorViews)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="likes" 
                  stroke="hsl(var(--accent))" 
                  fillOpacity={1} 
                  fill="url(#colorLikes)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="shares" 
                  stroke="hsl(var(--secondary-foreground))" 
                  fillOpacity={0} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Top Prompts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card border border-border/50 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-semibold text-foreground">Top Prompts</h3>
            <p className="text-sm text-muted-foreground">Most used generation prompts</p>
          </div>
        </div>
        <div className="space-y-3">
          {topPrompts.map((item, index) => (
            <div
              key={item.prompt}
              className="flex items-center gap-4 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                {index + 1}
              </span>
              <span className="flex-1 text-foreground font-medium truncate">
                "{item.prompt}"
              </span>
              <span className="text-muted-foreground text-sm">{item.count} uses</span>
              {item.trend === "up" ? (
                <TrendingUp className="w-4 h-4 text-accent" />
              ) : (
                <TrendingDown className="w-4 h-4 text-destructive" />
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Analytics;
