import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { Map, LogIn, LogOut,X,Menu } from 'lucide-react';  // Corrected icon imports

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home', icon: Map },
    { href: '/login', label: 'Login', icon: LogIn },  // Corrected Login icon
    { href: '/', label: 'Logout', icon: LogOut },  // Corrected Logout icon
  ];

  return (
    <>
      <Head>
        <title>India Travel - Explore the Beauty of India</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Explore the beautiful destinations across India" />
      </Head>

      <header className="bg-white shadow-lg dark:bg-gray-800 relative z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center space-x-2 group"
            >
              <Map className="h-8 w-8 text-blue-600 dark:text-blue-400 transform group-hover:scale-110 transition-transform duration-200" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                India Travel
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="px-4 py-2 rounded-lg text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-200 flex items-center space-x-1 group"
                  >
                    <Icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`
              absolute left-0 right-0 bg-white dark:bg-gray-800 shadow-lg mt-4 px-4 py-2 md:hidden
              transition-all duration-300 transform
              ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
            `}
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-2 px-4 py-3 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 group"
                >
                  <Icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </header>
    </>
  );
}
