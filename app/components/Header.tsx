import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { nextAuthOptions } from "../lib/next-auth/options";
import { User } from "../types/types";

const Header = async () => {
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user as User;
  // const { data: session } = useSession();
  // const user = session?.user;
  return (
    <header className="bg-slate-600 text-gray-100 shadow-lg">
      <nav className="flex items-center justify-between p-4">
        <Link href={"/"} className="text-xl font-bold">
          Book Commerce
        </Link>
        <div className="flex items-center gap-1">
          <Link
            href={user ? "/profile" : "/api/auth/signin"}
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            {user ? "プロフィール" : "ログイン"}
          </Link>
          {user ? (
            <div className="flex items-center">
              <Link
                href={"/api/auth/signout"}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                ログアウト
              </Link>
              <Link href={"/profile"}>
                <Image
                  width={50}
                  height={50}
                  alt="profile_icon"
                  src={user?.image || "/default_icon.png"}
                />
              </Link>
            </div>
          ) : (
            ""
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
