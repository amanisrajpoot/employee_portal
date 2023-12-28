'use client'

import React, { useState } from 'react';
import { User } from '../store/userStore';
import { useRouter } from 'next/navigation';
import { useUserStore } from '../store/userStore';

const Add: React.FC = () => {
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
    console.log(file)
    setFormData((prevData) => ({ ...prevData, avatar: file }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleFormSubmit(formData);
  };

  return (

    <form onSubmit={handleSubmit} className='flex flex-col justify-normal max-h-max max-w-max'>
      <h1>Add Employee</h1>
          <label className='py-2'>
            First Name:
            <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} className='ml-4'/>
          </label>

          <label className='py-2'>
            Last Name:
            <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} className='ml-4'/>
          </label>

          <label className='py-2'>
            Email:
            <input type="text" name="email" value={formData.email} onChange={handleChange} className='ml-14'/>
         </label>

        <label className='py-2'>
            Avatar:
            <input type="file" name="avatar" onChange={handleFileChange} className='ml-12'/>
            <label className='py-0 px-0 mx-0'>{formData.avatar && (formData.avatar as File)?.name}</label>
        </label>

      <button type="submit" className='py-2'>Add Employee</button>
    </form>
  );
};

export default Add;

