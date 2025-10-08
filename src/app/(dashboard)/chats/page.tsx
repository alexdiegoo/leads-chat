'use client';

import { useState } from 'react';
import ContactsSection from './components/ContactSection';
import ChatSection from './components/ChatSection';

export default function ChatsPage() {
  const [selectedContact, setSelectedContact] = useState<null | {
    remoteJid: string;
    pushName: string;
  }>(null);

  return (
    <div className="w-full flex h-screen">
      <div className="w-1/4 border-r border-gray-300">
        <ContactsSection onSelectContact={setSelectedContact} />
      </div>

      <div className="w-3/4">
        <ChatSection contact={selectedContact} />
      </div>
    </div>
  );
}
