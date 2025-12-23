import React, { useState, useContext } from "react";
import { AuthContext } from "../App";
import { Navigate } from "react-router-dom";

function Signup() {
  const { user, setUser } = useContext(AuthContext);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://gmz-motors-backend.vercel.app/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  if (user) return <Navigate to="/profile" />;

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Sign Up</h1>
      <form onSubmit={handleSubmit} className="col-md-6 offset-md-3">
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
