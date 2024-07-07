"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import UserProfileComponent from "@/app/Components/UserProfileComponent";
import { getCookie } from "cookies-next";

interface UserData {
  profilePicture: string;
  email: string;
  name: string;
  contact: string;
}

const UserPage = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const userID = getCookie("userID");

    if (userID) {
      axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user?id=${userID}`)
        .then((response) => {
          const data = response.data;
          if (response.status === 200) {
            setUserData(data);
          } else {
            setError("User not found");
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
          setError("Error fetching user data");
          setLoading(false);
        });
    } else {
      setError("No user ID found in cookies");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!userData) {
    return <p>No user data found.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <UserProfileComponent
        email={userData.email}
        name={userData.name}
        contact={userData.contact}
      />
    </div>
  );
};

export default UserPage;
