export interface Note {
  id: number;
  title: string;
  content: string;
  tag: Tag;
  createdAt: string;
  updatedAt: string;
}

export interface DraftNote {
  title: string;
  content: string;
  tag: Tag;
}

export type Tag = 'Work' | 'Todo' | 'Personal' | 'Meeting' | 'Shopping';
