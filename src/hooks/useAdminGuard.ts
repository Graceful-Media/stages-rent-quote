
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useAdminGuard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let mounted = true;

    const checkAdminStatus = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!mounted) return;

        if (!session) {
          setIsAuthenticated(false);
          setIsAdmin(false);
          setIsLoading(false);
          return;
        }

        setIsAuthenticated(true);

        const { data: roles, error } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .eq("role", "admin")
          .maybeSingle();

        if (!mounted) return;

        if (error) {
          throw error;
        }

        setIsAdmin(!!roles);
      } catch (error) {
        console.error("Error checking admin status:", error);
        if (mounted) {
          setIsAuthenticated(false);
          setIsAdmin(false);
          toast.error("Error checking admin status");
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    // Initial check
    checkAdminStatus();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;
      
      if (event === 'SIGNED_IN' && session) {
        await checkAdminStatus();
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        setIsAdmin(false);
        setIsLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return { isLoading, isAdmin, isAuthenticated };
};
