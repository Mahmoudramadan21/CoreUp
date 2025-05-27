import { useState, useEffect } from "react";

const usePasswordStrength = (password) => {
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    let strength = 0;
    if (password.length > 0) strength += 25;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password) || /[!@#$%^&*]/.test(password)) strength += 25;
    setStrength(strength);
  }, [password]);

  return strength;
};

export default usePasswordStrength;
