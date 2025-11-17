import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../config/supabase';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchStudentData(session.user.id);
      }
      setLoading(false);
    });

    // Listen for changes on auth state (sign in, sign out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchStudentData(session.user.id);
      } else {
        setStudentData(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchStudentData = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      setStudentData(data);
    } catch (error) {
      console.error('Error fetching student data:', error.message);
    }
  };

  const signUp = async (email, password, studentInfo) => {
    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      if (authData.user) {
        // Insert student data
        const { error: studentError } = await supabase
          .from('students')
          .insert([
            {
              user_id: authData.user.id,
              student_id: studentInfo.studentId,
              first_name: studentInfo.firstName,
              last_name: studentInfo.lastName,
              phone: studentInfo.phone,
              email: email,
              birthday: studentInfo.birthday,
              school_name: studentInfo.schoolName,
              grade: studentInfo.grade,
            },
          ]);

        if (studentError) throw studentError;

        return { data: authData, error: null };
      }
    } catch (error) {
      console.error('Sign up error:', error.message);
      return { data: null, error };
    }
  };

  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Sign in error:', error.message);
      return { data: null, error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setStudentData(null);
      return { error: null };
    } catch (error) {
      console.error('Sign out error:', error.message);
      return { error };
    }
  };

  const updateStudentData = async (updates) => {
    try {
      if (!user) throw new Error('No user logged in');

      const { data, error } = await supabase
        .from('students')
        .update(updates)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      setStudentData(data);
      return { data, error: null };
    } catch (error) {
      console.error('Update student data error:', error.message);
      return { data: null, error };
    }
  };

  const value = {
    user,
    session,
    loading,
    studentData,
    signUp,
    signIn,
    signOut,
    updateStudentData,
    fetchStudentData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
