function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-md bg-dark navbar-dark py-3 fixed-top">
        <div className="container">
          <a href="#" className="navbar-brand">
            My Portfolio
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navmenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="navbar-collapse collapse text-center" id="navmenu">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a href="#qualifications" className="nav-link m-auto">
                  My Qualifications
                </a>
              </li>
              <li className="nav-item">
                <a href="#skills" className="nav-link m-auto"></a>
                My skills
              </li>
              <li className="nav-item">
                <a href="#projects" className="nav-link m-auto">
                  My Projects
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link m-auto" href="#contact-info">
                  Contact Info
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
