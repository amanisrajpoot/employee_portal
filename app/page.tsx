'use client'

import Link from 'next/link';
import EmployeeList from './EmployeeList';

const Home: React.FC = () => {

  return (
    <div className="container">
      <h1>Employee Management</h1>
        <button className="my-5">
          <Link href="/add" className="text-white">Add Employee</Link>
        </button>

      <div>
        <EmployeeList />
      </div>
    </div>
  );
};

export default Home;



