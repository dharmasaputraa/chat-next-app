"use client";

import { Phone, Video, Bell, Search, MoreHorizontal } from "lucide-react";
import type { User } from "@/lib/mock-data";
import { getInitials } from "@/lib/mock-data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipTrigger, TooltipPopup } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface MemberPanelProps {
  user: User;
}

const statusLabels = {
  online: "Active now",
  away: "Away",
  offline: "Offline",
};

const statusColors = {
  online: "bg-emerald-500",
  away: "bg-amber-500",
  offline: "bg-zinc-400 dark:bg-zinc-600",
};

export function MemberPanel({ user }: MemberPanelProps) {
  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <h3 className="text-sm font-semibold text-foreground">Profile</h3>
        <Button variant="ghost" size="icon-sm" className="text-muted-foreground">
          <MoreHorizontal className="size-4" />
        </Button>
      </div>

      <Separator />

      {/* User Info */}
      <div className="flex flex-col items-center gap-4 px-6 py-8">
        {/* Large avatar */}
        <div className="relative">
          <Avatar className="size-24 ring-4 ring-accent">
            <AvatarFallback className="bg-muted text-lg font-semibold text-muted-foreground">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <span
            className={cn(
              "absolute bottom-1 right-1 size-4 rounded-full border-3 border-background",
              statusColors[user.status],
            )}
          />
        </div>

        <div className="text-center">
          <h2 className="text-lg font-semibold text-foreground">{user.name}</h2>
          <p className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
            <span
              className={cn("size-2 rounded-full", statusColors[user.status])}
            />
            {statusLabels[user.status]}
          </p>
        </div>

        {/* Quick actions */}
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger
              render={
                <Button variant="outline" size="icon" className="text-muted-foreground" />
              }
            >
              <Phone className="size-4" />
            </TooltipTrigger>
            <TooltipPopup side="bottom">Voice call</TooltipPopup>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              render={
                <Button variant="outline" size="icon" className="text-muted-foreground" />
              }
            >
              <Video className="size-4" />
            </TooltipTrigger>
            <TooltipPopup side="bottom">Video call</TooltipPopup>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              render={
                <Button variant="outline" size="icon" className="text-muted-foreground" />
              }
            >
              <Bell className="size-4" />
            </TooltipTrigger>
            <TooltipPopup side="bottom">Mute notifications</TooltipPopup>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              render={
                <Button variant="outline" size="icon" className="text-muted-foreground" />
              }
            >
              <Search className="size-4" />
            </TooltipTrigger>
            <TooltipPopup side="bottom">Search in conversation</TooltipPopup>
          </Tooltip>
        </div>
      </div>

      <Separator />

      {/* Shared Media / Info Section */}
      <div className="flex flex-col gap-3 px-4 py-4">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          About
        </h4>
        <p className="text-sm text-foreground">
          Hey there! I'm using Phoenix Chat.
        </p>
      </div>

      <Separator />

      <div className="flex flex-col gap-3 px-4 py-4">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Shared Media
        </h4>
        <div className="grid grid-cols-3 gap-1.5">
          {/* Placeholder media thumbnails */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="aspect-square rounded-lg bg-accent transition-colors hover:bg-accent/80"
            />
          ))}
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-3 px-4 py-4">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Shared Files
        </h4>
        <div className="flex flex-col gap-2">
          {[
            { name: "Project_proposal.pdf", size: "2.4" },
            { name: "Design_mockups.fig", size: "5.1" },
            { name: "Meeting_notes.docx", size: "1.8" },
          ].map((file) => (
              <div
                key={file.name}
                className="flex items-center gap-2.5 rounded-lg p-2 transition-colors hover:bg-accent"
              >
                <div className="flex size-8 items-center justify-center rounded-md bg-accent">
                  <span className="text-[10px] font-medium uppercase text-muted-foreground">
                    {file.name.split(".").pop()}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-foreground">
                    {file.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {file.size} MB
                  </p>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}