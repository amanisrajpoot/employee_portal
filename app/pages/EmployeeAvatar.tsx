'use client'

import React from 'react';

interface EmployeeAvatarProps {
  imageUrl: string | null | File;
}

const EmployeeAvatar: React.FC<EmployeeAvatarProps> = ({ imageUrl }) => {
  return (
    <img src={imageUrl instanceof File ? URL.createObjectURL(imageUrl) : imageUrl ?? undefined} alt="Employee Avatar" />
  );
};

export default EmployeeAvatar;

