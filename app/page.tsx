'use client'

import Link from 'next/link';
import EmployeeList from './EmployeeList';

const Home: React.FC = () => {

  return (
    <div className="container">
      <h1>Employee Management</h1>
        <button style={{color:'white', margin:'10px'}}>
          <Link href="/add" style={{color:'white', padding:'10px'}}>Add Employee</Link>
        </button>

      <div>
        <EmployeeList />
      </div>
    </div>
  );
};

export default Home;



