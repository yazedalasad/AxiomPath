import { createClient } from '@supabase/supabase-js';

// For now, hardcode to get it working
const supabaseUrl = 'https://xeczbejdaqkszhnacxeh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlY3piZWpkYXFrc3pobmFjeGVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3Mjc2MTQsImV4cCI6MjA3NzMwMzYxNH0.1UCGPY04rj0I6rUTR60qdog990TtZ_OtCfb-yO9gkeY';

console.log('✅ Using Supabase:', supabaseUrl);

export const supabase = createClient(supabaseUrl, supabaseKey);