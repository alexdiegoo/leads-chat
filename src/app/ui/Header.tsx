'use client'

import { useState } from 'react'
import Dropdown from './Dropdown'

interface Account {
  id: string
  name: string
  phone: string
}

const accounts: Account[] = [
  { id: '1', name: 'Conta 1', phone: '+55 11 99999-1111' },
  { id: '2', name: 'Conta 2', phone: '+55 21 98888-2222' },
  { id: '3', name: 'Conta 3', phone: '+55 31 97777-3333' },
]

export default function Header() {
  const [selected, setSelected] = useState(accounts[0])

  const items = accounts.map((acc) => ({
    label: `${acc.name} — ${acc.phone}`,
    onClick: () => setSelected(acc),
  }))

  return (
    <header className="fixed top-4 left-80 right-6 h-16 bg-white rounded-2xl shadow-md flex items-center justify-end px-6 z-50">
      <div className="relative flex items-center gap-4 w-full justify-between">
        <span className="font-medium">{selected.name} - {selected.phone}</span>
        <Dropdown items={items} buttonLabel="Selecionar WhatsApp" />
      </div>
    </header>
  )
}
