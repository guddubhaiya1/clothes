import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { LogOut, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface User {
  id: string;
  email: string;
  displayName: string;
  avatar?: string;
  createdAt: string;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/user");
        const data = await response.json();
        if (data) {
          setUser(data);
        } else {
          setLocation("/login");
        }
      } catch (error) {
        setLocation("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [setLocation]);

  const handleLogout = async () => {
    try {
      await apiRequest("POST", "/api/auth/logout", {});
      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
      });
      setLocation("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to logout",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen pt-20 md:pt-24 pb-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-4">
            <div className="h-32 bg-muted rounded-lg" />
            <div className="h-20 bg-muted rounded-lg" />
          </div>
        </div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen pt-20 md:pt-24 pb-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2 text-foreground">Your Profile</h1>
          <p className="text-muted-foreground">Manage your CodeDrip account</p>
        </motion.div>

        <Card className="p-6 md:p-8 mb-6">
          <div className="flex items-center gap-6">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.displayName}
                className="w-20 h-20 rounded-full"
                data-testid="img-user-avatar"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <UserIcon className="w-10 h-10 text-primary" />
              </div>
            )}

            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground" data-testid="text-user-name">
                {user.displayName}
              </h2>
              <p className="text-muted-foreground" data-testid="text-user-email">
                {user.email}
              </p>
              <p className="text-sm text-muted-foreground mt-1" data-testid="text-user-joined">
                Joined {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 md:p-8">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Account Actions</h3>
          <div className="space-y-3">
            <Button
              variant="secondary"
              className="w-full gap-2"
              onClick={() => setLocation("/shop")}
              data-testid="button-continue-shopping-profile"
            >
              Continue Shopping
            </Button>
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={handleLogout}
              data-testid="button-logout"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </Card>
      </div>
    </main>
  );
}
