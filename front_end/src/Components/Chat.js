import React, { useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import '../Style/chat.css';

function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);

  const steps = [
    {
      id: 'Greet',
      message: 'Bonjour!',
      trigger: 'Ask Name',
    },
    {
      id: 'Ask Name',
      message: 'Veuillez entrer votre nom',
      trigger: 'waiting',
    },
    {
      id: 'waiting',
      user: true,
      trigger: 'Name',
    },
    {
      id: 'Name',
      message: 'Salut {previousValue}, veuillez sélectionner votre problème',
      trigger: 'issue',
    },
    {
      id: 'issue',
      options: [
        { value: 'Reservation', label: 'Réservation de terrain', trigger: 'Reservation' },
        { value: 'Paiement', label: 'Problème de paiement', trigger: 'Paiement' },
      ],
    },
    {
      id: 'Reservation',
      message: 'Merci d\'avoir signalé votre problème concernant la réservation de terrain. Veuillez contacter l\'administrateur par email à Paintballuniversal@gmail.com ou par téléphone au 22851455.',
      end: true,
    },
    {
      id: 'Paiement',
      message: 'Merci d\'avoir signalé votre problème concernant le paiement. Veuillez contacter l\'administrateur par email à Paintballuniversal@gmail.com ou par téléphone au 22851455.',
      end: true,
    },
  ];

  return (
    <div>
      <button
        className="chat-button"
        onClick={() => setIsOpen(!isOpen)}
        style={{ backgroundImage: `url(./dummy/chatbot-icon.png)` }}
      />
      {isOpen && (
        <div className="chat-window">
          <ChatBot steps={steps} />
        </div>
      )}
    </div>
  );
}

export default FloatingChat;