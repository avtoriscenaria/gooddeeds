import { useMenu } from "src/hooks/useMenu";
import { Button } from "./Button";
import { Dialog } from "./Dialog";

interface PropTypes {}

export const Menu = ({}: PropTypes) => {
  const {
    user,
    onLogout,
    isOpen,
    setIsOpen,
    menuRef,
    dialogClass,
    onChangeNickname,
    onDeleteAccount,
    isLoading,
  } = useMenu();

  return (
    <div className="relative flex flex-col items-end" ref={menuRef}>
      <div
        className="cursor-pointer hover:opacity-60"
        onClick={() => setIsOpen(!isOpen)}
      >
        Login as{" "}
        <span className="text-bold underline text-lg">{user?.nickname}</span>
      </div>
      {isOpen && (
        <div className="absolute top-6 right-0 flex flex-col items-start w-max bg-white border p-2">
          <button
            className="py-2 hover:text-cyan-500"
            onClick={onChangeNickname}
          >
            Change nickname
          </button>
          <button
            className="py-2 text-red-600 hover:text-red-300 cursor-pointer"
            onClick={onDeleteAccount}
          >
            Delete account
          </button>
          <Button
            className="p-0 my-2 text-xs"
            label="Log out"
            onClick={onLogout}
          />
        </div>
      )}
      {Boolean(dialogClass) && (
        <Dialog {...dialogClass} isLoading={isLoading} />
      )}
    </div>
  );
};
