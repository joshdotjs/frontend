import Navbar from './navbar';
import Navbar2 from './navbar-2';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Navbar2 />

      { children }
    </>
  );
};

export default Layout;