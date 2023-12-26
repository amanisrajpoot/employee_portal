'use client'

import React, { useEffect } from 'react';
import EmployeeAvatar from './EmployeeAvatar';
import { useUserStore } from './store/userStore';
import { useRouter } from 'next/navigation';

const EmployeeList: React.FC = () => {
  const router = useRouter();
  const { users, loading, error, fetchUsers, editUser, deleteUser } = useUserStore();

  useEffect(() => {
    if (typeof window !== 'undefined' && !users.length) {
      fetchUsers();
    }

  }, []);

  useEffect(()=>{
    console.log("users", users)
  },[])
  
  const handleDeleteUser = (userId: number) => {
    deleteUser(userId);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ul>
      {users && users.map((employee) => (
        <li key={employee.id}>
          <EmployeeAvatar imageUrl={employee.avatar} />         
          <div style={{color:'black'}}>
            <strong>{employee.first_name.length > 25 ? `${employee.first_name.slice(0, 25)}...` : employee.first_name}</strong>
            <p>Email: {employee.email}</p>
          </div>
          <div>
            <button onClick={() => router.push(`/employee/${employee.id}`)}>Edit</button>
            <button onClick={() => handleDeleteUser(employee.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default EmployeeList;
