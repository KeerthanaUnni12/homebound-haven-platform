
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Twitter, Facebook, Instagram, Mail, Phone } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-estate-navy text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <Home className="h-6 w-6" />
              <span className="ml-2 text-xl font-bold">Homestead Haven</span>
            </Link>
            <p className="text-sm text-gray-300">
              Your trusted platform for buying, selling, and investing in real estate.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-300 hover:text-estate-gold">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-estate-gold">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-estate-gold">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">For Buyers</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/properties" className="text-gray-300 hover:text-estate-gold text-sm">
                  Find Properties
                </Link>
              </li>
              <li>
                <Link to="/calculator" className="text-gray-300 hover:text-estate-gold text-sm">
                  ROI Calculator
                </Link>
              </li>
              <li>
                <Link to="/chat" className="text-gray-300 hover:text-estate-gold text-sm">
                  Get Property Recommendations
                </Link>
              </li>
              <li>
                <Link to="/documents" className="text-gray-300 hover:text-estate-gold text-sm">
                  Document Storage
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">For Sellers</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/add-property" className="text-gray-300 hover:text-estate-gold text-sm">
                  List Your Property
                </Link>
              </li>
              <li>
                <Link to="/my-properties" className="text-gray-300 hover:text-estate-gold text-sm">
                  Manage Listings
                </Link>
              </li>
              <li>
                <Link to="/documents" className="text-gray-300 hover:text-estate-gold text-sm">
                  Document Management
                </Link>
              </li>
              <li>
                <Link to="/chat" className="text-gray-300 hover:text-estate-gold text-sm">
                  Seller Support
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center text-gray-300 text-sm">
                <Mail className="h-4 w-4 mr-2" />
                <span>contact@homesteadhaven.com</span>
              </li>
              <li className="flex items-center text-gray-300 text-sm">
                <Phone className="h-4 w-4 mr-2" />
                <span>(555) 123-4567</span>
              </li>
            </ul>
            <div className="mt-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider">Subscribe</h3>
              <p className="text-sm text-gray-300 mt-2">
                Stay updated with the latest properties and market trends.
              </p>
              <form className="mt-2 flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 w-full text-black text-sm rounded-l-md focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-estate-gold text-estate-navy px-4 py-2 rounded-r-md text-sm font-medium"
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-600 pt-8 flex flex-col md:flex-row justify-between">
          <p className="text-sm text-gray-300">
            © {new Date().getFullYear()} Homestead Haven. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link to="/privacy" className="text-sm text-gray-300 hover:text-estate-gold">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-gray-300 hover:text-estate-gold">
              Terms of Service
            </Link>
            <Link to="/about" className="text-sm text-gray-300 hover:text-estate-gold">
              About Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
