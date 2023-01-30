import { ReactNode } from "react";

import { _fetch } from "src/helpers/_fetch";
import { useMain } from "src/hooks";

interface PropTypes {
  children: ReactNode;
}

export const MainContainer = ({ children }: PropTypes) => {
  const { user } = useMain();
  return (
    <div>
      <div>Login with {user.nickname}</div>
      {children}
    </div>
  );
};
