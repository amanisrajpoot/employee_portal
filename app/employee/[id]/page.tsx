'use client'

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { useUserStore, User } from '../../store/userStore';

const EditUserPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams()
  const {id} = useParams()
  console.log(id)
  const { users, loading, error, fetchUsers, editUser, deleteUser } = useUserStore();
  console.log(users)
  const [formData, setFormData] = useState<User>({
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    avatar: '',
  });

  useEffect(() => {
    const userId = parseInt(id as string, 10);
    const user = users.find((u) => u.id === userId);

    if (user) {
      setFormData(user);
    }
  }, [id, users]);

  const handleEditUser = () => {
    editUser(parseInt(id as string, 10), formData);

    router.push('/');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setFormData((prevData) => ({ ...prevData, avatar: file }));
  };

  return (
    <div className='flex flex-col justify-normal max-h-max max-w-max'>
      <h1>Edit User</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleEditUser();
        }}
      >
        <label>
          First Name:
          <input
            type="text"
            value={formData.first_name}
            className='ml-2 my-2'
            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            value={formData.last_name}
            className='ml-2 my-2'
            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="text"
            value={formData.email}
            className='ml-12 my-2'
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </label>
        <br />
        <label>
          Avatar:
          <input
            type="file"
            name="avatar"
            onChange={handleFileChange}
            className='ml-10 py-2'
          />
          <label className='py-0 px-0 mx-0'>{formData.avatar && (formData.avatar as File)?.name}</label>
        </label>
        
        <br />
        <button type="submit" className='py-2'>Save Changes</button>
      </form>
    </div>
  );
};

export default EditUserPage;