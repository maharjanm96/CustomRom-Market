import React from "react";
import UserProfileComponent from "@/app/Components/UserProfileComponent";
import axios from "axios";

const UserProfilePage: React.FC = async () => {
  const profilePicture = "/assets/github-logo.webp";
  const email = "maharjanm96@gmail.com";
  const name = "Manish Maharjan";
  const contact = "9840390774";

  const userData = await axios 

  return (
    <div className="flex justify-center">
      <UserProfileComponent
        profilePicture={profilePicture}
        email={email}
        name={name}
        contact={contact}
      />
    </div>
  );
};

export default UserProfilePage;
