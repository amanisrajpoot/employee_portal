'use client'

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUserStore, User } from '../../store/userStore';

interface EditUserPageProps {
  users: User[];
}

const EditUserPage: React.FC<EditUserPageProps> = () => {
  const router = useRouter();
  const searchParams = useSearchParams()
  const id = searchParams.get('id');
  const { users, loading, error, fetchUsers, editUser, deleteUser } = useUserStore();
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

  return (
    <div>
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
            style={{margin:"10px"}}
            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            value={formData.last_name}
            style={{margin:"10px"}}
            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="text"
            value={formData.email}
            style={{margin:"10px", marginLeft:'5ch'}}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </label>
        <br />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditUserPage;