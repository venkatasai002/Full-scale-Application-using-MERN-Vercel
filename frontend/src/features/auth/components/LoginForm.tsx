import { useState, useEffect } from "react";
import { Input } from "../../../components/UI/Input";
import { Button } from "../../../components/UI/Button";
import ValidationPopover from "../../../components/UI/ValidationPopover";
import { loginApi } from "../api/useAuth";
import { usernameRules, passwordRules } from "../../../utils/RulesValidation";
import { useAuth } from "../../../stores/context/auth.context";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [usernameValidations, setUsernameValidations] = useState<boolean[]>([]);
  const [passwordValidations, setPasswordValidations] = useState<boolean[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      const data = await loginApi(formData);
      login(data.token);

      // decode the token to get role.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const decoded: any = jwtDecode(data.token);
      const role = decoded.role || "user";

      if (role === "admin") {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/home", { replace: true });
      }
      setFormData({ username: "", password: "" });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="w-full sm:w-[28rem] p-6 mx-auto bg-white rounded shadow space-y-4 text-center"
      >
        <h2 className="text-2xl font-bold text-teal-600">Login</h2>
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
            className="w-full pr-10" // give space for icon
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
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            required
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
          {loading ? "Logging in..." : "Login"}
        </Button>
        <div className="flex items-center justify-center gap-1 text-sm mt-4">
          <span>New user?</span>
          <Link to="/register" className="text-blue-600 hover:underline font-medium">
            Register here
          </Link>
        </div>

        <div className="text-sm text-center mt-2">
          <Link to="/forgot-password" className="text-blue-600 hover:underline font-medium">
            Forgot password?
          </Link>
        </div>
      </form>
    </>
  );
};
