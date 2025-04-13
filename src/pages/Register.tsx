
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { RegisterForm } from '@/components/authentication/RegisterForm';

const Register = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-3xl font-bold mb-4">Create Your Account</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Join Homestead Haven to start your real estate journey. Whether you're buying, selling, or investing,
              we're here to help.
            </p>
            <RegisterForm />
            <p className="text-center mt-6 text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-estate-navy font-medium hover:underline">
                Log In
              </Link>
            </p>
          </div>
          <div className="hidden lg:block bg-estate-lightblue h-96 rounded-lg"></div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
