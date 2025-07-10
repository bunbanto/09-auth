import { DraftNote } from '@/types/note';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NoteStore {
  draft: DraftNote;
  setDraft: (note: Partial<DraftNote>) => void;
  clearDraft: () => void;
}

const initialDraft: DraftNote = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteStore = create<NoteStore>()(
  persist(
    (set, get) => ({
      draft: initialDraft,
      setDraft: note => set({ draft: { ...get().draft, ...note } }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft-storage',
    }
  )
);

export { initialDraft };
