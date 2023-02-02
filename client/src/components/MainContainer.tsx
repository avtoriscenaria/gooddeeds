import { ReactNode } from "react";

import { _fetch } from "src/helpers/_fetch";
import { useMain } from "src/hooks";
import { A } from "./A";
import { Button } from "./Button";
import { Loader } from "./Loader";
import { Menu } from "./Menu";

interface PropTypes {
  children: ReactNode;
}

export const MainContainer = ({ children }: PropTypes) => {
  const { router, isLoading } = useMain();

  return isLoading ? (
    <div className="flex w-screen h-screen items-center justify-center text-2xl">
      <Loader />
    </div>
  ) : (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-3 border-b">
        <div>
          {router.asPath !== "/" && (
            <A href="/" className="text-3xl" label="Home" />
          )}
        </div>
        <Menu />
      </div>
      <div className="flex-grow overflow-hidden">{children}</div>
    </div>
  );
};
