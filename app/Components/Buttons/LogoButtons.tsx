// components/ButtonWithLogo.tsx
import Image from "next/image";

interface ButtonWithLogo {
  logoSrc: string;
  altText: string;
  buttonText: string;
}

const LogoButton: React.FC<ButtonWithLogo> = ({
  logoSrc,
  altText,
  buttonText,
}) => {
  return (
    <div>
      <button
        type="submit"
        className="w-full bg-black text-white py-2 flex items-center justify-center rounded-lg border-2 border-black"
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
