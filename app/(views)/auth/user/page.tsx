"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from next/router
import axios from "axios";
import UserProfileComponent from "@/components/UserProfileComponent";
import { useSearchParams } from "next/navigation";

interface UserData {
  profilePicture: string;
  email: string;
  name: string;
  contact: string;
}

const UserPage = () => {
  const router = useRouter();
  // const profilePicture = "/assets/github-logo.webp";
  const searchParams = useSearchParams();
  let id = searchParams.get("id");

  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user?id=${id}`)
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
    }
  }, [id]);

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
        // profilePicture={userData.profilePicture}
        email={userData.email}
        name={userData.name}
        contact={userData.contact}
      />
    </div>
  );
};

export default UserPage;
