import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function Signup({ showToast }) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const doSignup = async () => {
    if (!name || !email || !password) {
      showToast('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    showToast('Creating account...');
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        }
      }
    });

    setLoading(false);
    if (error) {
      showToast(error.message);
    } else {
      showToast('Account created! Please check your email.');
      setTimeout(() => navigate('/login'), 2000);
    }
  };

  return (
    <div id="v-signup" className="view active">
      <div className="top-bar">
        <button className="back-btn" onClick={() => navigate('/')}>←</button>
      </div>
      <h2 className="screen-title">Create account</h2>
      <p className="screen-sub">Join thousands of great writers & readers</p>

      <div className="input-group">
        <label>Full Name</label>
        <input 
          type="text" 
          placeholder="Divyansh Chaudhary"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
        />
      </div>
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
          placeholder="Min. 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
      </div>
      <button 
        className="btn-primary" 
        style={{ marginTop: '8px' }} 
        onClick={doSignup}
        disabled={loading}
      >
        {loading ? 'Creating...' : 'Create account'}
      </button>

      <p className="switch-auth">Already have an account? <span onClick={() => navigate('/login')}>Log in</span></p>
    </div>
  );
}
