'use client';

import { checkSession, getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore(state => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    state => state.clearIsAuthenticated
  );

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        await checkSession();
        const user = await getMe();
        if (user && isMounted) setUser(user);
      } catch {
        if (isMounted) clearIsAuthenticated();
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, [setUser, clearIsAuthenticated]);

  return children;
};

export default AuthProvider;
