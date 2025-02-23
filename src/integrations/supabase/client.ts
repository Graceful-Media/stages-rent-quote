
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://woecdpxjlxfnuqvlpchf.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvZWNkcHhqbHhmbnVxdmxwY2hmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg3MjMxMDYsImV4cCI6MjA1NDI5OTEwNn0.RU9ehtq8dyT3oe7NW_eYsXaoSgCrHGbt57CHIGM4808";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: 'sb-auth-token',
    storage: {
      getItem: (key) => {
        try {
          const value = localStorage.getItem(key);
          return value ? JSON.parse(value) : null;
        } catch (error) {
          console.error('Error getting auth state:', error);
          return null;
        }
      },
      setItem: (key, value) => {
        try {
          localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
          console.error('Error setting auth state:', error);
        }
      },
      removeItem: (key) => {
        try {
          localStorage.removeItem(key);
        } catch (error) {
          console.error('Error removing auth state:', error);
        }
      },
    },
  },
});
