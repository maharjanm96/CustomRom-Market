import Header from "@/components/Header";
import { currentRole } from "./auth";
import AdminHeader from "@/components/AdminHeader";

export async function AuthWrapper({ children }: { children: React.ReactNode }) {
  const user = await currentRole();

  if (user === "ADMIN") {
    return (
      <>
        <AdminHeader />
        {children}
      </>
    );
  }

  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
