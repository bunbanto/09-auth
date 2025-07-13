'use client';

import { useQuery } from '@tanstack/react-query';
import { getNoteById } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import css from './NotePreview.module.css';
import { useCallback } from 'react';

type Props = {
  id: string;
};

export default function NotePreview({ id }: Props) {
  const router = useRouter();
  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => getNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <button onClick={handleClose} className={css.backBtn}>
            go Back
          </button>
        </div>
        <p className={css.content}>{note.content}</p>
        <div className={css.tagdate}>
          {note.tag && <p className={css.tag}>{note.tag}</p>}
          <p className={css.date}>
            {new Intl.DateTimeFormat('uk-UA', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }).format(new Date(note.createdAt))}
          </p>
        </div>
      </div>
    </div>
  );
}
