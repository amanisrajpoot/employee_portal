'use client'

import React, { useState } from 'react';
import { User } from '../store/userStore';
import { useRouter } from 'next/navigation';

interface EmployeeFormProps {
  onSubmit: (formData: Partial<User>) => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ onSubmit }) => {
  const router = useRouter()
  const [formData, setFormData] = useState<Partial<User>>({
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    avatar: '',
  });

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
    onSubmit(formData);
    router.push('/')
  };

  return (
    <form onSubmit={()=>handleSubmit}>
      <label>
            First Name:
            <input type="text" name="firstName" value={formData.first_name} onChange={handleChange} />
          </label>

          <label>
            Last Name:
            <input type="text" name="lastName" value={formData.last_name} onChange={handleChange} />
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

export default EmployeeForm;
