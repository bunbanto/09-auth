'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import Modal from '@/components/Modal/Modal';
import css from '@/app/@modal/(.)notes/[id]/NotePreview.client.module.css';
import Loader from '@/components/Loader/Loader';
import { getNoteById } from '@/lib/api/clientApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

type NoteDetailsClientProps = { id: string };

export default function NoteDetailsClient({ id }: NoteDetailsClientProps) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => getNoteById(id),
    refetchOnMount: false,
  });

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError || !note) return <p>Something went wrong.</p>;

  return (
    <Modal onClose={handleClose}>
      {isLoading && <Loader />}
      {isError && <p>Error loading note</p>}
      {note && (
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
              <button onClick={handleClose} className={css.backBtn}>
                <FontAwesomeIcon icon={faArrowLeft} /> Back
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
      )}
    </Modal>
  );
}
