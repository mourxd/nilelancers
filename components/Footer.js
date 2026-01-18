// components/Footer.js
function Footer({ t }) {
  return (
    <footer>
        <div className="container footer-grid">
            <div className="footer-col">
                <div className="footer-logo">NileLancers</div>
                <p className="text-sm text-gray-400 mb-4">{t.footer.desc}</p>
                <div className="social-icons"><a href="#"><i className="fab fa-facebook-f"></i></a><a href="#"><i className="fab fa-twitter"></i></a><a href="#"><i className="fab fa-linkedin-in"></i></a></div>
            </div>
            <div className="footer-col">
                <h4>{t.footer.quick}</h4>
                <ul><li><a href="index.html">{t.nav.home}</a></li><li><a href="jobs.html">{t.nav.services}</a></li><li><a href="index.html#how">{t.nav.how}</a></li></ul>
            </div>
            <div className="footer-col">
                <h4>{t.footer.contact}</h4>
                <ul><li><i className="fas fa-envelope mr-2"></i> info@nilelancers.com</li><li><i className="fas fa-map-marker-alt mr-2"></i> Cairo, Egypt</li></ul>
            </div>
        </div>
        <div className="text-center mt-12 pt-5 border-t border-gray-700 text-sm text-gray-500">{t.footer.rights}</div>
    </footer>
  );
}