import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import axios from 'axios'; // AI 호출을 위해 추가
import loginBg from '../assets/background.jpg'; 

const Write = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false); // AI 로딩 상태 관리
  const navigate = useNavigate();

  // 날짜 데이터 (디자인 요소)
  const today = new Date();
  const month = today.toLocaleString('en-US', { month: 'short' });
  const date = today.getDate();
  const day = today.toLocaleString('en-US', { weekday: 'long' });

  // ✨ AI 초안 작성 함수 (위니브 프록시 API 사용)
  const handleAiGenerate = async () => {
    if (!title) {
      alert("제목을 먼저 입력해 주세요! 제목을 바탕으로 초안을 작성합니다.");
      return;
    }

    setIsAiLoading(true);
    try {
      const response = await axios.post(
        'https://dev.wenivops.co.kr/services/openai-api', 
        {
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "당신은 전문적인 블로그 작가입니다. 제목에 맞는 흥미로운 블로그 글 초안을 한국어로 작성해 주세요." },
            { role: "user", content: `제목: "${title}"` }
          ]
        }
      );

      // OpenAI 응답 구조에서 텍스트 추출
      const aiText = response.data.choices[0].message.content;
      setContent(aiText); 
      alert("AI가 초안을 작성했습니다!");
    } catch (err) {
      console.error("AI 생성 실패:", err);
      alert("AI 기능을 일시적으로 사용할 수 없습니다. 나중에 다시 시도해 주세요.");
    } finally {
      setIsAiLoading(false);
    }
  };

  // 블로그 게시글 등록 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert("제목과 내용을 모두 채워주세요.");
      return;
    }

    try {
      await api.post('/blog', { title, content });
      alert("글이 성공적으로 등록되었습니다!");
      navigate('/'); 
    } catch (err) {
      console.error(err);
      alert("등록 실패! 로그인을 확인하거나 입력값을 점검하세요.");
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', display: 'flex', backgroundColor: '#f0f2f5',
      backgroundImage: `url(${loginBg})`, backgroundSize: 'cover', backgroundPosition: 'center'
    }}>
      {/* 1. 왼쪽 날짜 섹션 */}
      <div style={{ flex: 1, padding: '80px 50px', color: 'white' }}>
        <h1 style={{ fontSize: '48px', margin: 0 }}>{month}.</h1>
        <h1 style={{ fontSize: '120px', margin: '-10px 0', fontWeight: 'bold' }}>{date}</h1>
        <h2 style={{ fontSize: '36px', opacity: 0.9 }}>{day}</h2>
      </div>

      {/* 2. 오른쪽 작성 카드 섹션 */}
      <div style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '50px' }}>
        <div style={{
          backgroundColor: 'white', width: '100%', maxWidth: '800px', height: '650px',
          borderRadius: '20px', padding: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          position: 'relative', display: 'flex', flexDirection: 'column'
        }}>
          
          {/* 상단 툴바 영역 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <button 
              type="button"
              onClick={() => navigate(-1)} 
              style={{ background: '#f1f3f5', border: 'none', borderRadius: '8px', padding: '10px 15px', cursor: 'pointer' }}
            >
              〈
            </button>

            <div style={{ display: 'flex', gap: '10px' }}>
              {/* ✨ AI 초안 작성 버튼 */}
              <button 
                type="button"
                onClick={handleAiGenerate}
                disabled={isAiLoading}
                style={{ 
                  background: '#eef6ff', border: '1px solid #4ba0e9', borderRadius: '8px', 
                  padding: '10px 20px', cursor: isAiLoading ? 'default' : 'pointer', 
                  fontWeight: 'bold', color: '#4ba0e9', display: 'flex', alignItems: 'center', gap: '8px'
                }}
              >
                {isAiLoading ? "AI Writing..." : "✨ AI Draft"}
              </button>

              <button 
                type="button"
                onClick={() => { setTitle(''); setContent(''); }}
                style={{ background: '#fff1f0', border: 'none', borderRadius: '8px', padding: '10px', cursor: 'pointer' }}
              >
                🗑
              </button>

              <button 
                type="button"
                onClick={handleSubmit}
                style={{ 
                  background: '#4ba0e9', border: 'none', borderRadius: '8px', color: 'white',
                  padding: '10px 25px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px'
                }}
              >
                💾 Save
              </button>
            </div>
          </div>

          {/* 제목 입력란 */}
          <input 
            type="text" 
            placeholder="Enter your title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ 
              fontSize: '32px', fontWeight: 'bold', border: 'none', outline: 'none',
              marginBottom: '20px', width: '100%', borderBottom: '20px solid transparent', paddingBottom: '10px'
            }} 
          />
          <div style={{ width: '100%', height: '1px', backgroundColor: '#f1f3f5', marginBottom: '30px' }} />

          {/* 본문 입력란 */}
          <textarea 
            placeholder="Tell your story..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ 
              fontSize: '18px', border: 'none', outline: 'none', width: '100%', flex: 1, 
              resize: 'none', lineHeight: '1.7', color: '#444'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Write;