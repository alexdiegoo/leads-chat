'use client';

import { useEffect, useState } from 'react';

interface Contact {
  id: string;
  remoteJid: string;
  pushName: string;
  profilePicUrl?: string;
  isGroup: boolean;
  type: string;
}

interface Props {
  onSelectContact: (contact: { remoteJid: string; pushName: string }) => void;
}

export default function ContactsSection({ onSelectContact }: Props) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const instanceId = 'alex'; // tornar dinâmico

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch(`/api/contacts?instance=${instanceId}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || 'Erro desconhecido');
        setContacts(data || []);
      } catch (err: any) {
        setError(err.message || 'Erro ao buscar contatos');
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter((contact) =>
    contact.pushName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold mb-2">Contatos</h2>

        <input
          type="text"
          placeholder="Pesquisar contato..."
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading && <div className="p-4 text-gray-500">Carregando...</div>}
        {error && <div className="p-4 text-red-500">{error}</div>}

        <ul>
          {filteredContacts.map((contact) => (
            <li
              key={contact.remoteJid}
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() =>
                onSelectContact({ remoteJid: contact.remoteJid, pushName: contact.pushName })
              }
            >
              {contact.profilePicUrl ? (
                <img
                  src={contact.profilePicUrl}
                  alt={contact.pushName}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm text-white">
                  {contact.pushName?.charAt(0).toUpperCase() || "?"}
                </div>
              )}

              <div className="flex flex-col truncate">
                <span className="text-sm font-medium truncate">{contact.pushName}</span>
                <span className="text-xs text-gray-500">
                  {contact.isGroup ? 'Grupo' : 'Contato'}
                </span>
              </div>
            </li>
          ))}
        </ul>

        {!loading && !error && filteredContacts.length === 0 && (
          <div className="p-4 text-gray-500 text-sm">Nenhum contato encontrado.</div>
        )}
      </div>
    </div>
  );
}
