import NotFound from '@/components/NotFound/NotFound';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist.',
  openGraph: {
    title: 'Page Not Found',
    description: 'The page you are looking for does not exist.',
    url: 'https://08-zustand-snowy.vercel.app/not-found',
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Page Not Found',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Page Not Found',
    description: 'The page you are looking for does not exist.',
    images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
  },
};

export default function NotFoundPage() {
  return <NotFound />;
}
