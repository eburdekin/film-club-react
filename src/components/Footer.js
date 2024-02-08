const Footer = () => {
  return (
    <footer className="dark:bg-gray-900 p-4 text-black dark:text-white text-sm flex flex-col items-center justify-between">
      {/* <div className="container mx-auto flex items-center justify-between">
       */}
      <div>
        <div className="flex items-center">
          <div className="links">
            <nav className="flex gap-4">
              <a href="/" className="hover:text-gray-400">
                About
              </a>
              <a href="/" className="hover:text-gray-400">
                Contact
              </a>
              <a href="/" className="hover:text-gray-400">
                Terms &amp; Conditions
              </a>
              <a href="/" className="hover:text-gray-400">
                Privacy Policy
              </a>
            </nav>
          </div>
        </div>
        {/* <div className="social">
          <a href="#" className="hover:text-gray-400">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="hover:text-gray-400">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="hover:text-gray-400">
            <i className="fab fa-instagram"></i>
          </a>
        </div> */}
      </div>
      <div className="copyright mt-4 text-black dark:text-white ">
        <p className="text-sm dark:text-white">
          &copy; {new Date().getFullYear().toString()} by
          <a
            href="https://github.com/eburdekin"
            className="text-cyan-600 dark:text-cyan-400"
          >
            {" "}
            @eburdekin
          </a>
          . Film data from{" "}
          <a
            href="https://developer.themoviedb.org/docs/getting-started"
            className="text-cyan-600 dark:text-cyan-400"
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
