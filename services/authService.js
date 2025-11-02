import { supabase } from '../config/supabase';

// Sign up new user
export const signUp = async (userData) => {
  try {
    console.log('📝 Creating user:', userData.email);
    
    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
    });

    if (authError) {
      console.log('❌ Auth error:', authError.message);
      throw authError;
    }

    console.log('✅ Auth user created:', authData.user.id);

    // Create user profile in database
    const { data: profileData, error: profileError } = await supabase
      .from('users')
      .insert([
        {
          id: authData.user.id,
          email: userData.email,
          first_name: userData.firstName,
          last_name: userData.lastName,
          phone: userData.phone,
          student_id: userData.studentId,
        }
      ])
      .select();

    if (profileError) {
      console.log('❌ Profile error:', profileError.message);
      throw profileError;
    }

    console.log('✅ User profile created:', profileData[0]);
    return { success: true, user: authData.user, profile: profileData[0] };
  } catch (error) {
    console.log('❌ Signup failed:', error.message);
    return { success: false, error: error.message };
  }
};

// Sign in existing user
export const signIn = async (email, password) => {
  try {
    console.log('🔐 Signing in:', email);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) throw error;

    console.log('✅ Login successful:', data.user.id);
    return { success: true, user: data.user };
  } catch (error) {
    console.log('❌ Login failed:', error.message);
    return { success: false, error: error.message };
  }
};

// Sign out user
export const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    console.log('✅ Logout successful');
    return { success: true };
  } catch (error) {
    console.log('❌ Logout failed:', error.message);
    return { success: false, error: error.message };
  }
};

// Get current user session
export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Get user profile
export const getUserProfile = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
