// import { fetchNotes } from '@/lib/api/api';
import NoteClient from './Notes.client';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0] === 'all' ? undefined : slug[0];
  const pageTitle = tag ? `Notes - ${tag}` : 'Notes - All notes';
  return {
    title: pageTitle,
    description: `Notes filtered by ${tag || 'All notes'}`,
    openGraph: {
      title: pageTitle,
      description: `Notes filtered by ${tag || 'All notes'}`,
      url: `https://08-zustand-snowy.vercel.app/notes/filter/${slug.join('/')}`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: `Notes filtered by ${tag || 'All notes'}`,
      images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
    },
  };
}

const Page = async ({ params }: Props) => {
  const { slug } = await params;
  const tag = slug[0] === 'all' ? undefined : slug[0];
  //const response = await fetchNotes({ page: 1, search: '', tag });

  return (
    <section>
      <NoteClient tag={tag} />
    </section>
  );
};

export default Page;
