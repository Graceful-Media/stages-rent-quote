
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
        // First check if we have an active session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) throw sessionError;

        if (!mounted) return;

        if (!session) {
          setIsAuthenticated(false);
          setIsAdmin(false);
          setIsLoading(false);
          return;
        }

        // Set authenticated immediately to prevent unnecessary redirects
        setIsAuthenticated(true);

        // Check admin role
        const { data: adminRole, error: roleError } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .eq("role", "admin")
          .maybeSingle();

        if (roleError) throw roleError;

        if (!mounted) return;

        // Update admin status based on role check
        setIsAdmin(!!adminRole);
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

    // Perform initial check
    checkAdminStatus();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;

      if (event === "SIGNED_OUT") {
        setIsAuthenticated(false);
        setIsAdmin(false);
        setIsLoading(false);
      } else if (event === "SIGNED_IN" && session) {
        checkAdminStatus();
      }
    });

    // Cleanup function
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return { isLoading, isAdmin, isAuthenticated };
};
