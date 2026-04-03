import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function Login({ showToast }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const doLogin = async () => {
    if (!email || !password) {
      showToast('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    showToast('Logging in...');
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);
    if (error) {
      showToast(error.message);
    } else {
      showToast('Login successful!');
      navigate('/home');
    }
  };

  return (
    <div id="v-login" className="view active">
      <div className="top-bar">
        <button className="back-btn" onClick={() => navigate('/')}>←</button>
      </div>
      <h2 className="screen-title">Welcome back</h2>
      <p className="screen-sub">Log in to your Inkwell account</p>

      <div className="input-group">
        <label>Email</label>
        <input 
          type="email" 
          placeholder="you@example.com" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
      </div>
      <div className="input-group">
        <label>Password</label>
        <input 
          type="password" 
          placeholder="••••••••" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
      </div>
      <button 
        className="btn-primary" 
        style={{ marginTop: '8px' }} 
        onClick={doLogin}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Continue'}
      </button>

      <p className="switch-auth">Don't have an account? <span onClick={() => navigate('/signup')}>Sign up</span></p>
    </div>
  );
}
