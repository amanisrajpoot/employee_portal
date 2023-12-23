'use client'

import React from 'react';
import EmployeeForm from './EmployeeForm';
import { useUserStore } from '../store/userStore'; 
import { User } from '../store/userStore';

const Add: React.FC = () => {
  const { addUser } = useUserStore();

  const handleFormSubmit = (formData: Partial<User>) => {
    const completeFormData: User = {
      id: 0, 
      first_name: '',
      last_name: '',
      email: '',
      avatar: '',
      ...formData, 
    };

    addUser(completeFormData);
  };

  return (
    <div>
      <h1>Add Employee</h1>
      <EmployeeForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default Add;
