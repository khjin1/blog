import React, { useState } from 'react';
import api from '../api/axios';
import loginBg from '../assets/background.jpg'; 
import profileImg from '../assets/profile.jpg'; // 내 사진 파일

const Mypage = () => {
  // 1. 상태 관리 (초기값은 서버에서 받아온 데이터가 들어가는 게 좋지만, 일단 수동 입력 가능하게 설정)
  const [username, setUsername] = useState('Chilli');
  const [email, setEmail] = useState('chilli@blog.com');
  const [password, setPassword] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // 2. 정보 업데이트 요청 (명세서에 따라 /user 또는 /profile 경로 확인 필요)
      await api.put('/user', { username, email, password });
      alert("정보가 성공적으로 수정되었습니다!");
    } catch (err) {
      alert("수정 실패: 로그인을 다시 시도하거나 입력값을 확인하세요.");
    }
  };

  return (
    <div style={{ backgroundColor: '#f9f9f9', minHeight: '100vh', position: 'relative' }}>
      <div style={{ height: '400px', backgroundImage: `url(${loginBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />

      <div style={{
        maxWidth: '600px', margin: '-150px auto 0', backgroundColor: 'white',
        padding: '60px 40px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        textAlign: 'center', position: 'relative', zIndex: 10
      }}>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '40px' }}>UPDATE ACCOUNT</h2>
        
        <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 40px' }}>
          <img src={profileImg} alt="프로필" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
        </div>

        <form onSubmit={handleUpdate} style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto' }}>
          <div style={{ marginBottom: '25px' }}>
            <label style={{ fontSize: '13px', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: '100%', padding: '12px', border: '1px solid #eee', borderRadius: '8px' }} 
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{ fontSize: '13px', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '12px', border: '1px solid #eee', borderRadius: '8px' }} 
            />
          </div>

          <div style={{ marginBottom: '35px' }}>
            <label style={{ fontSize: '13px', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>New Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="새 비밀번호를 입력하세요" 
              style={{ width: '100%', padding: '12px', border: '1px solid #eee', borderRadius: '8px' }} 
            />
          </div>

          <button type="submit" style={{ 
            width: '100%', padding: '15px', backgroundColor: '#2f80ed', color: 'white', 
            border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer'
          }}>UPDATE</button>
        </form>
      </div>
    </div>
  );
};

export default Mypage;