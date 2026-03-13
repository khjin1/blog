import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

// 이미지 파일들 불러오기
import postImg1 from '../assets/post-img1.jpg';
import postImg2 from '../assets/post-img2.jpg';
import postImg3 from '../assets/post-img3.jpg';
import postImg4 from '../assets/post-img4.jpg';
import postImg5 from '../assets/post-img5.jpg';
import postImg6 from '../assets/post-img6.jpg';
import userProfile from '../assets/profile.jpg';
import postBg from '../assets/background.jpg';

// SNS 아이콘 이미지
import facebookIcon from '../assets/Facebook.jpg';
import twitterIcon from '../assets/Twitter.jpg';
import instagramIcon from '../assets/Instagram.jpg';
import githubIcon from '../assets/Github.jpg';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const thumbnailList = [postImg1, postImg2, postImg3, postImg4, postImg5, postImg6];

  useEffect(() => {
    api.get('/blog')
      .then(res => setPosts(res.data))
      .catch(err => console.error("데이터 로딩 실패:", err));
  }, []);

  return (
    <div style={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      
      {/* 1. 상단 배너 영역 */}
      <div style={{ 
        height: '450px', 
        backgroundImage: `url(${postBg})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div style={{
          backgroundColor: 'rgba(55, 71, 79, 0.75)', 
          color: 'white',
          padding: '60px 50px',
          width: '450px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          boxSizing: 'border-box'
        }}>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.4)', borderBottom: '1px solid rgba(255,255,255,0.4)', width: 'fit-content', padding: '5px 0', marginBottom: '15px' }}>
            <p style={{ fontSize: '16px', letterSpacing: '4px', margin: 0, fontWeight: '300' }}>React & Node</p>
          </div>
          <h1 style={{ fontSize: '64px', fontWeight: 'bold', margin: '10px 0', letterSpacing: '1px' }}>My BLOG</h1>
          <p style={{ fontSize: '13px', lineHeight: '1.8', color: '#e0e0e0', marginTop: '20px', fontWeight: '300' }}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste error quibusdam ipsa quis quidem doloribus eos, dolore ea iusto impedit!
          </p>
        </div>
      </div>

      {/* 2. 메인 컨텐츠 영역 */}
      <div style={{ maxWidth: '1200px', margin: '-60px auto 0', display: 'flex', gap: '40px', padding: '0 20px', position: 'relative', zIndex: 2 }}>
        
        {/* 왼쪽 사이드바 */}
        <aside style={{ 
          width: '300px', 
          backgroundColor: 'white', 
          padding: '40px 25px', 
          borderRadius: '15px', 
          height: 'fit-content', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
          textAlign: 'center' 
        }}>
          {/* ABOUT ME */}
          <h4 style={{ fontSize: '14px', fontWeight: 'bold', borderBottom: '2px solid #333', display: 'inline-block', paddingBottom: '3px', marginBottom: '25px', letterSpacing: '1px' }}>ABOUT ME</h4>
          <div style={{ marginBottom: '15px' }}>
            <img src={userProfile} alt="사용자 프로필" style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover' }} />
          </div>
          <h3 style={{ fontWeight: 'bold', color: '#4ba0e9', marginBottom: '10px', fontSize: '18px' }}>Chilli</h3>
          <p style={{ fontSize: '13px', color: '#555', lineHeight: '1.6', marginBottom: '40px' }}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </p>

          {/* CATEGORIES */}
          <h4 style={{ fontSize: '14px', fontWeight: 'bold', borderBottom: '2px solid #333', display: 'inline-block', paddingBottom: '3px', marginBottom: '20px', letterSpacing: '1px' }}>CATEGORIES</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginBottom: '40px' }}>
            {['Life', 'Style', 'Tech', 'Music', 'Sport', 'Photo', 'Develop'].map(tag => (
              <span key={tag} style={{ backgroundColor: '#f4f4f4', padding: '6px 14px', borderRadius: '20px', fontSize: '11px', color: '#666', cursor: 'pointer' }}>
                {tag}
              </span>
            ))}
          </div>

          {/* FOLLOW (이미지 적용 부분) */}
          <h4 style={{ fontSize: '14px', fontWeight: 'bold', borderBottom: '2px solid #333', display: 'inline-block', paddingBottom: '3px', marginBottom: '25px', letterSpacing: '1px' }}>FOLLOW</h4>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
            <img src={facebookIcon} alt="facebook" style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
            <img src={twitterIcon} alt="twitter" style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
            <img src={instagramIcon} alt="instagram" style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
            <img src={githubIcon} alt="github" style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
          </div>
        </aside>

        {/* 오른쪽 게시글 그리드 */}
        <section style={{ 
          flex: 1, 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '30px', 
          paddingBottom: '80px', 
          marginTop: '60px' 
        }}>
          {posts.map((post, index) => (
            <div 
              key={post.id} 
              onClick={() => navigate(`/post/${post.id}`)}
              style={{ 
                backgroundColor: 'white', 
                borderRadius: '15px', 
                overflow: 'hidden', 
                cursor: 'pointer', 
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <img 
                src={thumbnailList[index % thumbnailList.length]} 
                alt={`게시글 썸네일 ${index + 1}`} 
                style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
              />
              <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                  <span style={{ color: '#4ba0e9', fontSize: '11px', fontWeight: 'bold' }}>Life</span>
                  <span style={{ color: '#4ba0e9', fontSize: '11px', fontWeight: 'bold' }}>Style</span>
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 'bold', lineHeight: '1.4', marginBottom: '15px' }}>{post.title}</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderTop: '1px solid #f0f0f0', paddingTop: '15px' }}>
                  <img src={userProfile} alt="작성자" style={{ width: '22px', height: '22px', borderRadius: '50%' }} />
                  <span style={{ fontSize: '12px', color: '#888' }}>Chilli | 2022.04.24</span>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Home;