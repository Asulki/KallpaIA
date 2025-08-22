"use client";

import { ChatIA } from "@/components/dashboard/chat-ia";
import { SpaceBackground } from "@/components/space-background";
import './chat-ia.css';

export default function ChatPage() {
  return (
    <div className="chat-ia-page">
        <SpaceBackground />
        <ChatIA />
    </div>
  );
}
