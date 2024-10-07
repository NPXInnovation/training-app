import { useState } from 'react';
import Link from 'next/link';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';
import {
  Home,
  Settings,
  Users,
  HelpCircle,
  BarChart,
  Menu,
} from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/' },
  { icon: BarChart, label: 'Analytics', href: '/analytics' },
  { icon: Users, label: 'Customers', href: '/customers' },
  { icon: Settings, label: 'Settings', href: '/settings' },
  { icon: HelpCircle, label: 'Help', href: '/help' },
];

export default function CollapsibleNavbar() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <nav
      className={cn(
        'flex h-screen flex-col bg-gray-800 text-white transition-all duration-300 ease-in-out',
        isExpanded ? 'w-64' : 'w-20'
      )}
    >
      <div className="flex items-center justify-between p-4">
        <h1 className={cn('text-xl font-bold', !isExpanded && 'hidden')}>
          eXpert
        </h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>
      <ul className="flex-1 space-y-2 p-4">
        {navItems.map(item => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="flex items-center space-x-2 rounded-lg p-2 transition-colors duration-200 hover:bg-gray-700"
            >
              <item.icon className="h-6 w-6" />
              <span
                className={cn(
                  'transition-opacity duration-200',
                  !isExpanded && 'hidden opacity-0'
                )}
              >
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
