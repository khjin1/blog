import React from 'react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      backgroundColor: '#fff',
      borderTop: '1px solid #eee',
      padding: '25px 0',
      textAlign: 'center',
      width: '100%',
      zIndex: 10
    }}>
      <span style={{ color: '#888', fontSize: '14px' }}>©Wenaiv Corp.</span>

      {/* TOP 버튼: 이제 화면 전체를 기준으로 고정됩니다 */}
      <button 
        onClick={scrollToTop}
        style={{
          /* 🔥 핵심 수정: absolute를 fixed로 변경 */
          position: 'fixed', 
          right: '30px',      // 오른쪽 벽에서 30px
          bottom: '30px',     // 화면 맨 아래에서 30px (푸터 위가 아니라 브라우저 하단 기준)
          
          width: '55px',
          height: '55px',
          backgroundColor: '#63ace5',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          zIndex: 9999,       // 최상단 레이어로 설정하여 모든 콘텐츠 위에 보이게 함
          transition: 'transform 0.2s ease' // 마우스 올렸을 때 효과를 위해 추가
        }}
        // 마우스 올렸을 때 살짝 커지는 효과 (선택사항)
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
        <span style={{ fontSize: '11px', fontWeight: 'bold', marginTop: '2px' }}>TOP</span>
      </button>
    </footer>
  );
};

export default Footer;