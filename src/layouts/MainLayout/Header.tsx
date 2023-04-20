import { useContext } from "react";
import { IoReorderThreeOutline } from "react-icons/io5";
import { BsBell } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { signIn, signOut, useSession } from "next-auth/react";
import { HiLogout } from "react-icons/hi";
// import ResuableDialog from "~/components/common/ConfirmationModal";
import { GlobalContext } from "~/contexts/GlobalContextProvider";

const Header = () => {
  const { status } = useSession();

  const { setIsWriteModalOpen } = useContext(GlobalContext);

  return (
    <header className="border-gray-380 flex h-16 w-full flex-row items-center justify-around border-b bg-white py-8">
      <div>
        <IoReorderThreeOutline className="text-3xl text-gray-600" />
      </div>
      <div className="text-xl font-extrabold">Sk Curvada</div>
      {status === "authenticated" ? (
        <div className="flex items-center space-x-4">
          <div>
            <BsBell className="text-xl text-gray-600" />
          </div>
          <div>
            <div className="h-6 w-6 rounded-full bg-gray-600">
              {/* <img src={sessionData?.user?.image!} /> */}
            </div>
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
            onClick={
              // confirmation
              // () => setIsOpen(true)
              () => signOut()
            }
            className="flex items-center space-x-3 rounded border border-gray-200 px-4 py-1 transition hover:border-gray-900 hover:text-gray-900"
          >
            <div className="text-sm">Logout</div>
            <HiLogout />
          </button>
        </div>
      ) : (
        <button
          onClick={() => signIn()}
          className="flex items-center space-x-3 rounded border border-gray-200 px-4 py-1 transition hover:border-gray-900 hover:text-gray-900"
        >
          Signin
        </button>
      )}
    </header>
  );
};

export default Header;
