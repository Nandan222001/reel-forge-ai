import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Key, 
  Copy, 
  Eye, 
  EyeOff, 
  RefreshCw, 
  Terminal,
  BookOpen,
  Zap,
  CheckCircle,
  Plus,
  Trash2,
  Server,
  Activity,
  GitBranch,
  Settings,
  Play,
  Pause,
  ArrowUpRight,
  ArrowDownRight,
  Globe,
  Shield,
  Clock,
  TrendingUp,
  Box,
  Layers,
  Link2
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const usageData = [
  { date: "Jan 1", requests: 120 },
  { date: "Jan 5", requests: 340 },
  { date: "Jan 10", requests: 280 },
  { date: "Jan 15", requests: 520 },
  { date: "Jan 20", requests: 410 },
  { date: "Jan 25", requests: 680 },
  { date: "Jan 30", requests: 590 },
];

const trafficData = [
  { time: "00:00", inbound: 120, outbound: 80 },
  { time: "04:00", inbound: 80, outbound: 50 },
  { time: "08:00", inbound: 350, outbound: 280 },
  { time: "12:00", inbound: 520, outbound: 420 },
  { time: "16:00", inbound: 480, outbound: 390 },
  { time: "20:00", inbound: 290, outbound: 210 },
];

interface Microservice {
  id: string;
  name: string;
  status: "healthy" | "degraded" | "down";
  instances: number;
  cpu: number;
  memory: number;
  requests: number;
  latency: number;
  version: string;
  lastDeployed: string;
  endpoint: string;
}

const mockServices: Microservice[] = [
  {
    id: "1",
    name: "auth-service",
    status: "healthy",
    instances: 3,
    cpu: 45,
    memory: 62,
    requests: 15234,
    latency: 23,
    version: "v2.1.0",
    lastDeployed: "2024-01-15T10:30:00Z",
    endpoint: "/api/v1/auth",
  },
  {
    id: "2",
    name: "video-processor",
    status: "healthy",
    instances: 5,
    cpu: 78,
    memory: 85,
    requests: 8921,
    latency: 156,
    version: "v1.8.2",
    lastDeployed: "2024-01-14T14:22:00Z",
    endpoint: "/api/v1/process",
  },
  {
    id: "3",
    name: "ai-generator",
    status: "degraded",
    instances: 2,
    cpu: 92,
    memory: 88,
    requests: 3456,
    latency: 890,
    version: "v3.0.1",
    lastDeployed: "2024-01-13T09:15:00Z",
    endpoint: "/api/v1/generate",
  },
  {
    id: "4",
    name: "notification-service",
    status: "healthy",
    instances: 2,
    cpu: 12,
    memory: 34,
    requests: 45678,
    latency: 8,
    version: "v1.2.0",
    lastDeployed: "2024-01-12T16:45:00Z",
    endpoint: "/api/v1/notify",
  },
  {
    id: "5",
    name: "storage-service",
    status: "down",
    instances: 0,
    cpu: 0,
    memory: 0,
    requests: 0,
    latency: 0,
    version: "v2.0.0",
    lastDeployed: "2024-01-10T08:00:00Z",
    endpoint: "/api/v1/storage",
  },
];

const serviceRoutes = [
  { source: "api-gateway", target: "auth-service", calls: 15234, latency: 23 },
  { source: "api-gateway", target: "video-processor", calls: 8921, latency: 156 },
  { source: "video-processor", target: "ai-generator", calls: 3456, latency: 890 },
  { source: "ai-generator", target: "storage-service", calls: 2100, latency: 45 },
  { source: "auth-service", target: "notification-service", calls: 4567, latency: 8 },
];

interface APIKey {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed: string;
}

const API = () => {
  const { toast } = useToast();
  const [showKey, setShowKey] = useState<Record<string, boolean>>({});
  const [apiKeys] = useState<APIKey[]>([
    {
      id: "1",
      name: "Production Key",
      key: "rf_live_sk_1234567890abcdef",
      created: "2024-01-01",
      lastUsed: "2024-01-15",
    },
    {
      id: "2",
      name: "Development Key",
      key: "rf_test_sk_0987654321fedcba",
      created: "2024-01-10",
      lastUsed: "2024-01-14",
    },
  ]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Copied to clipboard",
    });
  };

  const toggleKeyVisibility = (id: string) => {
    setShowKey((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const maskKey = (key: string) => {
    return key.substring(0, 10) + "•".repeat(key.length - 14) + key.substring(key.length - 4);
  };

  const statusColors: Record<string, string> = {
    healthy: "bg-emerald-500",
    degraded: "bg-amber-500",
    down: "bg-red-500",
  };

  const statusBadgeVariants: Record<string, "default" | "secondary" | "destructive"> = {
    healthy: "default",
    degraded: "secondary",
    down: "destructive",
  };

  const healthyServices = mockServices.filter(s => s.status === "healthy").length;
  const totalInstances = mockServices.reduce((acc, s) => acc + s.instances, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">API & Microservices</h1>
            <p className="text-muted-foreground mt-1">Manage services, deployments, and API gateway</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
              <Plus className="w-4 h-4" />
              Deploy Service
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <Server className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{healthyServices}/{mockServices.length}</p>
                    <p className="text-sm text-muted-foreground">Services Healthy</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Box className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{totalInstances}</p>
                    <p className="text-sm text-muted-foreground">Running Instances</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">73.3K</p>
                    <p className="text-sm text-muted-foreground">Requests/min</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">45ms</p>
                    <p className="text-sm text-muted-foreground">Avg Latency</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <Tabs defaultValue="registry" className="space-y-4">
          <TabsList className="bg-muted flex-wrap h-auto gap-1 p-1">
            <TabsTrigger value="registry" className="gap-2">
              <Layers className="w-4 h-4" />
              Service Registry
            </TabsTrigger>
            <TabsTrigger value="gateway" className="gap-2">
              <Globe className="w-4 h-4" />
              API Gateway
            </TabsTrigger>
            <TabsTrigger value="deployments" className="gap-2">
              <GitBranch className="w-4 h-4" />
              Deployments
            </TabsTrigger>
            <TabsTrigger value="communication" className="gap-2">
              <Link2 className="w-4 h-4" />
              Service Calls
            </TabsTrigger>
            <TabsTrigger value="keys" className="gap-2">
              <Key className="w-4 h-4" />
              API Keys
            </TabsTrigger>
          </TabsList>

          {/* Service Registry Tab */}
          <TabsContent value="registry" className="space-y-4">
            <div className="grid gap-4">
              {mockServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="bg-card border-border hover:border-primary/50 transition-all">
                    <CardContent className="p-4">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        {/* Service Info */}
                        <div className="flex items-center gap-3 flex-1">
                          <div className={`w-3 h-3 rounded-full ${statusColors[service.status]} animate-pulse`} />
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-foreground">{service.name}</h3>
                              <Badge variant="outline" className="text-xs">{service.version}</Badge>
                            </div>
                            <code className="text-xs text-muted-foreground">{service.endpoint}</code>
                          </div>
                        </div>

                        {/* Metrics */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-6">
                          <div className="text-center">
                            <p className="text-lg font-semibold text-foreground">{service.instances}</p>
                            <p className="text-xs text-muted-foreground">Instances</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-semibold text-foreground">{service.cpu}%</p>
                            <p className="text-xs text-muted-foreground">CPU</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-semibold text-foreground">{service.memory}%</p>
                            <p className="text-xs text-muted-foreground">Memory</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-semibold text-foreground">{service.latency}ms</p>
                            <p className="text-xs text-muted-foreground">Latency</p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Badge variant={statusBadgeVariants[service.status]} className="capitalize">
                            {service.status}
                          </Badge>
                          <Button variant="ghost" size="icon">
                            <Settings className="w-4 h-4" />
                          </Button>
                          {service.status === "healthy" ? (
                            <Button variant="ghost" size="icon">
                              <Pause className="w-4 h-4" />
                            </Button>
                          ) : (
                            <Button variant="ghost" size="icon">
                              <Play className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Resource Bars */}
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                          <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>CPU Usage</span>
                            <span>{service.cpu}%</span>
                          </div>
                          <Progress value={service.cpu} className="h-1.5" />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>Memory Usage</span>
                            <span>{service.memory}%</span>
                          </div>
                          <Progress value={service.memory} className="h-1.5" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* API Gateway Tab */}
          <TabsContent value="gateway" className="space-y-4">
            <div className="grid lg:grid-cols-2 gap-4">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Traffic Overview
                  </CardTitle>
                  <CardDescription>Inbound and outbound traffic across all services</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={trafficData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                        />
                        <Area type="monotone" dataKey="inbound" stackId="1" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
                        <Area type="monotone" dataKey="outbound" stackId="2" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" fillOpacity={0.3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Rate Limiting
                  </CardTitle>
                  <CardDescription>Current rate limit configuration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "Default", limit: "1000 req/min", used: 45 },
                    { name: "Auth Endpoints", limit: "100 req/min", used: 23 },
                    { name: "Generate API", limit: "50 req/min", used: 78 },
                    { name: "Webhook", limit: "500 req/min", used: 12 },
                  ].map((rule) => (
                    <div key={rule.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-foreground">{rule.name}</span>
                        <span className="text-xs text-muted-foreground">{rule.limit}</span>
                      </div>
                      <Progress value={rule.used} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Route Configuration */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Route Configuration</CardTitle>
                <CardDescription>Manage API routes and middleware</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    { path: "/api/v1/auth/*", target: "auth-service", methods: ["GET", "POST"], middleware: ["cors", "rate-limit"] },
                    { path: "/api/v1/generate/*", target: "ai-generator", methods: ["POST"], middleware: ["cors", "auth", "rate-limit"] },
                    { path: "/api/v1/projects/*", target: "video-processor", methods: ["GET", "POST", "PUT", "DELETE"], middleware: ["cors", "auth"] },
                    { path: "/api/v1/notify/*", target: "notification-service", methods: ["POST"], middleware: ["cors", "auth"] },
                  ].map((route, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 bg-muted rounded-lg">
                      <code className="text-sm text-foreground font-mono flex-1">{route.path}</code>
                      <div className="flex items-center gap-2 flex-wrap">
                        {route.methods.map((method) => (
                          <Badge key={method} variant="outline" className="text-xs">{method}</Badge>
                        ))}
                        <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-primary">{route.target}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Deployments Tab */}
          <TabsContent value="deployments" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Recent Deployments</h2>
                <p className="text-sm text-muted-foreground">Track and manage service deployments</p>
              </div>
              <Button className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground">
                <GitBranch className="w-4 h-4" />
                New Deployment
              </Button>
            </div>

            <div className="space-y-3">
              {mockServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="bg-card border-border">
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-foreground">{service.name}</h3>
                            <Badge variant="outline">{service.version}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Deployed {new Date(service.lastDeployed).toLocaleDateString()} at{" "}
                            {new Date(service.lastDeployed).toLocaleTimeString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="text-sm font-medium text-foreground">{service.instances} instances</p>
                            <p className="text-xs text-muted-foreground">Running</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="gap-1">
                              <TrendingUp className="w-3 h-3" />
                              Scale
                            </Button>
                            <Button variant="outline" size="sm" className="gap-1">
                              <RefreshCw className="w-3 h-3" />
                              Rollback
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Service-to-Service Communication Tab */}
          <TabsContent value="communication" className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Service Communication Map</CardTitle>
                <CardDescription>Inter-service call patterns and dependencies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {serviceRoutes.map((route, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-4 p-3 bg-muted rounded-lg"
                    >
                      <div className="flex items-center gap-2 flex-1">
                        <Badge variant="secondary" className="font-mono text-xs">{route.source}</Badge>
                        <ArrowDownRight className="w-4 h-4 text-primary" />
                        <Badge variant="outline" className="font-mono text-xs">{route.target}</Badge>
                      </div>
                      <div className="flex items-center gap-6 text-sm">
                        <div className="text-center">
                          <p className="font-semibold text-foreground">{route.calls.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">calls/hr</p>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold text-foreground">{route.latency}ms</p>
                          <p className="text-xs text-muted-foreground">avg latency</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>API Documentation</CardTitle>
                <CardDescription>Internal service endpoints</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockServices.slice(0, 3).map((service) => (
                    <div key={service.id} className="p-3 bg-muted rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-foreground">{service.name}</h4>
                        <Button variant="ghost" size="sm" className="gap-1">
                          <BookOpen className="w-3 h-3" />
                          Docs
                        </Button>
                      </div>
                      <div className="bg-card p-2 rounded overflow-x-auto">
                        <pre className="text-xs font-mono text-foreground">
{`curl -X POST https://internal${service.endpoint} \\
  -H "X-Service-Auth: \${SERVICE_TOKEN}" \\
  -H "Content-Type: application/json" \\
  -d '{"request": "example"}'`}
                        </pre>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Keys Tab */}
          <TabsContent value="keys" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Your API Keys</h2>
                <p className="text-sm text-muted-foreground">Manage your API keys for programmatic access</p>
              </div>
              <Button className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground">
                <Plus className="w-4 h-4" />
                Generate Key
              </Button>
            </div>

            {/* Usage Chart */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>API Requests Over Time</CardTitle>
                <CardDescription>Your API usage for the current billing period</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={usageData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Line type="monotone" dataKey="requests" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))" }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              {apiKeys.map((apiKey) => (
                <motion.div
                  key={apiKey.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Card className="bg-card border-border">
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-foreground">{apiKey.name}</h3>
                            <Badge variant="outline" className="text-xs">
                              {apiKey.key.startsWith("rf_live") ? "Live" : "Test"}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <code className="bg-muted px-3 py-1.5 rounded text-sm font-mono text-foreground">
                              {showKey[apiKey.id] ? apiKey.key : maskKey(apiKey.key)}
                            </code>
                            <Button variant="ghost" size="icon" onClick={() => toggleKeyVisibility(apiKey.id)}>
                              {showKey[apiKey.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => copyToClipboard(apiKey.key)}>
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            Created {new Date(apiKey.created).toLocaleDateString()} • Last used {new Date(apiKey.lastUsed).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="gap-2">
                            <RefreshCw className="w-3 h-3" />
                            Regenerate
                          </Button>
                          <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default API;
