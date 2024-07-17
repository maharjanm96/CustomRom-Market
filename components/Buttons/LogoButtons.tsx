// components/ButtonWithLogo.tsx
import { signIn } from "next-auth/react";
import Image from "next/image";

interface ButtonWithLogoProps {
  logoSrc: string;
  altText: string;
  buttonText: string;
  provider: "google" | "github";
}

const LogoButton: React.FC<ButtonWithLogoProps> = ({
  logoSrc,
  altText,
  buttonText,
  provider,
}) => {
  return (
    <div>
      <button
        onClick={() => {
          signIn(provider);
        }}
        className="w-full bg-black text-sm text-white py-2 flex items-center justify-center rounded-lg border border-black"
      >
        <Image
          src={logoSrc}
          alt={altText}
          width={24}
          height={24}
          className="mr-2 rounded-full"
        />
        {buttonText}
      </button>
    </div>
  );
};

export default LogoButton;
