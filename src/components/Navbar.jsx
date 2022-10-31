function Navbar() {
  return (
    <div>
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
            <a href="#about" className="nav-link m-auto">
              About Drift IAS
            </a>
          </li>
          <li className="nav-item">
            <a href="#works" className="nav-link m-auto">
              How it works
            </a>
          </li>
          <li className="nav-item">
            <a href="#faq" className="nav-link m-auto">
              FAQs
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link m-auto" href="#previous-papers">
              Previous year papers
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
