import Link from 'next/link';
import { 
  Map, 
  Mail, 
  Phone, 
  Facebook, 
  Twitter, 
  Instagram, 
  Globe2, 
  Compass, 
  Info, 
  Clock, 
  MessageCircle,
  Navigation
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: '/layout', label: 'Home', icon: Globe2 },
    { href: '/layout', label: 'Explore', icon: Compass },
    { href: '/layout', label: 'About India', icon: Info },
    { href: '/layout', label: 'Contact', icon: MessageCircle },
  ];

  const popularDestinations = [
    { name: 'Taj Mahal, Agra', time: '9 AM - 5 PM' },
    { name: 'Jaipur Pink City', time: 'Open 24/7' },
    { name: 'Kerala Backwaters', time: '8 AM - 6 PM' },
    { name: 'Varanasi Ghats', time: '24/7 Access' },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-800 to-gray-900 text-white py-12 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <Map className="absolute right-0 top-0 h-64 w-64 text-white transform rotate-12" />
        <Navigation className="absolute left-0 bottom-0 h-48 w-48 text-white transform -rotate-12" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 group">
              <Map className="h-8 w-8 text-blue-400 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                India Travel
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Embark on a journey through India's rich heritage, vibrant cultures, and breathtaking landscapes. 
              Let us guide you through this incredible country.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-blue-400 flex items-center space-x-2 group transition-colors duration-200"
                    >
                      <Icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Popular Destinations */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Popular Destinations</h3>
            <ul className="space-y-3">
              {popularDestinations.map((dest) => (
                <li key={dest.name} className="flex items-start space-x-2">
                  <Clock className="h-5 w-5 text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-300 font-medium">{dest.name}</p>
                    <p className="text-gray-400 text-sm">{dest.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Connect With Us</h3>
            <div className="space-y-3">
              <a 
                href="mailto:info@indiatravel.com" 
                className="text-gray-300 hover:text-blue-400 flex items-center space-x-2 group transition-colors duration-200"
              >
                <Mail className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                <span className="group-hover:translate-x-1 transition-transform duration-200">
                  info@indiatravel.com
                </span>
              </a>
              <a 
                href="tel:+911234567890" 
                className="text-gray-300 hover:text-blue-400 flex items-center space-x-2 group transition-colors duration-200"
              >
                <Phone className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                <span className="group-hover:translate-x-1 transition-transform duration-200">
                  +91 123 456 7890
                </span>
              </a>
              
              {/* Social Links */}
              <div className="flex space-x-4 pt-4">
                {[
                  { icon: Facebook, label: 'Facebook' },
                  { icon: Twitter, label: 'Twitter' },
                  { icon: Instagram, label: 'Instagram' }
                ].map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href="#"
                      className="bg-gray-700 p-2 rounded-lg hover:bg-blue-500 transition-colors duration-200 group"
                      aria-label={social.label}
                    >
                      <Icon className="h-5 w-5 text-gray-300 group-hover:scale-110 group-hover:text-white transition-all duration-200" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400">
              © {currentYear} India Travel. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}