import { useState } from "react";
import { useAuth } from "../context/AuthContext";


const Login = () => {
  const { login } = useAuth();  // login function from context
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async () => {
    await login(form); // delegate logic to AuthContext
  };

  return (
    <div>
      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        value={form.email}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        value={form.password}
      />
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
};

export default Login;
