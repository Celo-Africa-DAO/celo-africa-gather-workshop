import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Search, ShoppingBag, UserRound } from "lucide-react";
import { Button } from "../button";

export default function Header() {
  return (
    <header className="sticky bg-black top-0 z-30">
      <div className="p-3 flex justify-between">
        <Link href={"/"}>
          <Image
            src={"logo/cag-logo.svg"}
            width={181}
            height={23}
            alt="cag logo"
          />
        </Link> 

        <nav className="flex gap-3 items-center">
          <Link href={"#"} className="hover:opacity-75">Categories</Link>
          <Link href={"#"} className="p-2 bg-[#292E38] hover:opacity-70  rounded-xl ml-8">
            <Search />
          </Link>
              <Link href={"#"} className="p-2 bg-[#292E38] hover:opacity-70  rounded-xl">
            <UserRound />
          </Link>
              <Link href={"#"} className="p-2 bg-[#292E38] hover:opacity-70  rounded-xl">
            <ShoppingBag />
          </Link>

        <Button  className="bg-blue-600 p-4  hover:bg-blue-500 rounded-xl hover:opacity-75">Connect Wallet</Button>
        </nav>
      </div>
      <hr />
    </header>
  );
}
