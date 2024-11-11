// Components
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
