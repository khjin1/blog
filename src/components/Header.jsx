import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import userProfile from '../assets/profile.jpg'; 
import logoImg from '../assets/logo.jpg'; 

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); 

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert("로그아웃 되었습니다.");
    navigate('/login');
  };

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '10px 50px', 
      backgroundColor: 'white', 
      position: 'sticky', 
      top: 0, 
      zIndex: 100, 
      boxShadow: '0 2px 10px rgba(0,0,0,0.03)' 
    }}>
      {/* 로고 영역 */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <img 
          src={logoImg} 
          alt="My Blog" 
          /* 2. 로고 크기를 height: 28px로 줄였습니다. */
          style={{ height: '28px', width: 'auto', objectFit: 'contain' }} 
          onError={(e) => { 
            e.target.style.display = 'none';
            if (e.target.nextSibling) e.target.nextSibling.style.display = 'block';
          }} 
        />
        <span style={{ display: 'none', fontWeight: 'bold', color: 'black', fontSize: '18px', marginLeft: '10px' }}>My Blog</span>
      </Link>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        {token ? (
          <>
            <img 
              src={userProfile} 
              alt="Profile" 
              onClick={() => navigate('/mypage')}
              style={{ width: '35px', height: '35px', borderRadius: '50%', cursor: 'pointer', objectFit: 'cover', border: '1px solid #eee' }} 
            />
            <button 
              onClick={() => navigate('/write')}
              style={{ 
                backgroundColor: '#fff', border: '1px solid #ddd', padding: '6px 15px', 
                borderRadius: '20px', cursor: 'pointer', fontWeight: '600', fontSize: '13px'
              }}
            >
              Write
            </button>
            <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '13px' }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={() => navigate('/login')} 
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '600', color: '#333' }}
            >
              Login
            </button>
            <button 
              onClick={() => navigate('/signup')} 
              style={{ 
                backgroundColor: '#f1f3f5', color: '#333', border: 'none', padding: '8px 18px', 
                borderRadius: '20px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' 
              }}
            >
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;