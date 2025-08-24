export const validateForm = (formData) => {
  const errors = {};
  const {
    name = "",
    email = "",
    password = "",
    password_confirmation = "",
  } = formData;

  if (name.trim().length < 3 || name.trim().length > 20) {
    errors.name = "Name must be between 3 and 20 characters.";
  }

  if (!email.includes("@gmail.com") || email.trim().length < 15) {
    errors.email =
      "Email must be at least 15 characters and include '@gmail.com'.";
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!passwordRegex.test(password)) {
    errors.password =
      "Password must be 8+ characters with uppercase, lowercase, and a number.";
  }

  if (password !== password_confirmation) {
    errors.password_confirmation =
      "Confirmation password does not match the password.";
  }

  return errors;
};
