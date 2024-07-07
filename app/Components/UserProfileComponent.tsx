import React from "react";

interface UserProfileProps {
  email: string;
  name: string;
  contact: string;
}

const UserProfileComponent: React.FC<UserProfileProps> = ({
  email,
  name,
  contact,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8  ">
      <div className="flex flex-col items-center justify-center p-8 gap-2 rounded-md bg-white border-2 border-black shadow-lg">
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-gray-600">{contact}</p>
        <p className="text-gray-600">{email}</p>
      </div>
    </div>
  );
};

export default UserProfileComponent;
