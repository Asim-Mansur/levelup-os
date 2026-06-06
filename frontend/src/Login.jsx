import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    console.log("BUTTON CLICKED");
  const formData = new FormData();

  formData.append("username", email);
  formData.append("password", password);

  const response = await fetch(
    "https://levelup-os-production.up.railway.app",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  console.log(data);

  localStorage.setItem(
    "token",
    data.access_token
  );
  window.location.reload();
};
  return (
    <div>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>
  Login
</button>
    </div>
  );
}

export default Login;