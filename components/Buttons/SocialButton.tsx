// components/ButtonWithLogo.tsx
import { signIn } from "next-auth/react";
import { FC } from "react";
import { FaGoogle, FaGithub } from "react-icons/fa"; // Importing icons from react-icons

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
        className="w-full bg-black text-sm text-white py-2 flex items-center justify-center rounded-lg border border-black hover:bg-gray-800"
      >
        {renderLogo()}
        {buttonText}
      </button>
    </div>
  );
};

export default SocialButton;
