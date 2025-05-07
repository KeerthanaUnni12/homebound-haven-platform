
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
              Join Smart Homi to start your real estate journey. Whether you're buying, selling, or investing,
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
          <div className="hidden lg:block rounded-lg overflow-hidden shadow-xl relative">
            <img 
              src="https://images.unsplash.com/photo-1496307653780-42ee777d4833" 
              alt="Modern architectural real estate" 
              className="w-full h-full object-cover"
              style={{ height: "600px" }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-estate-navy/80 to-transparent p-6">
              <h3 className="text-white text-xl font-medium">Your Real Estate Journey Begins Here</h3>
              <p className="text-white/80 mt-2">Find exclusive properties and investment opportunities</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
