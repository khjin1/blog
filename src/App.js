import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import Write from './pages/Write';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Mypage from './pages/Mypage';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* 1. 홈 화면: 블로그 목록 */}
        <Route path="/" element={<Home />} />
        
        {/* 2. 상세 페이지: 글 내용 보기 */}
        <Route path="/post/:id" element={<PostDetail />} />
        
        {/* 3. 작성/수정 페이지 */}
        <Route path="/write" element={<Write />} />
        
        {/* 4. 로그인 페이지 */}
        <Route path="/login" element={<Login />} />
        
        {/* 5. 회원가입 페이지 */}
        <Route path="/signup" element={<Signup />} />

        {/* 6. 마이페이지 */}
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
