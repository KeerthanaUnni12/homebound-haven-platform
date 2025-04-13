
import React from 'react';
import { NavBar } from './NavBar';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 mt-16 pb-10">
        {children}
      </main>
      <Footer />
    </div>
  );
};
