import { logout } from "@/actions/logout";
import { auth } from "@/auth";
import React from "react";

const ProfileCard = async () => {
  const session = await auth();
  return (
    <div className="flex flex-col justify-center items-center">
      {session?.user?.email}, {session?.user?.name}, {session?.user?.role}
      <div>
        <form action={logout}>
          <button
            type="submit"
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileCard;
