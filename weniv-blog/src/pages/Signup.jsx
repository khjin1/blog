import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import loginBg from '../assets/background.jpg'; 

const Signup = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    
    const signupData = {
      username: username,
      email: email,
      password: password
    };

    try {
      await api.post('/signup', signupData);
      
      alert("회원가입이 완료되었습니다! 로그인해주세요.");
      navigate('/login');
    } catch (err) {
      console.error("에러 상세:", err.response?.data);
      // 이미 존재하는 계정일 경우 서버에서 에러를 보냅니다.
      alert("회원가입 실패: 이미 존재하는 계정이거나 형식이 잘못되었습니다.");
    }
  };

  return (
    <div style={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <div style={{ 
        height: '350px', backgroundImage: `url(${loginBg})`, 
        backgroundSize: 'cover', backgroundPosition: 'center' 
      }} />

      <div style={{
        maxWidth: '450px', margin: '-120px auto 50px', backgroundColor: 'white',
        padding: '50px 40px', borderRadius: '10px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        textAlign: 'center', position: 'relative', zIndex: 1
      }}>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '30px' }}>REGISTER</h2>
        
        <form onSubmit={handleSignup} style={{ textAlign: 'left' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '13px', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ width: '100%', padding: '12px', backgroundColor: '#f4f4f4', border: 'none', borderRadius: '8px' }} 
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '13px', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="blog@blog.com" 
              required
              style={{ width: '100%', padding: '12px', backgroundColor: '#f4f4f4', border: 'none', borderRadius: '8px' }} 
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ fontSize: '13px', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="6+ characters" 
              required
              style={{ width: '100%', padding: '12px', backgroundColor: '#f4f4f4', border: 'none', borderRadius: '8px' }} 
            />
          </div>

          <button type="submit" style={{ 
            width: '100%', padding: '15px', backgroundColor: '#4ba0e9', color: 'white', 
            border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer'
          }}>REGISTER</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;