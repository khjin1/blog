import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import loginBg from '../assets/background.jpg'; 

const Login = () => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (isLoading) return;
    setIsLoading(true);

    try {
      const res = await api.post('/login', { 
        username: email, 
        password: password 
      });
      
      const token = res.data.access_token || res.data.token;
      
      if (token) {
        localStorage.setItem('token', token);
        alert("로그인되었습니다!");
        navigate('/'); 
        window.location.reload(); 
      }
    } catch (err) {
      console.error("로그인 에러 상세:", err.response?.data);
      
      const errorDetail = err.response?.data?.detail || "이메일 또는 비밀번호를 확인하세요.";
      alert(`로그인 실패: ${errorDetail}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#f9f9f9', minHeight: '100vh', paddingBottom: '50px' }}>
      <div style={{ height: '400px', backgroundImage: `url(${loginBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />

      <div style={{
        maxWidth: '450px', margin: '-150px auto 0', backgroundColor: 'white',
        padding: '50px 40px', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        textAlign: 'center', position: 'relative', zIndex: 1
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '30px', letterSpacing: '1px' }}>LOGIN</h2>
        
        <form onSubmit={handleLogin} style={{ textAlign: 'left' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '12px', fontWeight: '600', marginBottom: '8px', display: 'block', color: '#333' }}>Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ex) blog@blog.com" 
              required
              style={{ 
                width: '100%', padding: '12px 15px', border: '1px solid #eee', 
                borderRadius: '8px', boxSizing: 'border-box', backgroundColor: '#f4f4f4',
                outline: 'none', fontSize: '14px'
              }} 
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ fontSize: '12px', fontWeight: '600', marginBottom: '8px', display: 'block', color: '#333' }}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="6+ characters" 
              required
              style={{ 
                width: '100%', padding: '12px 15px', border: '1px solid #eee', 
                borderRadius: '8px', boxSizing: 'border-box', backgroundColor: '#f4f4f4',
                outline: 'none', fontSize: '14px'
              }} 
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            style={{ 
              width: '100%', padding: '15px', 
              backgroundColor: isLoading ? '#ccc' : '#4ba0e9', 
              color: 'white', border: 'none', borderRadius: '8px', 
              fontWeight: 'bold', fontSize: '16px', cursor: isLoading ? 'default' : 'pointer',
              transition: 'background 0.3s'
            }}
          >
            {isLoading ? "Logging in..." : "LOGIN"}
          </button>
        </form>

        <p style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
          Don't have an account? <span onClick={() => navigate('/signup')} style={{ color: '#4ba0e9', cursor: 'pointer', textDecoration: 'underline', fontWeight: '600' }}>Register</span>
        </p>
      </div>
    </div>
  );
};

export default Login;