import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string = import.meta.env.VITE_SUPBASE_URL!;
const supabaseAnonKey: string = import.meta.env.VITE_SUPABASE_KEY!;
export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
export const fetchCurrentUser = async () => {
  const user = await supabaseClient.auth.getSession();
  return user;
};
