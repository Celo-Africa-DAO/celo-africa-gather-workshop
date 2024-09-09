import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className="p-5 bg-white space-y-5">
      <div className="flex justify-around">
        <Link href={"#"} className="text-[#9EA6B8] hover:opacity-60">
          {" "}
          Contact Us
        </Link>
        <Link href={"#"} className="text-[#9EA6B8] hover:opacity-60">
          {" "}
          FAQ
        </Link>
        <Link href={"#"} className="text-[#9EA6B8] hover:opacity-60">
          {" "}
          About Us
        </Link>
      </div>
      <div className="flex justify-center">
        <div className="flex gap-4">
          <a href="http://" target="_blank" rel="noopener noreferrer">
            {" "}
            <Facebook className="text-[#9EA6B8] hover:opacity-60" />
          </a>
          <a href="http://" target="_blank" rel="noopener noreferrer">
            {" "}
            <Twitter className="text-[#9EA6B8] hover:opacity-60" />
          </a>
          <a href="http://" target="_blank" rel="noopener noreferrer">
            {" "}
            <Instagram className="text-[#9EA6B8] hover:opacity-60" />
          </a>
        </div>
      </div>
      <div >
        <p className="text-[#9EA6B8] text-center">&copy; 2022 NFT Auction House. All rights reserved.</p>
      </div>
      <div></div>
    </div>
  );
}
