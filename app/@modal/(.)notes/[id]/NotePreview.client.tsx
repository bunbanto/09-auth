'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Modal from '@/components/Modal/Modal';
//import NotePreview from '@/components/NotePreview/NotePreview';
import css from '@/app/@modal/(.)notes/[id]/NotePreview.client.module.css';
import Loader from '@/components/Loader/Loader';
import { getNoteById } from '@/lib/api';
import type { Note } from '@/types/note';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function NoteDetailsClient() {
  const { id: numId } = useParams<{ id: string }>();
  const router = useRouter();

  const id = Number(numId);
  const handleClose = () => router.back();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery<Note>({
    queryKey: ['note', id],
    queryFn: () => getNoteById(Number(id)),
    refetchOnMount: false,
  });

  return (
    <Modal onClose={handleClose}>
      {isLoading && <Loader />}
      {error && <p>Error loading note</p>}
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
