import { cookies } from 'next/headers';
import { User } from '@/types/user';
import { Note } from '@/types/note';
import { nextServer } from './api';

export interface FetchNotesHTTPResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  search?: string;
  page?: number;
  tag?: string;
}

export type ServerResponse = {
  success: boolean;
};
// export const getServerMe = async (): Promise<User | null> => {
//   const cookieData = await cookies();
//   const cookieHeader = Object.entries(cookieData.getAll())
//     .map(([key, val]) => `${key}=${val}`)
//     .join('; ');

//   try {
//     const { data } = await nextServer.get<User>(`/users/me`, {
//       headers: { Cookie: cookieHeader },
//     });
//     return data;
//   } catch (error) {
//     console.error('getServerMe error:', error);
//     return null;
//   }
// };

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join('; ');

  const { data } = await nextServer.get<User>('/users/me', {
    headers: {
      Cookie: cookieHeader,
    },
  });
  console.log('cookieHeader:', cookieHeader);
  return data;
};

export const fetchNotes = async ({ search, page, tag }: FetchNotesParams) => {
  const cookieStore = await cookies();

  const response = await nextServer.get<FetchNotesHTTPResponse>('/notes', {
    params: {
      ...(search !== '' && { search }),
      page,
      perPage: 12,
      ...(tag && { tag }),
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export const checkSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get<ServerResponse>('/auth/session', {
    headers: { Cookie: cookieStore.toString() },
  });
  return res;
};

export const getNoteById = async (id: string) => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
