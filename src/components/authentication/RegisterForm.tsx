
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserRole } from '@/types';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('buyer');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await register(name, email, password, role);
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Create an Account</CardTitle>
        <CardDescription>
          Join Homestead Haven to buy, sell, or invest in real estate.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={8}
            />
            <p className="text-xs text-muted-foreground">
              Password must be at least 8 characters long.
            </p>
          </div>
          <div className="space-y-2">
            <Label>I am a:</Label>
            <RadioGroup value={role} onValueChange={(value) => setRole(value as UserRole)} className="flex space-x-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="buyer" id="buyer" />
                <Label htmlFor="buyer" className="cursor-pointer">Buyer</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="seller" id="seller" />
                <Label htmlFor="seller" className="cursor-pointer">Seller</Label>
              </div>
            </RadioGroup>
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Creating account...' : 'Sign Up'}
          </Button>
          <p className="text-sm text-center text-muted-foreground">
            By signing up, you agree to our{' '}
            <a href="#" className="text-estate-navy hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-estate-navy hover:underline">
              Privacy Policy
            </a>.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};
