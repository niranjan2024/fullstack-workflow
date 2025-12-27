function validatePassword(password) {
  const errors = [];
  const suggestions = [];
  let score = 0;

  const commonPasswords = ["password", "123456", "qwerty", "admin", "letmein"];

  // Length check
  if (password.length < 8) {
    errors.push("Too short");
    suggestions.push("Use at least 8 characters");
  } else {
    score += 20;
  }

  // Uppercase
  if (!/[A-Z]/.test(password)) {
    errors.push("Missing uppercase letter");
    suggestions.push("Add an uppercase letter");
  } else {
    score += 15;
  }

  // Lowercase
  if (!/[a-z]/.test(password)) {
    errors.push("Missing lowercase letter");
    suggestions.push("Add a lowercase letter");
  } else {
    score += 15;
  }

  // Number
  if (!/[0-9]/.test(password)) {
    errors.push("Missing number");
    suggestions.push("Add a number");
  } else {
    score += 15;
  }

  // Special character
  if (!/[!@#$%^&*()_+\-=]/.test(password)) {
    errors.push("Missing special character");
    suggestions.push("Add a special character");
  } else {
    score += 20;
  }

  // Common password check
  if (commonPasswords.includes(password.toLowerCase())) {
    errors.push("Common password used");
    suggestions.push("Avoid common passwords");
    score -= 30;
  }

  // Normalize score
  score = Math.max(0, Math.min(100, score));

  return {
    isValid: errors.length === 0,
    score,
    errors,
    suggestions
  };
}

//Output Check
//console.log(validatePassword("abc"));
console.log(validatePassword("MyP@ssw0rd!2024"));