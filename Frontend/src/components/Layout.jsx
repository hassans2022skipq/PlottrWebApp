import Header from './Header';
import Footer from './Footer';
const Layout = ({ renderHeaderAndFooter, children }) => (
  <div>
    {renderHeaderAndFooter && (
      <Header />
    )}
    <div className="content">
      {children}
    </div>
    {renderHeaderAndFooter && (
      <Footer />
    )}
  </div>
)

export default Layout;