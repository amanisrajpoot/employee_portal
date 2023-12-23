'use client'

import Link from 'next/link';
import EmployeeList from './pages/EmployeeList';

const Home: React.FC = () => {
  return (
    <div className="container">
      <h1>Employee Management</h1>
      <Link href="/add">Add Employee</Link>
      <div>
        <EmployeeList />
      </div>
    </div>
  );
};

export default Home;



