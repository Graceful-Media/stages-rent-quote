
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
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) throw sessionError;

        if (!mounted) return;

        if (!session) {
          setIsAuthenticated(false);
          setIsAdmin(false);
          setIsLoading(false);
          return;
        }

        setIsAuthenticated(true);

        // Simplified admin role check that works with our new RLS policy
        const { data: adminRole, error: roleError } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .eq("role", "admin")
          .single();

        if (roleError && roleError.code !== 'PGRST116') { // Ignore "no rows returned" error
          throw roleError;
        }

        if (!mounted) return;

        setIsAdmin(!!adminRole);
        setIsLoading(false);
      } catch (error: any) {
        console.error("Error checking admin status:", error);
        if (mounted) {
          setIsAuthenticated(false);
          setIsAdmin(false);
          setIsLoading(false);
        }
      }
    };

    checkAdminStatus();

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

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return { isLoading, isAdmin, isAuthenticated };
};
