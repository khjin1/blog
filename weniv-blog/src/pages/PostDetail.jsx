import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import DeleteModal from '../components/DeleteModal'; // 공통 컴포넌트 사용

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리

  useEffect(() => {
    api.get(`/blog/${id}`)
      .then(res => setPost(res.data))
      .catch(err => console.error("데이터 로딩 실패", err));
  }, [id]);

  // 삭제 실행 함수
  const handleDelete = async () => {
    try {
      await api.delete(`/blog/${id}`);
      alert("글이 삭제되었습니다.");
      setIsModalOpen(false);
      navigate('/'); 
    } catch (err) {
      alert("삭제 실패! 작성자 본인인지 확인하세요.");
      setIsModalOpen(false);
    }
  };

  if (!post) return <div style={{ padding: '50px', textAlign: 'center' }}>로딩 중...</div>;

  return (
    <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', position: 'relative' }}>
      
      {/* 1. 왼쪽 상단 날짜 영역 및 전체 배경 */}
      <div style={{ 
        height: '450px', 
        backgroundImage: `url(${post.thumbnail || 'https://picsum.photos/id/20/1200/600'})`, 
        backgroundSize: 'cover', backgroundPosition: 'center',
        display: 'flex', alignItems: 'flex-start', padding: '80px 10%'
      }}>
        <div style={{ color: 'white', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
          <p style={{ fontSize: '32px', margin: 0, fontWeight: 'bold' }}>Apr.</p>
          <h1 style={{ fontSize: '100px', margin: '-10px 0', fontWeight: 'bold' }}>24</h1>
          <p style={{ fontSize: '40px', margin: 0 }}>Sunday</p>
        </div>
      </div>

      {/* 2. 본문 카드 */}
      <div style={{ 
        maxWidth: '850px', margin: '-120px auto 100px', backgroundColor: 'white', 
        borderRadius: '20px', padding: '60px 80px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
        position: 'relative', zIndex: 10
      }}>
        
        {/* 상단 헤더: 작성자 정보 및 편집/삭제 버튼 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <img src="https://picsum.photos/45/45?random=1" alt="프로필" style={{ borderRadius: '50%', objectFit: 'cover' }} />
            <div>
              <span style={{ fontWeight: 'bold', fontSize: '15px', color: '#333' }}>{post.author || 'Chilli'}</span>
              <span style={{ color: '#bbb', fontSize: '14px', marginLeft: '10px' }}>| 2022.04.24</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={{ background: '#f8f9fa', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}>✏️</button>
            {/* 삭제 버튼 클릭 시 모달 오픈 */}
            <button 
              onClick={() => setIsModalOpen(true)}
              style={{ background: '#fff1f0', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}
            >
              🗑️
            </button>
          </div>
        </div>

        {/* 태그 영역 */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '25px' }}>
          {['Life', 'Style'].map(tag => (
            <span key={tag} style={{ backgroundColor: '#eef6ff', color: '#4ba0e9', padding: '5px 15px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>
              {tag}
            </span>
          ))}
        </div>

        {/* 제목 */}
        <h2 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '40px', color: '#222', lineHeight: '1.2' }}>
          {post.title}
        </h2>
        
        {/* 본문 내용 및 이미지 */}
        <div style={{ lineHeight: '1.9', color: '#4a4a4a', fontSize: '17px' }}>
          <p style={{ marginBottom: '40px' }}>{post.content}</p>
          
          <img 
            src={post.thumbnail || 'https://picsum.photos/id/21/800/500'} 
            alt="본문 이미지" 
            style={{ width: '100%', borderRadius: '15px', marginBottom: '40px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }} 
          />
          
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iste error quibusdam ipsa quis quidem doloribus eos, dolore ea iusto impedit! Voluptatum necessitatibus eum beatae, adipisci voluptas a odit modi eos!</p>
        </div>
      </div>

      {/* 3. 사이드 뒤로가기 버튼 */}
      <button 
        onClick={() => navigate(-1)} 
        style={{ 
          position: 'fixed', left: '40px', top: '250px', backgroundColor: 'white', border: 'none', 
          borderRadius: '12px', width: '50px', height: '60px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          cursor: 'pointer', fontSize: '20px', color: '#4ba0e9'
        }}
      >
        〈
      </button>

      {/* 4. 삭제 확인 모달 연결 */}
      <DeleteModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onDelete={handleDelete} 
      />
    </div>
  );
};

export default PostDetail;