'use client'

import create from 'zustand';

export interface EmployeeFormData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

interface EmployeeStore {
  formData: EmployeeFormData;
  setFormData: (data: EmployeeFormData) => void;
  setEmployeeData: (data: EmployeeFormData) => void;
}

export const useEmployeeStore = create<EmployeeStore>((set) => ({
  formData: {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    avatar: '',
  },
  setFormData: (data) => set({ formData: data }),
  setEmployeeData: (data) => set({ formData: data }), 
}));
