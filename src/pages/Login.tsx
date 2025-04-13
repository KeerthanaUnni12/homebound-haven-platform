
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
          <div className="hidden lg:block bg-estate-lightblue h-96 rounded-lg"></div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
