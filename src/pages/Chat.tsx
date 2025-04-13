
import { Layout } from '@/components/layout/Layout';
import { ChatBox } from '@/components/chat/ChatBox';
import { MessageCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const Chat = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-start space-x-4 mb-8">
          <div className="bg-estate-lightblue rounded-full p-3">
            <MessageCircle className="h-6 w-6 text-estate-navy" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Real Estate Assistant</h1>
            <p className="text-lg text-muted-foreground">
              Get personalized property recommendations and answers to your real estate questions.
            </p>
          </div>
        </div>
        
        <ChatBox />
      </div>
    </Layout>
  );
};

export default Chat;
