// "use client";
// import React from "react";
// import Image from "next/image";
// import {
//   FaInstagram,
//   FaEnvelope,
//   FaTelegram,
//   FaFacebook,
//   FaGithub,
//   FaWhatsapp,
// } from "react-icons/fa";

// const contactLinks = [
//   {
//     icon: <FaWhatsapp className="mr-2" />,
//     text: "9840390774",
//     href: "#",
//   },
//   {
//     icon: <FaGithub className="mr-2" />,
//     text: "maharjanm96",
//     href: "#",
//   },
//   {
//     icon: <FaInstagram className="mr-2" />,
//     text: "manee_mrzn",
//     href: "#",
//   },
//   {
//     icon: <FaEnvelope className="mr-2" />,
//     text: "maharjanm96@gmail.com",
//     href: "#",
//   },
//   {
//     icon: <FaTelegram className="mr-2" />,
//     text: "maharjanm96",
//     href: "#",
//   },
//   {
//     icon: <FaFacebook className="mr-2" />,
//     text: "मनिष महर्जन",
//     href: "#",
//   },
// ];

// const Footer = () => {
//   return (
//     <footer className="bg-white p-20 text-center ">
//       <div className="container container-style">
//         <div className="flex items-center ">
//           <div className="m-4">
//             <Image src="/assets/logo.png" alt="Logo" width={30} height={30} />
//           </div>
//           <span className="text-xl font-bold">CustomRom Market</span>
//         </div>
//         <div className="flex flex-wrap justify-end">
//           <div className="column-style">
//             {contactLinks.map((link, index) => (
//               <a
//                 key={index}
//                 href={link.href}
//                 className="link-style flex items-center"
//               >
//                 {link.icon}
//                 {link.text}
//               </a>
//             ))}
//           </div>
//         </div>
//       </div>
//       <div className="mt-8">
//         <span className="text-gray-700">
//           Project maintained by{" "}
//           <a className="text-blue-500 hover:underline cursor-pointer">
//             Manish Maharjan
//           </a>
//         </span>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
