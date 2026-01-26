import React, { useState } from 'react';
import { X, Send, Bot } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const SageAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Hello! I am Sage AI, your CyberSage assistant. I can answer basic questions about our services. You have 3 questions available.'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [queriesLeft, setQueriesLeft] = useState(3);

  const handleSendMessage = () => {
    if (!inputValue.trim() || queriesLeft === 0) return;

    const newMessages = [
      ...messages,
      { type: 'user', text: inputValue }
    ];

    let botResponse = '';
    const input = inputValue.toLowerCase();

    if (input.includes('security') || input.includes('cyber')) {
      botResponse = 'Our cybersecurity services include AI Security Audits, Vulnerability Assessments, Penetration Testing, and Real-time Monitoring. Click on the Security option to explore all services.';
    } else if (input.includes('development') || input.includes('app')) {
      botResponse = 'We offer development services for Android, iOS, Cross-platform (both), and Web applications. Navigate to the Development section to see detailed offerings.';
    } else if (input.includes('training') || input.includes('course')) {
      botResponse = 'Our training programs are available in three levels: Basic, Intermediate, and Advanced. Check out the Training section for more details.';
    } else if (input.includes('price') || input.includes('cost')) {
      botResponse = 'Our pricing varies by service. Security audits start at $20, development projects are quoted based on requirements, and training courses have tier-based pricing. Please check individual service pages for details.';
    } else if (input.includes('contact') || input.includes('reach')) {
      botResponse = 'You can contact us through the contact form available on each service page, or email us at contact@cybersage.ai';
    } else {
      botResponse = 'I can help you with questions about our Security, Development, and Training services. Feel free to ask about pricing, services, or how to get started!';
    }

    newMessages.push({ type: 'bot', text: botResponse });
    setMessages(newMessages);
    setInputValue('');
    setQueriesLeft(queriesLeft - 1);

    if (queriesLeft - 1 === 0) {
      setTimeout(() => {
        setMessages([...newMessages, {
          type: 'bot',
          text: 'You have used all 3 queries. For more detailed assistance, please contact our team via the contact form or email us at contact@cybersage.ai'
        }]);
      }, 500);
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-50"
        >
          <Bot className="w-8 h-8 text-white" />
        </button>
      )}

      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] bg-gray-900 border-gray-800 shadow-2xl flex flex-col z-50">
          <CardHeader className="border-b border-gray-800 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-white text-lg">Sage AI</CardTitle>
                  <Badge variant="outline" className="text-xs border-green-500/50 text-green-400">
                    {queriesLeft} queries left
                  </Badge>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-200'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
          </CardContent>

          <div className="p-4 border-t border-gray-800 flex-shrink-0">
            <div className="flex gap-2">
              <Input
                placeholder={queriesLeft > 0 ? "Ask me anything..." : "Queries exhausted"}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={queriesLeft === 0}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
              <Button
                onClick={handleSendMessage}
                disabled={queriesLeft === 0 || !inputValue.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default SageAI;