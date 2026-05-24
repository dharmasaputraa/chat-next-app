"use client";

import { useRef, useEffect, useState, useCallback, type KeyboardEvent } from "react";
import {
  Menu,
  Phone,
  Video,
  Info,
  Paperclip,
  SendHorizonal,
  Smile,
  CheckCheck,
} from "lucide-react";
import type { Conversation, Message } from "@/lib/mock-data";
import { getInitials, formatMessageTime, currentUser } from "@/lib/mock-data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipTrigger, TooltipPopup } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface ChatPanelProps {
  conversation: Conversation;
  messages: Message[];
  onSendMessage: (content: string) => void;
  onToggleMemberPanel: () => void;
  showMemberPanel: boolean;
  onOpenMobileSidebar: () => void;
}

const statusLabels = {
  online: "Active now",
  away: "Away",
  offline: "Offline",
};

const statusDotColors = {
  online: "text-emerald-500",
  away: "text-amber-500",
  offline: "text-zinc-400 dark:text-zinc-600",
};

export function ChatPanel({
  conversation,
  messages,
  onSendMessage,
  onToggleMemberPanel,
  showMemberPanel,
  onOpenMobileSidebar,
}: ChatPanelProps) {
  const [inputValue, setInputValue] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-resize textarea
  const adjustTextareaHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, []);

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputValue, adjustTextareaHeight]);

  const handleSend = useCallback(() => {
    const trimmed = inputValue.trim();
    if (!trimmed && !selectedFile) return;

    onSendMessage(trimmed);
    setInputValue("");
    setSelectedFile(null);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [inputValue, selectedFile, onSendMessage]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setSelectedFile(file);
      }
      // Reset input so same file can be selected again
      e.target.value = "";
    },
    [],
  );

  const removeFile = useCallback(() => {
    setSelectedFile(null);
  }, []);

  const otherUser = conversation.user;
  const isGrouped = (msg: Message, idx: number): boolean => {
    if (idx === 0) return false;
    const prev = messages[idx - 1];
    return prev.senderId === msg.senderId;
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <div className="flex items-center gap-3">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon-sm"
            className="md:hidden"
            onClick={onOpenMobileSidebar}
          >
            <Menu className="size-4" />
          </Button>

          <div className="relative">
            <Avatar className="size-10">
              <AvatarFallback className="bg-muted text-sm font-medium text-muted-foreground">
                {getInitials(otherUser.name)}
              </AvatarFallback>
            </Avatar>
            <span
              className={cn(
                "absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-background",
                otherUser.status === "online"
                  ? "bg-emerald-500"
                  : otherUser.status === "away"
                    ? "bg-amber-500"
                    : "bg-zinc-400 dark:bg-zinc-600",
              )}
            />
          </div>

          <div className="flex flex-col items-start justify-center">
            <h3 className="text-sm font-semibold text-foreground leading-none mb-1">
              {otherUser.name}
            </h3>
            <p className="text-xs text-muted-foreground leading-none">
              {statusLabels[otherUser.status]}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-0.5">
          <Tooltip>
            <TooltipTrigger
              render={
                <Button variant="ghost" size="icon-sm" className="text-muted-foreground" />
              }
            >
              <Phone className="size-4" />
            </TooltipTrigger>
            <TooltipPopup>Voice call</TooltipPopup>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              render={
                <Button variant="ghost" size="icon-sm" className="text-muted-foreground" />
              }
            >
              <Video className="size-4" />
            </TooltipTrigger>
            <TooltipPopup>Video call</TooltipPopup>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className={cn(
                    "text-muted-foreground transition-colors",
                    showMemberPanel && "bg-accent text-foreground",
                  )}
                  onClick={onToggleMemberPanel}
                />
              }
            >
              <Info className="size-4" />
            </TooltipTrigger>
            <TooltipPopup>View profile</TooltipPopup>
          </Tooltip>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 px-4">
        <div className="flex flex-col gap-0.5 py-4">
          {messages.map((message, idx) => {
            const isMe = message.senderId === currentUser.id;
            const grouped = isGrouped(message, idx);
            const showAvatar = !isMe && !grouped;
            const isLastInGroup =
              idx === messages.length - 1 ||
              messages[idx + 1]?.senderId !== message.senderId;

            return (
              <div
                key={message.id}
                className={cn(
                  "flex gap-2.5",
                  isMe ? "flex-row-reverse" : "flex-row",
                  grouped ? "mt-0.5" : "mt-3",
                )}
              >
                {/* Avatar */}
                <div className="w-8 shrink-0">
                  {showAvatar && (
                    <Avatar className="size-8">
                      <AvatarFallback className="bg-muted text-[10px] font-medium text-muted-foreground">
                        {getInitials(otherUser.name)}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>

                {/* Message bubble */}
                <div
                  className={cn(
                    "flex max-w-[70%] flex-col",
                    isMe ? "items-end" : "items-start",
                  )}
                >
                  <div
                    className={cn(
                      "rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
                      isMe
                        ? "rounded-br-md bg-primary text-primary-foreground"
                        : "rounded-bl-md bg-accent",
                      grouped && isMe && "rounded-br-2xl",
                      grouped && !isMe && "rounded-bl-2xl",
                    )}
                  >
                    {message.type === "text" && <p>{message.content}</p>}
                    {message.type === "file" && (
                      <div className="flex items-center gap-2">
                        <Paperclip className="size-3.5 opacity-70" />
                        <span className="underline decoration-underline-offset-2">
                          {message.fileName || "file"}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Timestamp - only show for last in group */}
                  {isLastInGroup && (
                    <div
                      className={cn(
                        "mt-1 flex items-center gap-1.5 px-1",
                        isMe ? "flex-row-reverse" : "flex-row",
                      )}
                    >
                      <span className="text-[10px] text-muted-foreground">
                        {formatMessageTime(message.timestamp)}
                      </span>
                      {isMe && (
                        <CheckCheck className="size-3 text-emerald-500" />
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* File preview */}
      {selectedFile && (
        <div className="border-t border-border px-4 pt-2">
          <div className="inline-flex items-center gap-2 rounded-lg bg-accent px-3 py-1.5 text-xs">
            <Paperclip className="size-3" />
            <span className="max-w-[200px] truncate">{selectedFile.name}</span>
            <button
              onClick={removeFile}
              className="ml-1 text-muted-foreground transition-colors hover:text-foreground"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Message Input */}
      <div className="border-t border-border p-3">
        <div className="flex items-end gap-2 rounded-xl border border-border bg-background px-3 py-2 shadow-sm transition-shadow focus-within:border-ring focus-within:shadow-md">
          {/* File select button */}
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="shrink-0 text-muted-foreground"
                  onClick={() => fileInputRef.current?.click()}
                />
              }
            >
              <Paperclip className="size-4" />
            </TooltipTrigger>
            <TooltipPopup>Attach file</TooltipPopup>
          </Tooltip>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileSelect}
          />

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            rows={1}
            className="max-h-[120px] min-h-[24px] flex-1 resize-none bg-transparent text-sm leading-6 text-foreground placeholder:text-muted-foreground outline-none"
          />

          {/* Emoji placeholder */}
          <Tooltip>
            <TooltipTrigger
              render={
                <Button variant="ghost" size="icon-sm" className="shrink-0 text-muted-foreground" />
              }
            >
              <Smile className="size-4" />
            </TooltipTrigger>
            <TooltipPopup>Emoji</TooltipPopup>
          </Tooltip>

          {/* Send button */}
          <Button
            variant="ghost"
            size="icon-sm"
            className={cn(
              "shrink-0 transition-all duration-200",
              inputValue.trim()
                ? "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
                : "text-muted-foreground",
            )}
            onClick={handleSend}
            disabled={!inputValue.trim() && !selectedFile}
          >
            <SendHorizonal className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}