import { FaFacebook, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-dark text-gray-300">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-12 md:grid-cols-3 md:px-8">
        <div>
          <h3 className="text-2xl font-bold text-white">SportNest</h3>
          <p className="mt-3 text-sm text-gray-400">
            Book football turfs, badminton courts, swimming lanes and tennis
            courts near you — in just a few clicks.
          </p>
        </div>

        <div>
          <h4 className="mb-3 font-semibold text-white">Contact</h4>
          <p className="mb-2 flex items-center gap-2 text-sm">
            <FiMapPin /> Gulshan, Dhaka, Bangladesh
          </p>
          <p className="mb-2 flex items-center gap-2 text-sm">
            <FiPhone /> +880 1234 567890
          </p>
          <p className="flex items-center gap-2 text-sm">
            <FiMail /> support@sportnest.com
          </p>
        </div>

        <div>
          <h4 className="mb-3 font-semibold text-white">Follow Us</h4>
          <div className="flex gap-4 text-xl">
            <a href="#" aria-label="Facebook" className="hover:text-primary">
              <FaFacebook />
            </a>
            <a href="#" aria-label="X" className="hover:text-primary">
              <FaXTwitter />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-primary">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} SportNest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
