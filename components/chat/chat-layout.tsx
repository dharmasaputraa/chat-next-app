"use client";

import { useState, useCallback } from "react";
import type { Conversation } from "@/lib/mock-data";
import { mockConversations, mockMessages } from "@/lib/mock-data";
import { ChatSidebar } from "./chat-sidebar";
import { ChatPanel } from "./chat-panel";
import { MemberPanel } from "./member-panel";
import { cn } from "@/lib/utils";

export function ChatLayout() {
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation>(mockConversations[0]);
  const [conversations] = useState<Conversation[]>(mockConversations);
  const [showMemberPanel, setShowMemberPanel] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const messages = mockMessages[selectedConversation.id] || [];

  const handleSelectConversation = useCallback(
    (conversation: Conversation) => {
      setSelectedConversation(conversation);
      setMobileSidebarOpen(false);
    },
    [],
  );

  const handleSendMessage = useCallback(
    (content: string) => {
      // Phase 1: just log, no real backend
      console.log("Send message:", content, "to:", selectedConversation.id);
    },
    [selectedConversation.id],
  );

  const handleToggleMemberPanel = useCallback(() => {
    setShowMemberPanel((prev) => !prev);
  }, []);

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-background">
      {/* Mobile overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar - Chat List */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-80 transform border-r border-border bg-sidebar transition-transform duration-300 ease-out md:relative md:z-0 md:translate-x-0",
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <ChatSidebar
          conversations={conversations}
          selectedConversationId={selectedConversation.id}
          onSelectConversation={handleSelectConversation}
        />
      </div>

      {/* Center - Chat Area */}
      <div className="flex min-w-0 flex-1 flex-col">
        <ChatPanel
          conversation={selectedConversation}
          messages={messages}
          onSendMessage={handleSendMessage}
          onToggleMemberPanel={handleToggleMemberPanel}
          showMemberPanel={showMemberPanel}
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
        />
      </div>

      {/* Right Panel - Member Info */}
      <div
        className={cn(
          "hidden w-80 shrink-0 border-l border-border bg-background transition-all duration-300 ease-out lg:block",
          showMemberPanel ? "lg:w-80" : "lg:hidden",
        )}
      >
        <MemberPanel user={selectedConversation.user} />
      </div>
    </div>
  );
}