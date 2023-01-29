import React from "react";
import { Button, Input, A } from "src/components";
import { useLogin } from "src/modules/auth/hooks";

export default function Login() {
  const { onLogin, emailRef, passwordRef, isError } = useLogin();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="border p-8">
        <h1 className="text-2xl font-bold text-center m-2 mb-5">LOGIN</h1>
        <Input label="Email" inputRef={emailRef} isError={isError} />
        <Input
          label="Password"
          type="password"
          inputRef={passwordRef}
          isError={isError}
        />
        <div className="flex items-center justify-center">
          <Button onClick={onLogin} label="Login" />
        </div>
        <div className="flex items-center justify-center mt-4">
          <A href={"/sign-up"} label="Make account" />
        </div>
      </div>
    </div>
  );
}
