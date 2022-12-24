import Navbar from "./Navbar";

const Layout: React.FC<any> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div>{children}</div>
    </>
  );
};

export default Layout;
