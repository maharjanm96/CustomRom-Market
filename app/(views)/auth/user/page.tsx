import React from "react";
import UserProfileComponent from "@/app/Components/UserProfileComponent";

const UserProfilePage: React.FC = () => {
  const profilePicture = "/assets/github-logo.webp";
  const email = "maharjanm96@gmail.com";

  return (
    <div className="flex justify-center">
      <UserProfileComponent profilePicture={profilePicture} email={email} />
    </div>
  );
};

export default UserProfilePage;
