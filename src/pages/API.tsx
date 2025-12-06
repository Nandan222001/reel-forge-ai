import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Key, 
  Copy, 
  Eye, 
  EyeOff, 
  RefreshCw, 
  Code, 
  Terminal,
  BookOpen,
  Zap,
  CheckCircle,
  Plus,
  Trash2
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
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

const endpoints = [
  {
    method: "POST",
    path: "/api/v1/generate",
    description: "Generate a new reel from a prompt",
    example: `curl -X POST https://api.reelforge.ai/v1/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"prompt": "Create a fitness motivation reel", "duration": 30}'`,
  },
  {
    method: "GET",
    path: "/api/v1/projects",
    description: "List all your projects",
    example: `curl https://api.reelforge.ai/v1/projects \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
  },
  {
    method: "GET",
    path: "/api/v1/projects/:id",
    description: "Get a specific project by ID",
    example: `curl https://api.reelforge.ai/v1/projects/proj_123 \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
  },
  {
    method: "DELETE",
    path: "/api/v1/projects/:id",
    description: "Delete a project",
    example: `curl -X DELETE https://api.reelforge.ai/v1/projects/proj_123 \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
  },
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
  const [apiKeys, setApiKeys] = useState<APIKey[]>([
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
      description: "API key copied to clipboard",
    });
  };

  const toggleKeyVisibility = (id: string) => {
    setShowKey((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const maskKey = (key: string) => {
    return key.substring(0, 10) + "•".repeat(key.length - 14) + key.substring(key.length - 4);
  };

  const methodColors: Record<string, string> = {
    GET: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    POST: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    PUT: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    DELETE: "bg-red-500/20 text-red-400 border-red-500/30",
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">API</h1>
          <p className="text-muted-foreground mt-1">Manage your API keys and explore endpoints</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">2,940</p>
                    <p className="text-sm text-muted-foreground">Requests This Month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">99.8%</p>
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <Key className="w-5 h-5 text-secondary-foreground" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{apiKeys.length}</p>
                    <p className="text-sm text-muted-foreground">Active Keys</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <Tabs defaultValue="keys" className="space-y-4">
          <TabsList className="bg-muted">
            <TabsTrigger value="keys" className="gap-2">
              <Key className="w-4 h-4" />
              API Keys
            </TabsTrigger>
            <TabsTrigger value="usage" className="gap-2">
              <Zap className="w-4 h-4" />
              Usage
            </TabsTrigger>
            <TabsTrigger value="docs" className="gap-2">
              <BookOpen className="w-4 h-4" />
              Documentation
            </TabsTrigger>
          </TabsList>

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
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleKeyVisibility(apiKey.id)}
                            >
                              {showKey[apiKey.id] ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => copyToClipboard(apiKey.key)}
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            Created {new Date(apiKey.created).toLocaleDateString()} • Last used{" "}
                            {new Date(apiKey.lastUsed).toLocaleDateString()}
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

          {/* Usage Tab */}
          <TabsContent value="usage" className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>API Requests Over Time</CardTitle>
                <CardDescription>Your API usage for the current billing period</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
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
                        labelStyle={{ color: "hsl(var(--foreground))" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="requests"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--primary))" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documentation Tab */}
          <TabsContent value="docs" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-foreground">API Reference</h2>
                <p className="text-sm text-muted-foreground">Explore available endpoints</p>
              </div>
              <Button variant="outline" className="gap-2">
                <BookOpen className="w-4 h-4" />
                Full Documentation
              </Button>
            </div>

            <div className="space-y-4">
              {endpoints.map((endpoint, index) => (
                <motion.div
                  key={endpoint.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-card border-border">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Badge className={`${methodColors[endpoint.method]} border font-mono text-xs`}>
                          {endpoint.method}
                        </Badge>
                        <div className="flex-1">
                          <code className="text-sm font-mono text-foreground">{endpoint.path}</code>
                          <p className="text-sm text-muted-foreground mt-1">{endpoint.description}</p>
                          <div className="mt-3 bg-muted rounded-lg p-3 overflow-x-auto">
                            <div className="flex items-center gap-2 mb-2">
                              <Terminal className="w-4 h-4 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">Example</span>
                            </div>
                            <pre className="text-xs font-mono text-foreground whitespace-pre-wrap">
                              {endpoint.example}
                            </pre>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => copyToClipboard(endpoint.example)}>
                          <Copy className="w-4 h-4" />
                        </Button>
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
