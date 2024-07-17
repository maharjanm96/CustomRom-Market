import React from "react";
import Image from "next/image";

interface UserProfileProps {
  // profilePicture: string;
  email: string;
  name: string;
  contact: string;
}

const UserProfileComponent: React.FC<UserProfileProps> = ({
  // profilePicture,
  email,
  name,
  contact,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white shadow-lg rounded-lg">
      <div className="">
        {/* <Image
          src={profilePicture}
          alt="Profile"
          width={100}
          height={100}
          className="rounded-full"
        /> */}
      </div>
      <div className="flex flex-col items-center justify-center pt-8 gap-2">
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-gray-600">{contact}</p>
        <p className="text-gray-600">{email}</p>
      </div>
    </div>
  );
};

export default UserProfileComponent;
