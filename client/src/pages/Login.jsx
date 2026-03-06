import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser, loginAdmin } from '../services/api';
import '../styles/theme.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh
    if (!email || !password) {
      alert('Enter email and password');
      return;
    }

    try {
      let response;
      try {
        response = await loginAdmin({ email, password });
      } catch {
        response = await loginUser({ email, password });
      }

      const { token, user } = response.data;
      const actualRole = response.config.url === '/alogin' ? 'admin' : 'user';

      login(user, token, actualRole);
      navigate(actualRole === 'admin' ? '/admin' : '/uhome');
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
          <button className="btn" type="submit">Login</button>
          <button className="btn" type="button" onClick={() => navigate('/register')}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;