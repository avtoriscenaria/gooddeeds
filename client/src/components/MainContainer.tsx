import { ReactNode } from "react";

import { _fetch } from "src/helpers/_fetch";
import { useMain } from "src/hooks";
import { A } from "./A";
import { Button } from "./Button";
import { Loader } from "./Loader";

interface PropTypes {
  children: ReactNode;
}

export const MainContainer = ({ children }: PropTypes) => {
  const { user, router, onLogout, isLoading } = useMain();

  return isLoading ? (
    <div className="flex w-screen h-screen items-center justify-center text-2xl">
      <Loader />
    </div>
  ) : (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-3 border-b">
        <div>{router.asPath !== "/" && <A href="/" label="Home" />}</div>
        <div className="flex flex-col items-end">
          <div>
            Login as{" "}
            <span className="text-bold underline text-lg">{user.nickname}</span>
          </div>
          <Button className="p-0 text-xs" label="Log out" onClick={onLogout} />
        </div>
      </div>
      <div className="flex-grow overflow-hidden">{children}</div>
    </div>
  );
};
