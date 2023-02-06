import React from "react";
import { A, Button, Input, Alert } from "src/components";
import { useSignUp } from "src/modules/auth/hooks";

export default function SignUp() {
  const {
    onSignUp,
    emailRef,
    nicknameRef,
    passwordRef,
    repeatPasswordRef,
    message,
    error,
  } = useSignUp();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="border p-8">
        <h1 className="text-2xl font-bold text-center m-2 mb-5">SIGN UP</h1>
        <Input label="Email" inputRef={emailRef} isError={error?.email} />
        <Input
          label="Nickname"
          inputRef={nicknameRef}
          isError={error?.nickname}
        />
        <Input
          className="mb-0"
          label="Password"
          type="password"
          inputRef={passwordRef}
          isError={error?.password}
        />
        <p className="text-xs mb-4">At least 5 characters</p>
        <Input
          label="Repeat password"
          type="password"
          inputRef={repeatPasswordRef}
          isError={error?.repeatPassword}
        />
        <div className="flex items-center justify-center">
          <Button onClick={onSignUp} label="Sign up" />
        </div>
        <div className="flex items-center justify-center mt-4">
          <A href={"/login"} label="Login" />
        </div>
      </div>
      <Alert messageData={message} />
    </div>
  );
}
