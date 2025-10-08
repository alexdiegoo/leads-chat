'use client';

import { useEffect, useState, useRef } from 'react';

interface Message {
  id: string;
  key: {
    id: string;
    fromMe: boolean;
    remoteJid: string;
    participant?: string;
  };
  pushName: string;
  messageType: string;
  message: {
    conversation?: string;
  };
  messageTimestamp: number;
}

interface Props {
  contact: { remoteJid: string; pushName: string } | null;
}

export default function ChatSection({ contact }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const instanceId = 'alex'; // TODO: tornar dinâmico

  useEffect(() => {
    const fetchMessages = async () => {
      if (!contact) return;

      setLoading(true);
      try {
        const res = await fetch(`/api/messages?instance=${instanceId}&remoteJid=${contact.remoteJid}`);
        const data = await res.json();
        setMessages(data || []);
      } catch (err) {
        console.error('Erro ao buscar mensagens', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [contact]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    const trimmed = messageText.trim();
    if (!trimmed || !contact) return;

    try {
      await fetch(`/api/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instance: instanceId,
          remoteJid: contact.remoteJid,
          message: trimmed,
        }),
      });

      setMessageText('');
      const res = await fetch(`/api/messages?instance=${instanceId}&remoteJid=${contact.remoteJid}`);
      const data = await res.json();
      setMessages(data || []);
    } catch (err) {
      console.error('Erro ao enviar mensagem', err);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!contact) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        Selecione um contato para iniciar a conversa
      </div>
    );
  }

  const sortedMessages = [...messages].sort(
    (a, b) => a.messageTimestamp - b.messageTimestamp
  );

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-300 font-semibold text-lg sticky top-0 bg-white z-10">
        {contact.pushName}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
        {loading ? (
          <p className="text-gray-500">Carregando mensagens...</p>
        ) : sortedMessages.length === 0 ? (
          <p className="text-gray-500">Nenhuma mensagem encontrada.</p>
        ) : (
          sortedMessages.map((msg) => (
            <div
              key={msg.id}
              className={`w-fit max-w-[70%] px-4 py-2 rounded-lg text-sm shadow ${
                msg.key.fromMe
                  ? 'ml-auto bg-green-100 text-right'
                  : 'bg-white text-left'
              }`}
            >
              {msg.message?.conversation || '[sem conteúdo]'}
            </div>
          ))
        )}

        <div ref={bottomRef} />
      </div>

      <div className="p-4 border-t border-gray-300 bg-white flex items-center gap-2">
        <textarea
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="Digite sua mensagem..."
          className="flex-1 resize-none border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSendMessage}
          disabled={!messageText.trim()}
          className="bg-primary hover:bg-active text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
