"use client";

import { useState, useMemo } from "react";
import { Search, MessageCirclePlus, Settings, X } from "lucide-react";
import type { Conversation } from "@/lib/mock-data";
import {
  getInitials,
  formatTime,
  currentUser,
} from "@/lib/mock-data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SettingsDialog } from "./settings-dialog";
import { cn } from "@/lib/utils";

interface ChatSidebarProps {
  conversations: Conversation[];
  selectedConversationId: string;
  onSelectConversation: (conversation: Conversation) => void;
}

const statusColors = {
  online: "bg-emerald-500",
  away: "bg-amber-500",
  offline: "bg-zinc-400 dark:bg-zinc-600",
};

export function ChatSidebar({
  conversations,
  selectedConversationId,
  onSelectConversation,
}: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) return conversations;
    const query = searchQuery.toLowerCase();
    return conversations.filter(
      (conv) =>
        conv.user.name.toLowerCase().includes(query) ||
        conv.lastMessage.toLowerCase().includes(query),
    );
  }, [conversations, searchQuery]);

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Messages</h2>
          {/* <p className="text-xs text-muted-foreground">Personal</p> */}
        </div>
        <Button variant="ghost" size="icon-sm" className="text-muted-foreground">
          <MessageCirclePlus className="size-4" />
        </Button>
      </div>

      {/* Search */}
      <div className="px-3 pb-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-8 w-full rounded-lg border border-transparent bg-accent pl-8 pr-8 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-ring focus:bg-background"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>
      </div>

      <Separator />

      {/* Conversation List */}
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-1.5 py-2 px-2.5">
          {filteredConversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 px-4 py-8">
              <p className="text-sm text-muted-foreground">No conversations found</p>
            </div>
          ) : (
            filteredConversations.map((conversation) => {
              const isSelected =
                conversation.id === selectedConversationId;
              const isOtherUser = conversation.user.id !== currentUser.id;

              return (
                <button
                  key={conversation.id}
                  onClick={() => onSelectConversation(conversation)}
                  className={cn(
                    "group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all duration-150",
                    isSelected
                      ? "bg-accent"
                      : "hover:bg-accent/50",
                  )}
                >
                  {/* Avatar with status */}
                  <div className="relative shrink-0">
                    <Avatar className="size-11 transition-shadow group-hover:shadow-sm">
                      <AvatarFallback
                        className="bg-muted text-sm font-medium text-muted-foreground"
                      >
                        {getInitials(conversation.user.name)}
                      </AvatarFallback>
                    </Avatar>
                    {/* Status indicator */}
                    {isOtherUser && (
                      <span
                        className={cn(
                          "absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-sidebar",
                          statusColors[conversation.user.status],
                        )}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={cn(
                          "truncate text-sm font-medium",
                          isSelected
                            ? "text-foreground"
                            : "text-foreground/90",
                        )}
                      >
                        {conversation.user.name}
                      </span>
                      <span className="shrink-0 text-[11px] text-muted-foreground">
                        {formatTime(conversation.lastMessageTime)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-xs text-muted-foreground">
                        {conversation.lastMessage}
                      </p>
                      {conversation.unreadCount > 0 && (
                        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </ScrollArea>

      {/* Footer */}
      <Separator />
      <div className="flex items-center gap-2 px-4 py-2.5">
        <Avatar className="size-9">
          <AvatarFallback className="bg-muted text-xs font-semibold text-muted-foreground">
            {getInitials(currentUser.name)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-foreground">
            {currentUser.name}
          </p>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className={cn("size-1.5 rounded-full", statusColors[currentUser.status])} />
            Online
          </p>
        </div>
        <SettingsDialog>
          <Settings className="size-4" />
        </SettingsDialog>
      </div>
    </div>
  );
}