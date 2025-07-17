import { Note } from '@/types/note';
import { User } from '@/types/user';
import { nextServer } from './api';
import { FetchNotesParams, FetchNotesHTTPResponse } from './serverApi';

export type AuthRequest = {
  email: string;
  password: string;
};

export type UpdateUserRequest = {
  username: string;
};

export const fetchNotes = async ({ search, page, tag }: FetchNotesParams) => {
  const response = await nextServer.get<FetchNotesHTTPResponse>('/notes', {
    params: {
      ...(search !== '' && { search }),
      page,
      perPage: 12,
      ...(tag && { tag }),
    },
  });
  return response.data;
};

export const getNoteById = async (id: string): Promise<Note> => {
  const { data } = await nextServer.get<Note>(`/notes/${id}`);
  return data;
};

export type CreateNoteParams = {
  title: string;
  content: string;
  tag?: string;
};

export async function createNote({
  title,
  content,
  tag,
}: CreateNoteParams): Promise<Note> {
  const response = await nextServer.post<Note>('/notes', {
    title,
    content,
    tag,
  });
  return response.data;
}

export const deleteNote = async (id: string) => {
  const response = await nextServer.delete<Note>(`/notes/${id}`);
  return response.data;
};

export const login = async (logindata: AuthRequest) => {
  const { data } = await nextServer.post<User>('/auth/login', logindata);
  return data;
};

export const register = async (data: AuthRequest): Promise<User> => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

export const checkSession = async () => {
  await nextServer.get('/auth/session');
};

export const getMe = async (): Promise<User> => {
  const { data } = await nextServer.get('/users/me');
  return data;
};

export const updateMe = async (updata: UpdateUserRequest): Promise<User> => {
  const { data } = await nextServer.patch('/users/me', updata);
  return data;
};
