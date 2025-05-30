/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Input } from "../../../components/UI/Input";
import { Button } from "../../../components/UI/Button";
import ValidationPopover from "../../../components/UI/ValidationPopover";
import { registerApi } from "../api/useAuth";
import { usernameRules, passwordRules } from "../../../utils/RulesValidation";
import { Link, useNavigate } from "react-router-dom";

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [usernameValidations, setUsernameValidations] = useState<boolean[]>([]);
  const [passwordValidations, setPasswordValidations] = useState<boolean[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (redirecting) {
      timer = setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [navigate, redirecting]);

  useEffect(() => {
    const usernameResults = usernameRules.map((rule) => rule.validate(formData.username));
    const passwordResults = passwordRules.map((rule) => rule.validate(formData.password));
    setUsernameValidations(usernameResults);
    setPasswordValidations(passwordResults);
  }, [formData.username, formData.password]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isUsernameValid = usernameValidations.every(Boolean);
    const isPasswordValid = passwordValidations.every(Boolean);
    if (!isUsernameValid || !isPasswordValid) {
      setError("Please fix validation errors before submitting.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await registerApi(formData);
      alert("Registration successful!");
      setFormData({ username: "", password: "" });
      setRedirecting(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {redirecting ? (
        <p className="text-blue-600 font-medium animate-pulse text-center">Redirecting to login page...</p>
      ) : (
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          className="w-full sm:w-[28rem] p-6 mx-auto bg-white rounded shadow space-y-4 text-center"
        >
          <h2 className="text-2xl font-bold text-teal-600">Register</h2>

          {/* Username Field */}
          <div className="relative">
            <Input
              name="username"
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
              autoComplete="off"
              className="w-full pr-10"
            />
            <div className="absolute right-2 top-2">
              <ValidationPopover
                rules={usernameRules.map((r, i) => ({
                  label: r.label,
                  isValid: usernameValidations[i],
                }))}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="relative mt-4">
            <Input
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
              className="w-full pr-10"
            />
            <div className="absolute right-2 top-2">
              <ValidationPopover
                rules={passwordRules.map((r, i) => ({
                  label: r.label,
                  isValid: passwordValidations[i],
                }))}
              />
            </div>
          </div>

          {error && <p className="text-red-600">{error}</p>}

          <Button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>

          <div className="flex items-center justify-center gap-1 text-sm mt-4">
            <span>Already a user?</span>
            <Link to="/login" className="text-blue-600 hover:underline font-medium">
              Login here
            </Link>
          </div>
        </form>
      )}
    </>
  );
};
