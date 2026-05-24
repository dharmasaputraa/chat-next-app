"use client";

import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogPopup,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogPanel,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface SettingsDialogProps {
  children: React.ReactNode;
}

type Theme = "light" | "dark" | "system";

function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "system";
  return (localStorage.getItem("theme") as Theme) || "system";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "system") {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.classList.toggle("dark", prefersDark);
  } else {
    root.classList.toggle("dark", theme === "dark");
  }
}

const themes: { value: Theme; label: string; icon: React.ReactNode }[] = [
  { value: "light", label: "Light", icon: <Sun className="size-4" /> },
  { value: "dark", label: "Dark", icon: <Moon className="size-4" /> },
  { value: "system", label: "System", icon: <Monitor className="size-4" /> },
];

export function SettingsDialog({ children }: SettingsDialogProps) {
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = getStoredTheme();
    setTheme(stored);
    applyTheme(stored);
  }, []);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  return (
    <Dialog>
      <DialogTrigger render={<Button variant="ghost" size="icon-sm" className="text-muted-foreground" />}>
        {children}
      </DialogTrigger>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Customize your Phoenix Chat experience</DialogDescription>
        </DialogHeader>
        <DialogPanel>
          <div className="flex flex-col gap-4">
            {/* Theme Section */}
            <div>
              <h4 className="text-sm font-medium text-foreground">Theme</h4>
              <p className="text-xs text-muted-foreground">
                Choose how Phoenix Chat looks on your device
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {themes.map((t) => (
                <button
                  key={t.value}
                  onClick={() => handleThemeChange(t.value)}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-xl border p-3 transition-all duration-150",
                    mounted && theme === t.value
                      ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                      : "border-border hover:border-primary/40 hover:bg-accent/50",
                  )}
                >
                  <div
                    className={cn(
                      "flex size-10 items-center justify-center rounded-lg transition-colors",
                      mounted && theme === t.value
                        ? "bg-primary text-primary-foreground"
                        : "bg-accent text-muted-foreground",
                    )}
                  >
                    {t.icon}
                  </div>
                  <span
                    className={cn(
                      "text-xs font-medium",
                      mounted && theme === t.value ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {t.label}
                  </span>
                </button>
              ))}
            </div>

            <Separator />

            {/* Placeholder for future settings */}
            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-medium text-foreground">Notifications</h4>
              <p className="text-xs text-muted-foreground">
                Notification settings coming soon
              </p>
            </div>

            <Separator />

            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-medium text-foreground">Account</h4>
              <p className="text-xs text-muted-foreground">
                Account settings coming soon
              </p>
            </div>
          </div>
        </DialogPanel>
      </DialogPopup>
    </Dialog>
  );
}