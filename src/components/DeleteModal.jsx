import React from 'react';

const DeleteModal = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null; // 열려있지 않으면 아무것도 렌더링 안함

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white', padding: '40px', borderRadius: '20px',
        textAlign: 'center', width: '350px', boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px' }}>Delete story</h2>
        <p style={{ color: '#888', marginBottom: '30px', fontSize: '15px', lineHeight: '1.5' }}>
          Are you sure you want to delete this story?
        </p>
        
        <div style={{ display: 'flex', gap: '15px' }}>
          <button 
            onClick={onClose}
            style={{ 
              flex: 1, padding: '15px', border: 'none', borderRadius: '12px',
              backgroundColor: '#f8f9fa', cursor: 'pointer', fontWeight: 'bold'
            }}
          >
            Cancel
          </button>
          <button 
            onClick={onDelete}
            style={{ 
              flex: 1, padding: '15px', border: 'none', borderRadius: '12px',
              backgroundColor: '#e9967a', color: 'white', cursor: 'pointer', fontWeight: 'bold',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px'
            }}
          >
            🗑 Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;