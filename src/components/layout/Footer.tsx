
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Twitter, Facebook, Instagram, Mail, Phone } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-estate-navy text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <Home className="h-6 w-6" />
              <span className="ml-2 text-xl font-bold">Smart Homi</span>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                    <Link to="/chat" className="text-gray-300 hover:text-estate-gold text-sm">
                      Seller Support
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-600 pt-8 flex flex-col md:flex-row justify-between">
          <p className="text-sm text-gray-300">
            © {new Date().getFullYear()} Smart Homi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
