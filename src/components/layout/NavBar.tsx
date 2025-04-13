
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Home, User, LogOut, PlusCircle, Search, Calculator, MessageCircle, FileText } from 'lucide-react';

export const NavBar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-30 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <Home className="h-6 w-6 text-estate-navy" />
                <span className="ml-2 text-xl font-bold text-estate-navy">Homestead Haven</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              <Link to="/properties" className="px-3 py-2 rounded-md text-sm font-medium text-estate-navy hover:bg-estate-lightblue flex items-center">
                <Search className="w-4 h-4 mr-1" />
                Find Properties
              </Link>
              {user?.role === 'seller' && (
                <Link to="/my-properties" className="px-3 py-2 rounded-md text-sm font-medium text-estate-navy hover:bg-estate-lightblue flex items-center">
                  <PlusCircle className="w-4 h-4 mr-1" />
                  My Listings
                </Link>
              )}
              {user?.role === 'buyer' && (
                <Link to="/calculator" className="px-3 py-2 rounded-md text-sm font-medium text-estate-navy hover:bg-estate-lightblue flex items-center">
                  <Calculator className="w-4 h-4 mr-1" />
                  ROI Calculator
                </Link>
              )}
              {user && (
                <>
                  <Link to="/documents" className="px-3 py-2 rounded-md text-sm font-medium text-estate-navy hover:bg-estate-lightblue flex items-center">
                    <FileText className="w-4 h-4 mr-1" />
                    Documents
                  </Link>
                  <Link to="/chat" className="px-3 py-2 rounded-md text-sm font-medium text-estate-navy hover:bg-estate-lightblue flex items-center">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Chat
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar || ''} alt={user.name} />
                      <AvatarFallback className="bg-estate-navy text-white">
                        {user.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground capitalize">
                        {user.role}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex w-full cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-2">
                <Button asChild variant="outline">
                  <Link to="/login">Log in</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
