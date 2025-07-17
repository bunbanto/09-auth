'use client';

import { AuthRequest, login } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import css from './SignIn.module.css';

export default function SignIn() {
  const [error, setError] = useState('');

  const router = useRouter();
  const setUser = useAuthStore(state => state.setUser);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const formValues = Object.fromEntries(formData) as AuthRequest;

    try {
      const user = await login(formValues);
      setUser(user);
      router.replace('/profile');
      console.log('Before redirect');
      router.replace('/profile');
      console.log('After redirect');
    } catch (error) {
      console.log('error', error);
      setError('Invalid email or password');
    }
  };

  return (
    <>
      <h1 className={css.formTitle}>Sign in</h1>
      <form onSubmit={handleSubmit} className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className={css.input}
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            className={css.input}
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </>
  );
}
