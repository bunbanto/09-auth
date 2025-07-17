import { getServerMe } from '@/lib/api/serverApi';

import css from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile | NoteHub',
  description:
    'View your profile information and manage your account on NoteHub.',
  openGraph: {
    title: 'Profile | NoteHub',
    description:
      'View your profile information and manage your account on NoteHub.',
    url: `https://09-auth-rust.vercel.app
/profile`,
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub - Manage your profile and account settings.',
      },
    ],
  },
};

export default async function Profile() {
  const data = await getServerMe();
  return (
    <>
      {data && (
        <main className={css.mainContent}>
          <div className={css.profileCard}>
            <div className={css.header}>
              <h1 className={css.formTitle}>Profile Page</h1>
              <Link href="/profile/edit" className={css.editProfileButton}>
                Edit Profile
              </Link>
            </div>

            <div className={css.avatarWrapper}>
              <Image
                src={data.avatar}
                alt="User Avatar"
                width={120}
                height={120}
                className={css.avatar}
              />
            </div>

            <div className={css.profileInfo}>
              <p>Username: {data.username}</p>
              <p>Email: {data.email}</p>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
