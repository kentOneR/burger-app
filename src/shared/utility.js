export const checkValidity = (value, rules) => {
  let isValid = true;

  if (!rules) {
    return true;
  }

  if (rules.required && isValid) {
    isValid = value.trim() !== '';
  }

  if (rules.length && isValid) {
    isValid = value.length === rules.length;
  }

  if (rules.isEmail && isValid) {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    isValid = pattern.test(value);
  }

  return isValid;
}