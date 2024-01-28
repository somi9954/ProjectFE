import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from './modules/user';
import FrontLayout from './layouts/front/CommonLayout';
import AdminLayout from './layouts/admin/CommonLayout';

/* 클라이언트 페이지 */
import NotFound from './pages/commons/NotFound';
import Main from './pages/front/Main';
import Login from './pages/front/member/Login';
import Join from './pages/front/member/Join';
import Logout from './pages/front/member/Logout';
import MypageLayout from './layouts/front/MypageLayout';
import Mypage from './pages/front/member/Main';
import SaveInfo from './pages/front/member/Saveinfo';
import Withdrawal from './pages/front/member/Withdrawal';
import TodoWrite from './pages/front/member/TodoWrite';

/* 서버 페이지 */
import AdminMain from './pages/admin/Main';
import AdminConfig from './pages/admin/Config';
import MemberList from './pages/admin/MemberList';

const App = () => {
  const {
    action: { updateUserInfo },
  } = useContext(UserContext);

  updateUserInfo();

  return (
    <Routes>
      <Route path="/" element={<FrontLayout />}>
        <Route index element={<Main />} />
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/todo/write" element={<TodoWrite />} />
      </Route>
      <Route path="/mypage" element={<MypageLayout />}>
        <Route index element={<Mypage />} />
        <Route path="member/saveinfo" element={<SaveInfo />} />
        <Route path="member/Withdrawal" element={<Withdrawal />} />
      </Route>

      {/* 관리자 페이지 */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminMain />} />
        <Route path="config" element={<AdminConfig />} />
        <Route path="memberlist" element={<MemberList />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
