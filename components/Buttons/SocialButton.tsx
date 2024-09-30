import { signIn } from "next-auth/react";
import { FC } from "react";
import { Button } from "@/components/ui/button"; 
import { Icons } from "@/components/ui/icons"; 

interface ButtonWithLogoProps {
  buttonText: string;
  provider: "google" | "github";
}

const SocialButton: FC<ButtonWithLogoProps> = ({ buttonText, provider }) => {
  const renderLogo = () => {
    switch (provider) {
      case "google":
        return <Icons.google className="mr-2 h-4 w-4" />;
      case "github":
        return <Icons.gitHub className="mr-2 h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Button
        variant="outline"
        onClick={() => signIn(provider)}
        className="w-full flex p-2.5 items-start justify-center text-sm"
      >
        {renderLogo()}
        {buttonText}
      </Button>
    </div>
  );
};

export default SocialButton;
