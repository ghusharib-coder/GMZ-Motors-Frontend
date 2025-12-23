import React, { useState, useContext } from 'react';
import { AuthContext } from '../App';
import { Navigate } from 'react-router-dom';

function Login() {
  const { user, setUser } = useContext(AuthContext);
  const [form, setForm] = useState({ name: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://gmz-motors-backend.vercel.app/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong!');
    }
  };

  if (user) return <Navigate to="/profile" />;

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="col-md-6 offset-md-3">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="form-input mb-3"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="form-input mb-3"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
