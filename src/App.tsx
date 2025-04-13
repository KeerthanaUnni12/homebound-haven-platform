
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import AddProperty from "./pages/AddProperty";
import EditProperty from "./pages/EditProperty";
import MyProperties from "./pages/MyProperties";
import Documents from "./pages/Documents";
import Calculator from "./pages/Calculator";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

// Contexts
import { AuthProvider } from "./contexts/AuthContext";
import { PropertyProvider } from "./contexts/PropertyContext";
import { DocumentProvider } from "./contexts/DocumentContext";
import { ChatProvider } from "./contexts/ChatContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <PropertyProvider>
          <DocumentProvider>
            <ChatProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/properties" element={<Properties />} />
                  <Route path="/properties/:id" element={<PropertyDetail />} />
                  <Route path="/add-property" element={<AddProperty />} />
                  <Route path="/edit-property/:id" element={<EditProperty />} />
                  <Route path="/my-properties" element={<MyProperties />} />
                  <Route path="/documents" element={<Documents />} />
                  <Route path="/calculator" element={<Calculator />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </ChatProvider>
          </DocumentProvider>
        </PropertyProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
