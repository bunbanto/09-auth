'use client';

import { AuthRequest, register } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import css from './SignUp.module.css';

export default function SignUp() {
  const router = useRouter();
  const [error, setError] = useState('');

  const setUser = useAuthStore(state => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as AuthRequest;
      console.log('Sending to API:', formValues);
      const user = await register(formValues);
      if (user) {
        setUser(user);
        router.replace('/profile');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.log('error', error);
      setError('Oops... Something went wrong, try later');
    }
  };

  const handleSubmitWrapper = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    handleSubmit(formData);
  };

  return (
    <>
      <h1 className={css.formTitle}>Sign up</h1>
      <form onSubmit={handleSubmitWrapper} className={css.form}>
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
            Register
          </button>
        </div>
      </form>
      {error && <p>{error}</p>}
    </>
  );
}
