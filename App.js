import React, { useEffect } from 'react';
import ManualNavigator from './navigation/ManualNavigator';
import TestActivator from './components/Test/TestActivator';

// Debug
console.log('🔧 Environment check:', {
  url: process.env.EXPO_PUBLIC_SUPABASE_URL ? '✅ Loaded' : '❌ Missing',
  key: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ? '✅ Loaded' : '❌ Missing'
});

export default function App() {
  return (
    <>
      <ManualNavigator />
      <TestActivator />
    </>
  );
}