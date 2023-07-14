export const validateLoginForm = ({ mail, password }) => {
  const isMailValid = validateMail(mail);
  const isPasswordValid = validatePassword(password);

  return isMailValid && isPasswordValid;
};

export const validateMail = (mail) => {
  const mailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return mailPattern.test(mail); // true if it passes the pattern
};

export const validatePassword = (password) => {
  return password.length > 5 && password.length < 50;
};

export const validateSignupForm = ({ name, mail, password }) => {
  const isMailValid = validateMail(mail);
  const isPasswordValid = validatePassword(password);

  return isMailValid && isPasswordValid && isNameValid(name);
};

export const isNameValid = (name) => {
  return name.length > 3 && name.length < 50;
};
