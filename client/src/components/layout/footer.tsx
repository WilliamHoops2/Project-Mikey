import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-electric-yellow/20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="\Logos\mikey-logo-bny.png"
                alt="Logo"
                className="w-46 h-14"
              />
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted marketplace for authentic Apple devices across Indonesia.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://www.instagram.com/mikeys_applestuff"
                target="_blank"
                className="text-electric-yellow hover:glow-yellow transition-all duration-300"
                data-testid="social-instagram"
              >
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a
                href="#"
                className="text-electric-yellow hover:glow-yellow transition-all duration-300"
                data-testid="social-whatsapp"
              >
                <i className="fab fa-whatsapp text-xl"></i>
              </a>
              <a
                href="#"
                className="text-electric-yellow hover:glow-yellow transition-all duration-300"
                data-testid="social-telegram"
              >
                <i className="fab fa-telegram text-xl"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-electric-yellow">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  href="/"
                  className="hover:text-electric-yellow transition-colors"
                  data-testid="footer-link-home"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/buy"
                  className="hover:text-electric-yellow transition-colors"
                  data-testid="footer-link-buy"
                >
                  Buy Products
                </Link>
              </li>
              <li>
                <Link
                  href="/sell"
                  className="hover:text-electric-yellow transition-colors"
                  data-testid="footer-link-sell"
                >
                  Sell Device
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-electric-yellow transition-colors"
                  data-testid="footer-link-contact"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-electric-yellow">Locations</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <i className="fas fa-map-marker-alt text-electric-yellow mr-2"></i>Jakarta
              </li>
              <li>
                <i className="fas fa-map-marker-alt text-electric-yellow mr-2"></i>Surabaya
              </li>
              <li>
                <i className="fas fa-map-marker-alt text-electric-yellow mr-2"></i>Bandung
              </li>
              <li>
                <i className="fas fa-map-marker-alt text-electric-yellow mr-2"></i>Malang
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-electric-yellow">Contact Info</h4>
            <ul className="space-y-2 text-gray-400">
              <li data-testid="contact-phone">
                <i className="fas fa-phone text-electric-yellow mr-2"></i>+62 821-xxxx-xxxx
              </li>
              <li data-testid="contact-email">
                <i className="fas fa-envelope text-electric-yellow mr-2"></i>hello@mikeyapplestuff.com
              </li>
              <li>
                <i className="fas fa-clock text-electric-yellow mr-2"></i>24/7 Support
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-electric-yellow/20 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Mikey Applestuff. All rights reserved. | 100% Authentic Apple Products</p>
        </div>
      </div>
    </footer>
  );
}
