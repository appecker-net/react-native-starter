type ValidationResult = {
  valid: boolean;
  message?: string;
};

function validateEmail(mail: string) {
  return /^\w+([\.\-\+]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
}

export const emailValidation = (email: string): ValidationResult => {
  if (email.length === 0) {
    return {valid: false, message: 'Please enter Email.'};
  }
  const valid = validateEmail(email);
  return {valid, message: valid ? undefined : 'Please enter valid Email.'};
};

export const passwordValidation = (password: string): ValidationResult => {
  if (password.length === 0) {
    return {valid: false, message: 'Please enter Password'};
  }
  if (password.length < 6) {
    return {valid: false, message: 'Password should be of 6 characters'};
  }
  return {valid: true};
};

export const confirmPasswordValidation = (
  cPassword: string,
  password: string,
): ValidationResult => {
  const passValidation = passwordValidation(cPassword);
  if (!passValidation.valid) {
    return passValidation;
  }
  if (cPassword.length > 0 && cPassword !== password) {
    return {valid: false, message: "Passwords don't match"};
  }
  return {valid: true};
};
