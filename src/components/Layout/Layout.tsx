// Components
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

// Styles
import { LayoutWrapper, Main } from "./Layout.styles";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutWrapper>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </LayoutWrapper>
  );
}

export default Layout;
