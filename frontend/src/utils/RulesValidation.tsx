export const usernameRules = [
  {
    label: "At least 3 characters",
    validate: (val: string) => val.length >= 3,
  },
  {
    label: "Only alphanumeric characters",
    validate: (val: string) => /^[a-zA-Z0-9]+$/.test(val),
  },
];

export const passwordRules = [
  { label: "At least 8 characters", validate: (val: string) => val.length >= 8 },
  { label: "At least one uppercase letter", validate: (val: string) => /[A-Z]/.test(val) },
  { label: "At least one lowercase letter", validate: (val: string) => /[a-z]/.test(val) },
  { label: "At least one number", validate: (val: string) => /[0-9]/.test(val) },
  { label: "At least one special character", validate: (val: string) => /[!@#$%^&*]/.test(val) },
];
