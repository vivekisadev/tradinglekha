"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SquarePen,
  Search,
  PanelLeft,
  PanelLeftClose,
  Images,
  Library,
  Puzzle,
  FolderKanban,
  Terminal,
  MoreHorizontal,
  Pin,
  Pencil,
  Trash2,
  Share2,
  Archive,
  Download,
  Sparkles,
  Settings,
  LogOut,
  Check,
  X,
  Bot,
  Command as CmdIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/lightswind/button";
import { Input } from "@/components/lightswind/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/lightswind/avatar";

export interface SidebarNavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
  onClick?: () => void;
}

export interface ChatHistoryItem {
  id: string;
  title: string;
  timestamp?: string;
  pinned?: boolean;
  archived?: boolean;
}

export interface ChatHistoryGroup {
  category: string;
  items: ChatHistoryItem[];
}

export interface SidebarUser {
  name: string;
  email?: string;
  avatarUrl?: string;
  plan?: string;
}

export interface CustomChatItemAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
  danger?: boolean;
  onClick?: (chat: ChatHistoryItem) => void;
}

export interface AiSidebarProps {
  brandName?: string;
  brandLogo?: React.ReactNode;
  navItems?: SidebarNavItem[];
  moreNavItems?: SidebarNavItem[];
  chatHistoryGroups?: ChatHistoryGroup[];
  activeChatId?: string;
  user?: SidebarUser;
  collapsed?: boolean;
  searchQuery?: string;
  customChatActions?: CustomChatItemAction[];
  onSearchChange?: (query: string) => void;
  onToggleCollapse?: () => void;
  onNewChat?: () => void;
  onSelectChat?: (chatId: string) => void;
  onDeleteChat?: (chatId: string) => void;
  onPinChat?: (chatId: string) => void;
  onRenameChat?: (chatId: string, newTitle: string) => void;
  onShareChat?: (chatId: string) => void;
  onArchiveChat?: (chatId: string) => void;
  onExportChat?: (chatId: string) => void;
  onUpgradeClick?: () => void;
  className?: string;
}

const DEFAULT_NAV_ITEMS: SidebarNavItem[] = [
  { id: "images", label: "Images", icon: <Images className="w-4 h-4" /> },
  { id: "library", label: "Library", icon: <Library className="w-4 h-4" /> },
  { id: "plugins", label: "Plugins", icon: <Puzzle className="w-4 h-4" /> },
  { id: "projects", label: "Projects", icon: <FolderKanban className="w-4 h-4" /> },
  { id: "codex", label: "Codex", icon: <Terminal className="w-4 h-4" /> },
];

const DEFAULT_MORE_NAV_ITEMS: SidebarNavItem[] = [
  { id: "gpts", label: "Custom GPTs", icon: <Sparkles className="w-4 h-4" /> },
  { id: "archived", label: "Archived Chats", icon: <Archive className="w-4 h-4" /> },
  { id: "shortcuts", label: "Shortcuts", icon: <CmdIcon className="w-4 h-4" /> },
];

const DEFAULT_CHAT_GROUPS: ChatHistoryGroup[] = [
  {
    category: "Recents",
    items: [
      { id: "chat-1", title: "CSS Position Concept Reel", pinned: true },
      { id: "chat-2", title: "Cross-posting Monetization Clarity" },
      { id: "chat-3", title: "Induction Stove for Cooking" },
      { id: "chat-4", title: "Flexbox Grid Learning Tool" },
      { id: "chat-5", title: "Professional Video Creation" },
      { id: "chat-6", title: "Lightswind AI Fluid Blob" },
      { id: "chat-7", title: "Lightswind UI Carousel Help" },
      { id: "chat-8", title: "Correct Product Hunt Process" },
      { id: "chat-9", title: "Deadpool vs Wolverine OTT" },
      { id: "chat-10", title: "Anxiety vs Imagination" },
      { id: "chat-11", title: "Thyroid Tablet and Soy" },
      { id: "chat-12", title: "Redish Background Design" },
      { id: "chat-13", title: "YouTube Shorts Revenue Estimate" },
      { id: "chat-14", title: "Cover Image Request" },
      { id: "chat-15", title: "Shader Compilation Error Fix" },
      { id: "chat-16", title: "Interactive 3D Shader" },
      { id: "chat-17", title: "Hyper-realistic Headshot Description" },
      { id: "chat-18", title: "Lightswind UI Installation Guide" },
    ],
  },
];

const DEFAULT_USER: SidebarUser = {
  name: "J Muhilvanan",
  email: "muhil@lightswind.ui",
  plan: "Free",
};

export const AiSidebar: React.FC<AiSidebarProps> = ({
  brandName = "ChatGPT",
  brandLogo = <Bot className="w-5 h-5 text-foreground" />,
  navItems = DEFAULT_NAV_ITEMS,
  moreNavItems = DEFAULT_MORE_NAV_ITEMS,
  chatHistoryGroups = DEFAULT_CHAT_GROUPS,
  activeChatId = "chat-1",
  user = DEFAULT_USER,
  collapsed = false,
  searchQuery,
  customChatActions,
  onSearchChange,
  onToggleCollapse,
  onNewChat,
  onSelectChat,
  onDeleteChat,
  onPinChat,
  onRenameChat,
  onShareChat,
  onArchiveChat,
  onExportChat,
  onUpgradeClick,
  className,
}) => {
  const [internalQuery, setInternalQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [activeChat, setActiveChat] = useState(activeChatId);
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [showMoreNav, setShowMoreNav] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const query = searchQuery !== undefined ? searchQuery : internalQuery;
  const setQuery = onSearchChange || setInternalQuery;

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearching) {
      searchInputRef.current?.focus();
    }
  }, [isSearching]);

  const handleStartRename = (id: string, currentTitle: string) => {
    setEditingChatId(id);
    setEditingTitle(currentTitle);
    setOpenMenuId(null);
  };

  const handleSaveRename = (id: string) => {
    if (editingTitle.trim() && onRenameChat) {
      onRenameChat(id, editingTitle.trim());
    }
    setEditingChatId(null);
  };

  const handleSelect = (id: string) => {
    setActiveChat(id);
    if (onSelectChat) onSelectChat(id);
  };

  // Filter chats by search query
  const filteredGroups = chatHistoryGroups.map((group) => ({
    ...group,
    items: group.items.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    ),
  })).filter((group) => group.items.length > 0);

  /* ── COLLAPSED SIDEBAR VIEW ── */
  if (collapsed) {
    return (
      <aside
        className={cn(
          "w-16 h-full min-h-[580px] bg-card border-r border-border flex flex-col items-center justify-between py-3 px-2 font-sans select-none transition-all duration-200",
          className
        )}
      >
        {/* Top Header Icons */}
        <div className="flex flex-col items-center gap-3 w-full">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="w-10 h-10 rounded-xl text-muted-foreground hover:text-foreground dark:hover:text-white"
            title="Expand Sidebar"
          >
            <PanelLeft className="w-5 h-5" />
          </Button>

          <Button
            type="button"
            variant="default"
            size="icon"
            onClick={onNewChat}
            className="w-10 h-10 rounded-xl bg-zinc-900 dark:bg-card text-white dark:text-zinc-950 shadow-xs"
            title="New Chat"
          >
            <SquarePen className="w-5 h-5" />
          </Button>

          <div className="w-8 h-px bg-zinc-200 dark:bg-zinc-800 my-1" />

          {/* Quick Nav Icons */}
          {navItems.map((item) => (
            <Button
              key={item.id}
              type="button"
              variant="ghost"
              size="icon"
              onClick={item.onClick}
              className="w-10 h-10 rounded-xl text-muted-foreground hover:bg-secondary dark:hover:bg-zinc-900"
              title={item.label}
            >
              {item.icon}
            </Button>
          ))}
        </div>

        {/* User Footer Icon */}
        <div className="w-full flex justify-center pt-3 border-t border-border">
          <Avatar className="w-9 h-9 cursor-pointer ring-2 ring-transparent hover:ring-zinc-300 dark:hover:ring-zinc-700 transition-all">
            {user.avatarUrl ? (
              <AvatarImage src={user.avatarUrl} alt={user.name} />
            ) : null}
            <AvatarFallback className="bg-zinc-900 text-white text-xs font-semibold">
              {user.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </aside>
    );
  }

  /* ── FULL EXPANDED SIDEBAR VIEW ── */
  return (
    <aside
      className={cn(
        "w-64 h-full min-h-[580px] bg-card border-r border-border flex flex-col justify-between py-3 px-3 font-sans select-none transition-all duration-200 text-foreground",
        className
      )}
    >
      {/* ── TOP SECTION: Brand Header & Nav ── */}
      <div className="flex flex-col gap-2 min-h-0 flex-1">
        {/* Brand Bar */}
        <div className="flex items-center justify-between px-2 py-1">
          <div className="flex items-center gap-2 font-bold text-base tracking-tight text-foreground">
            {brandLogo}
            <span>{brandName}</span>
          </div>

          <div className="flex items-center gap-0.5">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setIsSearching(!isSearching)}
              className="w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground dark:hover:text-white"
              title="Search Conversations"
            >
              <Search className="w-4 h-4" />
            </Button>

            {onToggleCollapse && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={onToggleCollapse}
                className="w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground dark:hover:text-white"
                title="Collapse Sidebar"
              >
                <PanelLeftClose className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Search Bar Toggle */}
        <AnimatePresence>
          {isSearching && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="px-1 overflow-hidden"
            >
              <div className="relative flex items-center">
                <Search className="w-3.5 h-3.5 absolute left-2.5 text-muted-foreground" />
                <Input
                  ref={searchInputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search chats…"
                  className="pl-8 pr-7 py-1.5 h-8 text-xs bg-muted border-border rounded-lg"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="absolute right-2 text-muted-foreground hover:text-zinc-700 dark:hover:text-zinc-200"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* New Chat Primary Button */}
        <Button
          type="button"
          variant="secondary"
          onClick={onNewChat}
          className="w-full flex items-center justify-between px-3 py-2 h-10 rounded-xl bg-secondary dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-850 text-foreground font-medium text-xs border border-border/50 dark:border-zinc-800/50 shadow-2xs transition-all"
        >
          <div className="flex items-center gap-2.5">
            <SquarePen className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
            <span>New chat</span>
          </div>
          <span className="text-[10px] font-mono text-muted-foreground dark:text-muted-foreground bg-zinc-200/60 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
            ⌘N
          </span>
        </Button>

        {/* Quick Nav Links & More Popover */}
        <div className="space-y-0.5 px-1 py-1 relative">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={item.onClick}
              className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-secondary dark:hover:bg-zinc-900 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-muted-foreground">{item.icon}</span>
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] bg-secondary text-muted-foreground px-1.5 py-0.5 rounded-full font-mono">
                  {item.badge}
                </span>
              )}
            </button>
          ))}

          {/* More Items Button */}
          <button
            type="button"
            onClick={() => setShowMoreNav(!showMoreNav)}
            className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground dark:hover:text-white hover:bg-secondary dark:hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
              <span>More</span>
            </div>
          </button>

          {/* More Nav Popover Menu */}
          {showMoreNav && (
            <div
              className="absolute left-1 right-1 top-full z-50 mt-1 bg-card border border-border rounded-xl shadow-xl p-1 space-y-0.5"
              onMouseLeave={() => setShowMoreNav(false)}
            >
              {moreNavItems.map((mItem) => (
                <button
                  key={mItem.id}
                  type="button"
                  onClick={() => {
                    if (mItem.onClick) mItem.onClick();
                    setShowMoreNav(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-secondary dark:hover:bg-zinc-900 transition-colors text-left"
                >
                  <span className="text-muted-foreground">{mItem.icon}</span>
                  <span>{mItem.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── MIDDLE SECTION: Scrollable Chat History ── */}
        <div className="flex-1 min-h-0 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pt-2 space-y-4">
          {filteredGroups.map((group) => (
            <div key={group.category} className="space-y-1">
              <div className="px-2 text-[11px] font-semibold text-muted-foreground dark:text-muted-foreground tracking-wider">
                {group.category}
              </div>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = activeChat === item.id;
                  const isEditing = editingChatId === item.id;
                  const isMenuOpen = openMenuId === item.id;

                  if (isEditing) {
                    return (
                      <div key={item.id} className="flex items-center gap-1 px-1 py-1">
                        <Input
                          type="text"
                          value={editingTitle}
                          onChange={(e) => setEditingTitle(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleSaveRename(item.id);
                            if (e.key === "Escape") setEditingChatId(null);
                          }}
                          className="h-7 text-xs px-2 py-0"
                          autoFocus
                        />
                        <button
                          type="button"
                          onClick={() => handleSaveRename(item.id)}
                          className="p-1 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingChatId(null)}
                          className="p-1 text-muted-foreground hover:bg-muted rounded"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  }

                  return (
                    <div key={item.id} className="relative group">
                      <button
                        type="button"
                        onClick={() => handleSelect(item.id)}
                        className={cn(
                          "w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs text-left transition-colors cursor-pointer group-hover:pr-8",
                          isActive
                            ? "bg-secondary dark:bg-zinc-850 font-semibold text-foreground"
                            : "text-zinc-700 dark:text-zinc-300 hover:bg-muted dark:hover:bg-zinc-900/70"
                        )}
                      >
                        <span className="truncate pr-1">{item.title}</span>
                        {item.pinned && (
                          <Pin className="w-3 h-3 text-muted-foreground shrink-0 transform rotate-45" />
                        )}
                      </button>

                      {/* Options Trigger Menu Button */}
                      <div className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuId(isMenuOpen ? null : item.id);
                          }}
                          className="p-1 rounded-md text-muted-foreground hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                        >
                          <MoreHorizontal className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Extended Chat Action Popover Menu */}
                      {isMenuOpen && (
                        <div
                          className="absolute right-2 top-8 z-50 w-40 bg-card dark:bg-zinc-900 border border-border rounded-xl shadow-xl py-1 text-xs space-y-0.5"
                          onMouseLeave={() => setOpenMenuId(null)}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              if (onShareChat) onShareChat(item.id);
                              setOpenMenuId(null);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-1.5 text-left text-zinc-700 dark:text-zinc-300 hover:bg-muted"
                          >
                            <Share2 className="w-3.5 h-3.5 text-muted-foreground" />
                            <span>Share</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (onPinChat) onPinChat(item.id);
                              setOpenMenuId(null);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-1.5 text-left text-zinc-700 dark:text-zinc-300 hover:bg-muted"
                          >
                            <Pin className="w-3.5 h-3.5 text-muted-foreground" />
                            <span>{item.pinned ? "Unpin" : "Pin chat"}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStartRename(item.id, item.title)}
                            className="w-full flex items-center gap-2 px-3 py-1.5 text-left text-zinc-700 dark:text-zinc-300 hover:bg-muted"
                          >
                            <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
                            <span>Rename</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (onArchiveChat) onArchiveChat(item.id);
                              setOpenMenuId(null);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-1.5 text-left text-zinc-700 dark:text-zinc-300 hover:bg-muted"
                          >
                            <Archive className="w-3.5 h-3.5 text-muted-foreground" />
                            <span>Archive</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (onExportChat) onExportChat(item.id);
                              setOpenMenuId(null);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-1.5 text-left text-zinc-700 dark:text-zinc-300 hover:bg-muted"
                          >
                            <Download className="w-3.5 h-3.5 text-muted-foreground" />
                            <span>Export chat</span>
                          </button>

                          {customChatActions && customChatActions.map((cAction) => (
                            <button
                              key={cAction.id}
                              type="button"
                              onClick={() => {
                                if (cAction.onClick) cAction.onClick(item);
                                setOpenMenuId(null);
                              }}
                              className={cn(
                                "w-full flex items-center gap-2 px-3 py-1.5 text-left",
                                cAction.danger
                                  ? "text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                                  : "text-zinc-700 dark:text-zinc-300 hover:bg-muted"
                              )}
                            >
                              {cAction.icon}
                              <span>{cAction.label}</span>
                            </button>
                          ))}

                          <div className="w-full h-px bg-secondary my-0.5" />

                          <button
                            type="button"
                            onClick={() => {
                              if (onDeleteChat) onDeleteChat(item.id);
                              setOpenMenuId(null);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-1.5 text-left text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 font-medium"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                            <span>Delete</span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {filteredGroups.length === 0 && (
            <div className="px-3 py-6 text-center text-xs text-muted-foreground dark:text-muted-foreground">
              No chats found for &quot;{query}&quot;
            </div>
          )}
        </div>
      </div>

      {/* ── BOTTOM SECTION: User Profile & Upgrade Footer ── */}
      <div className="pt-2 border-t border-zinc-100 dark:border-zinc-900 relative">
        <div className="flex items-center justify-between p-1.5 rounded-xl hover:bg-muted dark:hover:bg-zinc-900 transition-colors">
          <button
            type="button"
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2.5 text-left flex-1 min-w-0"
          >
            <Avatar className="w-8 h-8 shrink-0">
              {user.avatarUrl ? <AvatarImage src={user.avatarUrl} alt={user.name} /> : null}
              <AvatarFallback className="bg-zinc-900 text-white text-xs font-semibold">
                {user.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0 leading-tight">
              <span className="text-xs font-semibold text-foreground truncate">
                {user.name}
              </span>
              <span className="text-[10px] text-muted-foreground dark:text-muted-foreground truncate">
                {user.plan || "Free"}
              </span>
            </div>
          </button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onUpgradeClick}
            className="h-7 px-2.5 rounded-full text-[11px] font-medium border-border text-foreground dark:text-zinc-200 hover:bg-muted shrink-0"
          >
            Upgrade
          </Button>
        </div>

        {/* User Settings Dropdown Menu */}
        {showUserMenu && (
          <div
            className="absolute bottom-full left-0 right-0 z-50 mb-2 bg-card border border-border rounded-2xl shadow-xl p-1 space-y-0.5"
            onMouseLeave={() => setShowUserMenu(false)}
          >
            <div className="px-3 py-2 border-b border-zinc-100 dark:border-zinc-900">
              <p className="text-xs font-semibold text-foreground">{user.name}</p>
              <p className="text-[10px] text-muted-foreground truncate">{user.email}</p>
            </div>
            <button
              type="button"
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-zinc-700 dark:text-zinc-300 hover:bg-secondary dark:hover:bg-zinc-900"
            >
              <Settings className="w-3.5 h-3.5 text-muted-foreground" />
              <span>Settings</span>
            </button>
            <button
              type="button"
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-zinc-700 dark:text-zinc-300 hover:bg-secondary dark:hover:bg-zinc-900"
            >
              <Sparkles className="w-3.5 h-3.5 text-muted-foreground" />
              <span>Custom instructions</span>
            </button>
            <button
              type="button"
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-500" />
              <span>Log out</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default AiSidebar;
