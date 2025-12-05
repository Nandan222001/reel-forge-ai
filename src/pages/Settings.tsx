import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  CreditCard, 
  Key, 
  Shield, 
  Copy, 
  Eye, 
  EyeOff,
  Check,
  Smartphone,
  Monitor,
  Trash2,
  RefreshCw
} from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const [showApiKey, setShowApiKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const apiKey = "rf_sk_1234567890abcdef";

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    toast.success("API key copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const sessions = [
    { device: "Chrome on MacOS", location: "San Francisco, US", current: true, lastActive: "Now" },
    { device: "Safari on iPhone", location: "San Francisco, US", current: false, lastActive: "2 hours ago" },
    { device: "Firefox on Windows", location: "New York, US", current: false, lastActive: "3 days ago" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account preferences</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="profile" className="gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="subscription" className="gap-2">
              <CreditCard className="w-4 h-4" />
              Subscription
            </TabsTrigger>
            <TabsTrigger value="api" className="gap-2">
              <Key className="w-4 h-4" />
              API
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="w-4 h-4" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary/10 text-primary text-2xl">JD</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm">Change Avatar</Button>
                    <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max 2MB.</p>
                  </div>
                </div>

                <Separator />

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="niche">Creator Niche</Label>
                    <Input id="niche" defaultValue="Fitness" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input id="bio" placeholder="Tell us about yourself..." />
                </div>

                <Button className="bg-primary hover:bg-primary/90">Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subscription Tab */}
          <TabsContent value="subscription" className="space-y-6">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>Manage your subscription and billing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-semibold text-foreground">Pro Plan</h3>
                      <Badge className="bg-primary/20 text-primary border-0">Active</Badge>
                    </div>
                    <p className="text-muted-foreground mt-1">$19/month • Renews Dec 15, 2024</p>
                  </div>
                  <Button variant="outline">Manage Billing</Button>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-4">Plan Comparison</h4>
                  <div className="grid gap-4 md:grid-cols-3">
                    {[
                      { name: "Free", price: "$0", features: ["5 generations/month", "Basic support", "720p export"] },
                      { name: "Pro", price: "$19", features: ["100 generations/month", "API access", "1080p export", "Priority support"], current: true },
                      { name: "Enterprise", price: "Custom", features: ["Unlimited generations", "Custom API limits", "4K export", "Dedicated support"] },
                    ].map((plan) => (
                      <Card key={plan.name} className={`border-border/50 ${plan.current ? "ring-2 ring-primary" : ""}`}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{plan.name}</CardTitle>
                          <p className="text-2xl font-bold text-foreground">{plan.price}<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-sm">
                            {plan.features.map((feature) => (
                              <li key={feature} className="flex items-center gap-2 text-muted-foreground">
                                <Check className="w-4 h-4 text-accent" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                          {plan.current ? (
                            <Badge className="mt-4 w-full justify-center bg-primary/20 text-primary border-0">Current Plan</Badge>
                          ) : (
                            <Button variant="outline" className="mt-4 w-full">
                              {plan.name === "Free" ? "Downgrade" : "Upgrade"}
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Tab */}
          <TabsContent value="api" className="space-y-6">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>Manage your API access credentials</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Secret Key</Label>
                  <div className="flex gap-2">
                    <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 border border-border/50 font-mono text-sm">
                      {showApiKey ? apiKey : "rf_sk_••••••••••••••••"}
                    </div>
                    <Button variant="outline" size="icon" onClick={() => setShowApiKey(!showApiKey)}>
                      {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button variant="outline" size="icon" onClick={copyApiKey}>
                      {copied ? <Check className="w-4 h-4 text-accent" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Keep this key secret. Do not share it publicly.</p>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Regenerate Key
                  </Button>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-2">API Usage</h4>
                  <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground">Requests this month</span>
                      <span className="font-semibold">847 / 1,000</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full w-[84.7%] bg-primary rounded-full" />
                    </div>
                  </div>
                </div>

                <Button variant="outline" asChild>
                  <a href="/docs/api" target="_blank">View API Documentation</a>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <Smartphone className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Two-Factor Authentication</h4>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                    </div>
                  </div>
                  <Switch />
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-4">Active Sessions</h4>
                  <div className="space-y-3">
                    {sessions.map((session, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-muted/20 border border-border/50">
                        <div className="flex items-center gap-3">
                          <Monitor className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium text-sm">
                              {session.device}
                              {session.current && <Badge className="ml-2 bg-accent/20 text-accent border-0 text-xs">Current</Badge>}
                            </p>
                            <p className="text-xs text-muted-foreground">{session.location} • {session.lastActive}</p>
                          </div>
                        </div>
                        {!session.current && (
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <Button variant="outline" className="text-destructive hover:text-destructive">
                  Sign Out All Other Sessions
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
