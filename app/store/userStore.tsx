'use client'

import create from 'zustand';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: File | string | null;
}

interface UserStore {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  editUser: (userId: number, updatedUser: Partial<User>) => void;
  deleteUser: (userId: number) => void;
  addUser: (newUser: User) => void;
}

function mergeUniqueUsers(existingUsers: User[], newUsers: User[]): User[] {
  const existingUserIds = new Set(existingUsers.map((user) => user.id));
  const uniqueNewUsers = newUsers.filter((user) => !existingUserIds.has(user.id));

  return [...existingUsers, ...uniqueNewUsers];
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  loading: false,
  error: null,
  fetchUsers: async () => {
    set({ loading: true, error: null });
  
    try {
      const response = await fetch('https://reqres.in/api/users');
      const data = await response.json();
  
      if (response.ok) {
        set((state) => ({
          users: mergeUniqueUsers(state.users, data.data),
          loading: false,
        }));
      } else {
        set({ error: 'Failed to fetch users', loading: false });
      }
    } catch (error) {
      set({ error: 'An error occurred', loading: false });
    }
  },  
  editUser: (userId, updatedUser) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === userId ? { ...user, ...updatedUser } : user
      ),
    })),
  deleteUser: (userId) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== userId),
    })),
  addUser: (newUser) =>
    set((state) => ({
      users: [...state.users, { ...newUser, id: state.users.length + 1 }],
    })),
}));
