'use client'

import React, { useState } from 'react';
import { User } from '../store/userStore';
import { useRouter } from 'next/navigation';
import { useUserStore } from '../store/userStore';

interface EmployeeFormProps {
  onSubmit: (formData: Partial<User>) => void;
}

const Add: React.FC<EmployeeFormProps> = () => {
  const router = useRouter()
  const { addUser, users } = useUserStore();
  const [formData, setFormData] = useState<Partial<User>>({
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    avatar: '',
  });
  
  const handleFormSubmit = async (formData: Partial<User>) => {
    const completeFormData: User = {
      id: users.length+6+1, 
      first_name: '',
      last_name: '',
      email: '',
      avatar: '',
      ...formData, 
    };

    await addUser(completeFormData);
    router.push('/');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setFormData((prevData) => ({ ...prevData, avatar: file }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleFormSubmit(formData);
  };

  return (

    <form onSubmit={handleSubmit}>
      <h1>Add Employee</h1>
      <label>
            First Name:
            <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
          </label>

          <label>
            Last Name:
            <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
          </label>

          <label>
            Email:
            <input type="text" name="email" value={formData.email} onChange={handleChange} />
         </label>

        <label>
            Avatar:
            <input type="file" name="avatar" onChange={handleFileChange} />
        </label>

      <button type="submit">Add Employee</button>
    </form>
  );
};

export default Add;

