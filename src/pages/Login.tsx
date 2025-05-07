
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { LoginForm } from '@/components/authentication/LoginForm';

const Login = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-3xl font-bold mb-4">Welcome Back</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Log in to access your account and manage your real estate journey.
            </p>
            <LoginForm />
            <p className="text-center mt-6 text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/register" className="text-estate-navy font-medium hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
          <div className="hidden lg:block rounded-lg overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
              alt="Modern real estate workspace" 
              className="w-full h-full object-cover"
              style={{ height: "500px" }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-estate-navy/80 to-transparent p-6">
              <h3 className="text-white text-xl font-medium">Smart Real Estate Solutions</h3>
              <p className="text-white/80 mt-2">Simplifying your property journey</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
