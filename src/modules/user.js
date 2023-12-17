import { createContext, useState } from 'react';

const initialState = {
  state: {
    isLogin: false,
    userInfo: {},
  },
  action: { setIsLogin: null, setUserInfo: null },
};

const UserContext = createContext(initialState);

const UserProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const value = {
    state: { isLogin, userInfo },
    action: { setIsLogin, setUserInfo },
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const { Consumer: UserConsumer } = UserContext;

export { UserProvider, UserConsumer };

export default UserContext;
