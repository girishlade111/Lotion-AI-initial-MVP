import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import useStore from '../store/useStore';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const handleLogin = () => {
    // Mock login - no real authentication
    const mockUser = {
      id: '1',
      name: name || 'Guest User',
      email: email || 'guest@lotion.ai',
    };
    login(mockUser);
    navigate('/');
  };
  
  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Lotion AI</h1>
          <p className="text-gray-400">Your AI-powered workspace</p>
        </div>
        
        {/* Login Form */}
        <div className="bg-[#191919] rounded-2xl p-8 border border-[#2f2f2f]">
          <h2 className="text-2xl font-bold text-white mb-6">Welcome back</h2>
          
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Name
              </label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="bg-[#0f0f0f] border-[#2f2f2f] text-white placeholder:text-gray-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="bg-[#0f0f0f] border-[#2f2f2f] text-white placeholder:text-gray-500"
              />
            </div>
          </div>
          
          <Button
            onClick={handleLogin}
            className="w-full h-11 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium"
          >
            Continue to Lotion AI
          </Button>
          
          <p className="text-center text-xs text-gray-500 mt-6">
            This is a demo. No real authentication is required.
          </p>
        </div>
        
        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl mb-1">✍️</div>
            <p className="text-xs text-gray-500">Block Editor</p>
          </div>
          <div>
            <div className="text-2xl mb-1">🤖</div>
            <p className="text-xs text-gray-500">AI Assistant</p>
          </div>
          <div>
            <div className="text-2xl mb-1">🚀</div>
            <p className="text-xs text-gray-500">Projects</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;