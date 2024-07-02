// pages/not-authorized.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotAuthorized = () => {
  return (
    <>
      <div
        className="flex items-center justify-center bg-white"
        style={{ height: "40vh" }}
      >
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-4xl font-bold text-black mb-4">
            403 - Not Authorized
          </h1>
          <p className="text-black mb-4">
            You are not authorized to view this page.
          </p>
          <p className="mb-4">Go to login</p>
          <Link href="/auth/login">
            <Button variant="black" size="full">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotAuthorized;
