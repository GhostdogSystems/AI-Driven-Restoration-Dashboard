import React, { useState } from 'react';
import { MessageSquareIcon, XIcon, SendIcon, EditIcon, CheckIcon } from 'lucide-react';
interface Message {
  id: number;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}
interface ReportSection {
  id: number;
  title: string;
  content: string;
  editable: boolean;
}
const ReportAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([{
    id: 1,
    text: "Hello! I'm your Report Assistant. I can help you refine your report sections and suggest improvements. What would you like to edit?",
    sender: 'assistant',
    timestamp: new Date()
  }]);
  const [selectedSection, setSelectedSection] = useState<ReportSection | null>(null);
  // Mock report sections
  const [reportSections, setReportSections] = useState<ReportSection[]>([{
    id: 1,
    title: 'Damage Assessment',
    content: 'Water damage detected in living room area. Estimated affected area: 120 sq ft. Severity level: Medium.',
    editable: false
  }, {
    id: 2,
    title: 'Restoration Plan',
    content: 'Recommended immediate water extraction followed by dehumidification. Estimated timeline: 3-5 days.',
    editable: false
  }, {
    id: 3,
    title: 'Cost Estimate',
    content: 'Total estimated cost range: $3,500 - $4,800. Labor: 60%, Materials: 40%.',
    editable: false
  }]);
  const handleSend = () => {
    if (!message.trim()) return;
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: message,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages([...messages, userMessage]);
    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: messages.length + 2,
        text: "I've analyzed your input. Would you like me to help you rephrase that section or provide suggestions for improvement?",
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
    setMessage('');
  };
  const toggleEdit = (sectionId: number) => {
    setReportSections(reportSections.map(section => section.id === sectionId ? {
      ...section,
      editable: !section.editable
    } : section));
  };
  const updateSection = (sectionId: number, newContent: string) => {
    setReportSections(reportSections.map(section => section.id === sectionId ? {
      ...section,
      content: newContent,
      editable: false
    } : section));
  };
  return <>
      {/* Floating button */}
      <button onClick={() => setIsOpen(true)} className="fixed bottom-4 right-4 bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700 transition-colors">
        <MessageSquareIcon className="h-6 w-6" />
      </button>
      {/* Assistant panel */}
      {isOpen && <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-lg flex flex-col z-50">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-blue-600 text-white">
            <h2 className="text-lg font-semibold">Report Assistant</h2>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
              <XIcon className="h-5 w-5" />
            </button>
          </div>
          {/* Report sections */}
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Report Sections
            </h3>
            <div className="space-y-3">
              {reportSections.map(section => <div key={section.id} className="bg-white rounded-md p-3 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-sm font-medium text-gray-900">
                      {section.title}
                    </h4>
                    <button onClick={() => toggleEdit(section.id)} className="text-blue-600 hover:text-blue-700">
                      {section.editable ? <CheckIcon className="h-4 w-4" /> : <EditIcon className="h-4 w-4" />}
                    </button>
                  </div>
                  {section.editable ? <textarea className="w-full p-2 border border-gray-300 rounded-md text-sm" value={section.content} onChange={e => updateSection(section.id, e.target.value)} rows={3} /> : <p className="text-sm text-gray-600">{section.content}</p>}
                </div>)}
            </div>
          </div>
          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(msg => <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`rounded-lg px-4 py-2 max-w-[80%] ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'}`}>
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {msg.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>)}
          </div>
          {/* Input area */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input type="text" value={message} onChange={e => setMessage(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSend()} placeholder="Type your message..." className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
              <button onClick={handleSend} className="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700">
                <SendIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>}
    </>;
};
export default ReportAssistant;