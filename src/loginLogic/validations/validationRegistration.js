export const validationRegistration = (value) => {
  console.log('email', value.email);
  console.log('password', isPasswordValid(value.password));
  return isEmailValid(value.email) && isPasswordValid(value.password);
};

export let isEmailValid = (email) => {
  const emailCheckedREGEXP = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
  return emailCheckedREGEXP.test(email);
};

let isPasswordValid = (password) => {
  const passwordCheckedREGEXP =
    /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z])[^\u0400-\u04FF]*$/;
  return passwordCheckedREGEXP.test(password);
};
