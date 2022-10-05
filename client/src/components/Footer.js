const Footer = () => {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <div className="is-flex is-justify-content-center">
          <div>
            <strong>DebonairBnB</strong> by Lucas Duncan
          </div>
          <div>
            <a
              href="https://github.com/lucasdonuts"
              target="_blank"
              className="icon is-size-4 ml-3 mr-2"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href="https://linkedin.com/in/lucaswdunc/"
              target="_blank"
              className="icon is-size-4 mr-3"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
