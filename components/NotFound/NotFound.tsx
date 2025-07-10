'use client';

import { useRouter } from 'next/navigation';
import css from './NotFound.module.css';

const NotFound = () => {
  const router = useRouter();

  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <button onClick={() => router.push('/')} className={css.homeBtn}>
        Go back home
      </button>
    </>
  );
};

export default NotFound;
