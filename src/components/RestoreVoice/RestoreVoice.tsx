import React, { useEffect, useState } from 'react';
import { MicIcon, VolumeIcon, XIcon, LanguagesIcon, PauseIcon, PlayIcon } from 'lucide-react';
const RestoreVoice: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [translation, setTranslation] = useState('');
  const [sourceLang, setSourceLang] = useState<'en' | 'es'>('en');
  // Mock translation function
  const translateText = (text: string, from: 'en' | 'es', to: 'en' | 'es') => {
    // In a real app, this would call a translation API
    return new Promise<string>(resolve => {
      setTimeout(() => {
        if (from === 'en' && to === 'es') {
          resolve(text.length > 0 ? '¿Cómo puedo ayudarte hoy?' : '');
        } else {
          resolve(text.length > 0 ? 'How can I help you today?' : '');
        }
      }, 500);
    });
  };
  // Handle speech recognition
  useEffect(() => {
    if (isListening) {
      // In a real app, this would use the Web Speech API
      const timer = setTimeout(() => {
        setTranscript(sourceLang === 'en' ? 'How can I help you today?' : '¿Cómo puedo ayudarte hoy?');
        setIsListening(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isListening, sourceLang]);
  // Handle translation
  useEffect(() => {
    if (transcript) {
      translateText(transcript, sourceLang, sourceLang === 'en' ? 'es' : 'en').then(setTranslation);
    }
  }, [transcript, sourceLang]);
  const toggleLanguage = () => {
    setSourceLang(sourceLang === 'en' ? 'es' : 'en');
    setTranscript('');
    setTranslation('');
  };
  const startListening = () => {
    setIsListening(true);
    setTranscript('');
    setTranslation('');
  };
  const stopListening = () => {
    setIsListening(false);
  };
  return <>
      {/* Floating button */}
      <button onClick={() => setIsOpen(true)} className="fixed bottom-4 left-4 bg-green-600 text-white rounded-full p-3 shadow-lg hover:bg-green-700 transition-colors">
        <LanguagesIcon className="h-6 w-6" />
      </button>
      {/* Translation panel */}
      {isOpen && <div className="fixed inset-y-0 left-0 w-96 bg-white shadow-lg flex flex-col z-50">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-green-600 text-white">
            <h2 className="text-lg font-semibold">RestoreVoice</h2>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
              <XIcon className="h-5 w-5" />
            </button>
          </div>
          {/* Language toggle */}
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <button onClick={toggleLanguage} className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <LanguagesIcon className="h-5 w-5" />
              <span>
                {sourceLang === 'en' ? 'English → Spanish' : 'Spanish → English'}
              </span>
            </button>
          </div>
          {/* Translation area */}
          <div className="flex-1 p-4 space-y-4">
            {/* Source language */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                {sourceLang === 'en' ? 'English' : 'Spanish'}
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 min-h-[100px] relative">
                <p className="text-gray-900">{transcript}</p>
                {isListening && <div className="absolute top-2 right-2">
                    <div className="animate-pulse flex space-x-1">
                      <div className="h-2 w-2 bg-red-600 rounded-full"></div>
                      <div className="h-2 w-2 bg-red-600 rounded-full"></div>
                      <div className="h-2 w-2 bg-red-600 rounded-full"></div>
                    </div>
                  </div>}
              </div>
            </div>
            {/* Target language */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                {sourceLang === 'en' ? 'Spanish' : 'English'}
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 min-h-[100px]">
                <p className="text-gray-900">{translation}</p>
              </div>
            </div>
          </div>
          {/* Controls */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-center space-x-4">
              <button onClick={isListening ? stopListening : startListening} className={`flex items-center space-x-2 px-4 py-2 rounded-md ${isListening ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}>
                {isListening ? <>
                    <PauseIcon className="h-5 w-5" />
                    <span>Stop</span>
                  </> : <>
                    <MicIcon className="h-5 w-5" />
                    <span>Start Speaking</span>
                  </>}
              </button>
              {translation && <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md">
                  <VolumeIcon className="h-5 w-5" />
                  <span>Play Translation</span>
                </button>}
            </div>
          </div>
        </div>}
    </>;
};
export default RestoreVoice;