import Navbar from "./Navbar";

function Header() {
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark py-3 mybg-dark fixed-top">
        <div className="container">
          <a href="#" className="navbar-brand text-light">
            Drift IAS - Your pathway to success
          </a>
          <Navbar />
        </div>
      </nav>
    </div>
  );
}

export default Header;
