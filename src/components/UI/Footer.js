import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="dark:bg-black p-2 text-black dark:text-white text-sm flex flex-col items-center justify-between">
      {/* <div className="container mx-auto flex items-center justify-between">
       */}
      <div>
        <div className="flex items-center">
          <div className="links">
            <nav className="flex gap-4">
              <Link to="/" className="hover:text-gray-400">
                About
              </Link>
              <Link to="/" className="hover:text-gray-400">
                Contact
              </Link>
              <Link to="/" className="hover:text-gray-400">
                Terms &amp; Conditions
              </Link>
              <Link to="/" className="hover:text-gray-400">
                Privacy Policy
              </Link>
            </nav>
          </div>
        </div>
        <div className="social">
          <Link to="/home" className="hover:text-gray-400">
            <i className="fab fa-facebook-f"></i>
          </Link>
          <Link to="/home" className="hover:text-gray-400">
            <i className="fab fa-twitter"></i>
          </Link>
          <Link to="/home" className="hover:text-gray-400">
            <i className="fab fa-instagram"></i>
          </Link>
        </div>
      </div>
      <div className="copyright mt-4 text-black dark:text-white ">
        <p className="text-sm dark:text-white">
          &copy; {new Date().getFullYear().toString()} by
          <a
            href="https://github.com/eburdekin"
            className="text-purple-500 dark:text-purple-400"
          >
            {" "}
            @eburdekin
          </a>
          . Film data from{" "}
          <a
            href="https://developer.themoviedb.org/docs/getting-started"
            className="text-purple-500 dark:text-purple-400"
          >
            TMDB
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
