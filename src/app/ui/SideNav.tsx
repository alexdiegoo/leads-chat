'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Icon } from '@iconify/react'

interface NavItem {
  label: string
  href: string
  icon: string
  description?: string
  enabled?: boolean
}

const navItems: NavItem[] = [
  { label: 'Funil', href: '/funil', icon: 'fluent:data-funnel-24-regular', description: 'Gerenciar funis', enabled: false },
  { label: 'Contatos', href: '/contacts', icon: 'pajamas:profile', description: 'Lista de contatos', enabled: false },
  { label: 'Chats', href: '/chats', icon: 'ci:chat', description: 'Central de mensagens', enabled: true },
  { label: 'Configurações', href: '/settings', icon: 'ion:settings-outline', enabled: true },
]

function NavItemComponent({ item }: { item: NavItem }) {
  const pathname = usePathname()
  const isActive = pathname === item.href
  const isEnabled = item.enabled ?? true

  const itemClasses = `
    flex items-center gap-6 p-3 rounded-lg transition-colors
    ${isActive ? 'bg-active text-primary font-semibold' : 'opacity-50'}
    ${isEnabled ? 'hover:bg-active cursor-pointer' : 'opacity-50 cursor-not-allowed'}
  `

  const content = (
    <>
      <Icon icon={item.icon} className="w-5 h-5" />
      <div className="flex flex-col">
        <span className='text-sm'>{item.label}</span>
        {item.description && <span className="text-xs text-gray-500">{item.description}</span>}
      </div>
    </>
  )

  return isEnabled ? (
    <Link href={item.href}>
      <span className={itemClasses}>{content}</span>
    </Link>
  ) : (
    <div className={itemClasses}>{content}</div>
  )
}

export default function SideNav() {
  return (
    <nav className="fixed top-4 left-4 w-58 h-[calc(100vh-2rem)] bg-card rounded-2xl shadow-md text-black p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-6 text-center">Meu CRM</h1>
      <div className='flex flex-col gap-2'>
        {navItems.map((item) => (
          <NavItemComponent key={item.href} item={item} />
        ))}
      </div>
    </nav>
  )
}
