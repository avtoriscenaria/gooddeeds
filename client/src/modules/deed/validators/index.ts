interface ISignUpV {
  name?: string;
  text?: string;
}

export const V_deed = ({ name = "", text = "" }: ISignUpV) => {
  const errors: any = {};
  let isError = false;

  if (!name) {
    errors.name = true;
    isError = true;
  }
  if (!text) {
    errors.text = true;
    isError = true;
  }

  return { isValid: !isError, errors };
};
