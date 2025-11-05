import { supabase } from '../config/supabase';

// Israeli ID validation function
const validateIsraeliId = (id) => {
  if (!/^\d{9}$/.test(id)) return false;
  
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    let digit = parseInt(id[i]);
    if ((i + 1) % 2 === 0) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }
  return sum % 10 === 0;
};

// Student Sign Up
export const signUpStudent = async (userData) => {
  try {
    console.log('📝 Creating student:', userData.email);
    
    // Validate Israeli ID for students
    if (!validateIsraeliId(userData.israeliId)) {
      throw new Error('Invalid Israeli ID number');
    }

    // Validate phone (Israeli format: +9725XXXXXXXX)
    if (!/^\+9725[0-9]{8}$/.test(userData.phone)) {
      throw new Error('Phone must be in format: +9725XXXXXXXX');
    }

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      phone: userData.phone,
    });

    if (authError) {
      console.log('❌ Auth error:', authError.message);
      throw authError;
    }

    console.log('✅ Auth user created:', authData.user.id);

    // Create user profile in database (NO school_id)
    const { data: profileData, error: profileError } = await supabase
      .from('users')
      .insert([
        {
          id: authData.user.id,
          email: userData.email,
          phone: userData.phone,
          israeli_id: userData.israeliId,
          user_type: 'student',
          first_name: userData.firstName,
          last_name: userData.lastName,
          date_of_birth: userData.dateOfBirth,
          // school_id removed
        }
      ])
      .select();

    if (profileError) {
      console.log('❌ Profile error:', profileError.message);
      throw profileError;
    }

    console.log('✅ Student profile created:', profileData[0]);
    return { success: true, user: authData.user, profile: profileData[0] };
  } catch (error) {
    console.log('❌ Student signup failed:', error.message);
    return { success: false, error: error.message };
  }
};

// Universal Sign In with Auto-Detection
export const signIn = async (identifier, password) => {
  try {
    console.log('🔐 Attempting sign in with:', identifier);
    
    let loginValue = identifier;
    
    // Phone detection (Israeli format)
    if (identifier.startsWith('+972')) {
      console.log('📱 Phone detected');
      // Find user by phone to get their email
      const { data: user, error: phoneError } = await supabase
        .from('users')
        .select('email')
        .eq('phone', identifier)
        .single();
      
      if (phoneError || !user) {
        throw new Error('Phone number not found');
      }
      loginValue = user.email;
    } 
    // Israeli ID detection (9 digits)
    else if (/^\d{9}$/.test(identifier)) {
      console.log('🆔 Israeli ID detected');
      // Find user by Israeli ID to get their email
      const { data: user, error: idError } = await supabase
        .from('users')
        .select('email')
        .eq('israeli_id', identifier)
        .single();
      
      if (idError || !user) {
        throw new Error('Israeli ID not found');
      }
      loginValue = user.email;
    }
    // Email detection (default)
    else {
      console.log('📧 Email detected');
    }

    console.log('🔑 Signing in with email:', loginValue);
    
    // Sign in with email
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginValue,
      password: password,
    });

    if (error) throw error;

    // Get user profile with type
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (profileError) throw profileError;

    console.log('✅ Login successful. User type:', profile.user_type);
    
    return { 
      success: true, 
      user: data.user, 
      profile: profile,
      userType: profile.user_type 
    };
  } catch (error) {
    console.log('❌ Login failed:', error.message);
    return { success: false, error: error.message };
  }
};

// Keep the other functions as they are
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

export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

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