import { useContext } from "react";
import { IoReorderThreeOutline } from "react-icons/io5";
import { BsBell } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { signIn, signOut, useSession } from "next-auth/react";
import { HiLogout } from "react-icons/hi";

import { GlobalContext } from "~/contexts/GlobalContextProvider";
import Image from "next/image";
// import ResuableDialog from "~/components/common/ConfirmationModal";
import Link from "next/link";

const Header = () => {
  const { status } = useSession();

  const { setIsWriteModalOpen, isWriteModalOpen } = useContext(GlobalContext);
  return (
    <header className="border-gray-380 flex h-16 w-full flex-row items-center justify-around border-b bg-white py-8">
      <div>
        <IoReorderThreeOutline className="text-3xl text-gray-600" />
      </div>
      <Link className="flex" href={"/"}>
        <Image
          src={"/images/logo3.png"}
          alt={"Logo"}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "auto", height: "40px" }}
        />
      </Link>
      {status === "authenticated" ? (
        <div className="flex items-center space-x-4">
          <div>
            <BsBell className="text-xl text-gray-600" />
          </div>
          <div>
            <div className="h-6 w-6 rounded-full bg-gray-600"></div>
          </div>
          <div>
            <button
              onClick={() => setIsWriteModalOpen(true)}
              className="flex items-center space-x-3 rounded border border-gray-200 px-4 py-1 transition hover:border-gray-900 hover:text-gray-900"
            >
              <div className="relative flex text-sm">Write</div>
              <div>
                <FiEdit />
              </div>
            </button>
          </div>

          <button
            onClick={() => void signOut()}
            className="flex items-center space-x-3 rounded border border-gray-200 px-4 py-1 transition hover:border-gray-900 hover:text-gray-900"
          >
            <div className="text-sm">Logout</div>
            <HiLogout />
          </button>
        </div>
      ) : (
        <button
          onClick={() => void signIn()}
          className="flex items-center space-x-3 rounded border border-gray-200 px-4 py-1 transition hover:border-gray-900 hover:text-gray-900"
        >
          Signin
        </button>
      )}
    </header>
  );
};

export default Header;
