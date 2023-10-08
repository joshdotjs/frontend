import { useState, createContext, useEffect } from 'react';
// import { useRouter } from 'next/router';

// utils:
import { getLS, setLS, removeLS } from '../util/local-storage';

// hooks:
import { useNavigate } from 'react-router-dom';

// ==============================================

const AuthContext = createContext({
  user: {},
  setUser: () => {},
  token: '',
  setToken: () => {},
  logged_in: false,
  logOut: () => {},
  logIn: () => {},
});

// ==============================================

function AuthContextProvider ({ children }) {

  // --------------------------------------------

  // const router = useRouter();
  const navigate = useNavigate();

  // --------------------------------------------

  const [user, setUser]          = useState({});
  const [token, setToken]        = useState('');
  const [logged_in, setLoggedIn] = useState(false);
  const [is_admin, setIsAdmin]   = useState(false);
  
  // --------------------------------------------

  // -Load data from LS on page load
  // useEffect(() => {
  //   const logged_in = getLS('logged_in');
  //   if (logged_in) {
  //     setLoggedIn(logged_in);
  //     setToken(getLS('token'));
  //     setUser(getLS('user'));
  //   }

  // }, []);

  // --------------------------------------------

  const logIn = ({token, user}) => {

    console.log('logging user in (auth-ctx)');
    // console.log('user: ', user);
    // console.log('token: ', token);

    setToken(token);
    setLS('token', token);

    setUser(user);
    setLS('user', {...user, is_admin: !!user?.is_admin}); // mysql 1 => true

    setLoggedIn(true);
    setLS('logged_in', true);

    
    if (user?.is_admin) {
      setIsAdmin(true);
      setLS('is_admin', true);
      navigate('/admin/orders')
    }
    // else
    //   router.push('/user');
  };

  // --------------------------------------------
  
  const logOut = () => {
    setToken(null);
    removeLS('token');

    setUser(user);
    removeLS('user');

    setLoggedIn(false);
    removeLS('logged_in');

    setIsAdmin(false);
    removeLS('is_admin');

    // router.replace('/');
  };
  
  // --------------------------------------------
  
  const context = {
    user,
    token,
    is_admin,
    logged_in,
    logIn,
    logOut,
  };
  
  // --------------------------------------------
  
  return (
    <AuthContext.Provider value={context}>{ children }</AuthContext.Provider>
  );
  
  // --------------------------------------------

}

// ==============================================

export { AuthContext };
export default AuthContextProvider;