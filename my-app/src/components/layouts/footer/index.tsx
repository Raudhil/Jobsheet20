const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <p data-testid="footer-text">&copy; 2026 My App. All rights reserved.</p>
        <div className="footer-links">
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
