import { THE_SIMPLEST_EMAIL_REG } from "src/constants";

interface ISignUpV {
  email?: string;
  nickname?: string;
  password?: string;
  repeatPassword?: string;
}

export const V_singUp = ({
  email = "",
  nickname = "",
  password = "",
  repeatPassword = "",
}: ISignUpV) => {
  const errors: any = {};
  let isError = false;

  if (!email || !email.match(THE_SIMPLEST_EMAIL_REG)) {
    errors.email = true;
    isError = true;
  }
  if (!nickname) {
    errors.nickname = true;
    isError = true;
  }
  if (!password || password.length < 5) {
    errors.password = true;
    isError = true;
  }
  if (repeatPassword !== password) {
    errors.repeatPassword = true;
    isError = true;
  }

  return { isValid: !isError, errors };
};
