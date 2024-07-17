import React from "react";
import { useSession } from "next-auth/react";

const UserProfileComponent = () => {
  const { data: session } = useSession();
  return (
    <>
      {session ? (
        <div className="flex flex-col items-center justify-center pt-8 gap-2">
          <img
            src={session?.user?.image as string}
            className="rounded-full h-20 w-20"
          ></img>
          <h2 className="text-lg font-semibold">{session?.user?.name}</h2>
          <p className="text-gray-600">{session?.user?.email}</p>
        </div>
      ) : (
        <>Not logged in</>
      )}
    </>
  );
};

export default UserProfileComponent;
