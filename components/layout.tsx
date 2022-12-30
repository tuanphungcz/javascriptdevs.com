import Navbar from "./Navbar";

const Layout: React.FC<any> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="mt-32">{children}</div>
    </>
  );
};

export default Layout;
