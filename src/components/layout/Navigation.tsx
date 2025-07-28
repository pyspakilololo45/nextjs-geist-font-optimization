'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { 
  Calendar,
  Users,
  UserCheck,
  BarChart3,
  Plus,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'

const navigationItems = [
  {
    name: 'Accueil',
    href: '/',
    icon: Calendar,
    description: 'Calendrier des rendez-vous'
  },
  {
    name: 'Rendez-vous',
    href: '/appointments',
    icon: Calendar,
    description: 'Gestion des rendez-vous'
  },
  {
    name: 'Patients',
    href: '/patients',
    icon: Users,
    description: 'Liste des patients'
  },
  {
    name: 'Médecins',
    href: '/doctors',
    icon: UserCheck,
    description: 'Équipe médicale'
  },
  {
    name: 'Rapports',
    href: '/reports',
    icon: BarChart3,
    description: 'Statistiques et rapports'
  }
]

export function Navigation() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">
                Cabinet Médical
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>

          {/* New Appointment Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button asChild>
              <Link href="/appointments/new">
                <Plus className="w-4 h-4 mr-2" />
                Nouveau RDV
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="w-4 h-4" />
                    <div>
                      <div>{item.name}</div>
                      <div className="text-xs text-gray-500">{item.description}</div>
                    </div>
                  </Link>
                )
              })}
              <div className="pt-2 border-t">
                <Button asChild className="w-full">
                  <Link href="/appointments/new" onClick={() => setIsMobileMenuOpen(false)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Nouveau Rendez-vous
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
