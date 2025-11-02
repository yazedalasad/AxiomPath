import { supabase } from './supabase.js';

// Test the connection
async function testConnection() {
  console.log('🔌 Testing Supabase connection...');
  
  try {
    // Simple test - get the current time from Supabase
    const { data, error } = await supabase.from('users').select('count');
    
    if (error) {
      console.log('❌ Connection FAILED:', error.message);
    } else {
      console.log('✅ Connection SUCCESSFUL! Supabase is connected.');
    }
  } catch (error) {
    console.log('❌ Connection ERROR:', error.message);
  }
}

testConnection();
