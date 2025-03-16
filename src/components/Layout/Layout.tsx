import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, ClipboardListIcon, PlusCircleIcon, FileTextIcon, UsersIcon, SettingsIcon, MenuIcon, XIcon, BellIcon, GlobeIcon } from 'lucide-react';
import ThemeToggle from '../ThemeToggle';
interface LayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}
const Layout: React.FC<LayoutProps> = ({
  children,
  onLogout
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const location = useLocation();
  const navigation = [{
    name: 'Dashboard',
    href: '/',
    icon: HomeIcon
  }, {
    name: 'Field Assessments',
    href: '/assessments',
    icon: ClipboardListIcon
  }, {
    name: 'New Assessment',
    href: '/assessments/new',
    icon: PlusCircleIcon
  }, {
    name: 'Reports',
    href: '/reports',
    icon: FileTextIcon
  }, {
    name: 'Client Portal',
    href: '/client-portal',
    icon: UsersIcon
  }, {
    name: 'Settings',
    href: '/settings',
    icon: SettingsIcon
  }];
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };
  return <div className="flex h-full min-h-screen bg-neutral-200 dark:bg-neutral-900">
      <div className="lg:hidden">
        <div className="fixed inset-0 z-40 flex">
          <div className={`fixed inset-0 bg-neutral-800 bg-opacity-75 transition-opacity ease-linear duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setSidebarOpen(false)} />
          <div className={`relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-neutral-100 dark:bg-neutral-800 transition ease-in-out duration-300 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button type="button" className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" onClick={() => setSidebarOpen(false)}>
                <XIcon className="h-6 w-6 text-white" />
              </button>
            </div>
            <div className="flex-shrink-0 flex items-center px-4">
              <h1 className="text-2xl font-bold text-blue-600">RestoreAI</h1>
            </div>
            <div className="mt-5 flex-1 h-0 overflow-y-auto">
              <nav className="px-2 space-y-1">
                {navigation.map(item => {
                const isActive = location.pathname === item.href;
                return <Link key={item.name} to={item.href} className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                      <item.icon className={`mr-4 h-6 w-6 ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'}`} />
                      {item.name}
                    </Link>;
              })}
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 border-r border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800">
            <div className="flex items-center h-16 flex-shrink-0 px-4 bg-emerald-600 dark:bg-emerald-700">
              <h1 className="text-xl font-bold text-white">RestoreAI</h1>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 px-2 py-2 space-y-1">
                {navigation.map(item => {
                const isActive = location.pathname === item.href;
                return <Link key={item.name} to={item.href} className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-200' : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'}`}>
                      <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-neutral-500 dark:text-neutral-400'}`} />
                      {item.name}
                    </Link>;
              })}
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-neutral-100 dark:bg-neutral-800 shadow-sm border-b border-neutral-200 dark:border-neutral-700">
          <button type="button" className="px-4 border-r border-neutral-200 dark:border-neutral-700 text-neutral-500 lg:hidden" onClick={() => setSidebarOpen(true)}>
            <MenuIcon className="h-6 w-6" />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">
              <h1 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 lg:hidden">
                RestoreAI
              </h1>
            </div>
            <div className="ml-4 flex items-center md:ml-6 space-x-3">
              <ThemeToggle />
              <button onClick={toggleLanguage} className="p-1 rounded-full text-neutral-500 hover:text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-300">
                <GlobeIcon className="h-6 w-6" />
              </button>
              <span className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
                {language === 'en' ? 'EN' : 'ES'}
              </span>
              <button className="p-1 rounded-full text-neutral-500 hover:text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-300">
                <BellIcon className="h-6 w-6" />
              </button>
              <div className="relative">
                <button onClick={onLogout} className="max-w-xs bg-neutral-200 dark:bg-neutral-700 flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                  <div className="h-8 w-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-medium">
                    JD
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <main className="flex-1 relative overflow-y-auto focus:outline-none bg-neutral-200 dark:bg-neutral-900">
          <div className="py-4 px-4">{children}</div>
        </main>
      </div>
    </div>;
};
export default Layout;