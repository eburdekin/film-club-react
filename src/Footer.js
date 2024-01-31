const Footer = () => {
  return (
    <footer>
      <p className="text-sm">
        &copy; {new Date().getFullYear().toString()} by{" "}
        <a href="https://github.com/eburdekin" className="hover:text-cyan-500">
          @eburdekin
        </a>
      </p>
    </footer>
  );
};

export default Footer;
