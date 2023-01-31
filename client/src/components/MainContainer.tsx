import { ReactNode } from "react";

import { _fetch } from "src/helpers/_fetch";
import { useMain } from "src/hooks";

interface PropTypes {
  children: ReactNode;
}

export const MainContainer = ({ children }: PropTypes) => {
  const { user } = useMain();
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-end p-3 border-b">
        Login with {user.nickname}
      </div>
      <div className="flex-grow overflow-hidden">{children}</div>
    </div>
  );
};
