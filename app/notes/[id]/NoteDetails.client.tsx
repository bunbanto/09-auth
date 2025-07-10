'use client';

import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getNoteById } from '@/lib/api';
import css from './NoteDetails.module.css';

const NoteDetailsClient: FC = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => getNoteById(Number(id)),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <button className={css.editBtn}>Edit note</button>
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
};

export default NoteDetailsClient;
