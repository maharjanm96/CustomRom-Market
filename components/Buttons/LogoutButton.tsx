import { signOut } from "next-auth/react";
import React from "react";

const LogoutButton = () => {
  return (
    <button
      className="border-2 text-center rounded-lg p-2 px-4 w-auto bg-black text-white"
      onClick={() => {
        signOut({ callbackUrl: `/` });
      }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
