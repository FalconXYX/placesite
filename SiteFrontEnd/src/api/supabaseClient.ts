import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://otrmdwbhtgahctqcezll.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90cm1kd2JodGdhaGN0cWNlemxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMDUxNTksImV4cCI6MjA3NDY4MTE1OX0.4jT9e-B-Lyzx4ckTNgL8Pw1vkTM7wy-ROS9r27TjXQg";
export const supabase = createClient(supabaseUrl, supabaseKey);
