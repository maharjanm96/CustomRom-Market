import { signIn } from "next-auth/react";
import { FC } from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";

interface ButtonWithLogoProps {
  buttonText: string;
  provider: "google" | "github";
}

const SocialButton: FC<ButtonWithLogoProps> = ({ buttonText, provider }) => {
  const renderLogo = () => {
    switch (provider) {
      case "google":
        return <FaGoogle className="text-xl mr-2" />;
      case "github":
        return <FaGithub className="text-xl mr-2" />;
      default:
        return null;
    }
  };

  return (
    <div>
      <button
        onClick={() => signIn(provider)}
        className="bg-primary text-primary-foreground hover:bg-primary/90 w-full flex p-2.5 items-start justify-center rounded-md text-sm"
      >
        {renderLogo()}
        {buttonText}
      </button>
    </div>
  );
};

export default SocialButton;
