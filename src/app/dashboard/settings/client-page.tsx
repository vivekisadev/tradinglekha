'use client';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { TextArea } from "@/components/base/textarea/textarea";
import { Avatar } from "@/components/base/avatar/avatar";

export function SettingsClientPage({ user }: { user: any }) {
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [mailingAddress, setMailingAddress] = useState(user?.mailingAddress || "");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, phoneNumber, bio, mailingAddress })
      });
      if (res.ok) {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in zoom-in-95 duration-500 pb-12">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your profile, mailing addresses, connection methods, and active trading accounts.</p>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto border-b border-border no-scrollbar">
        <div className="flex space-x-6 px-1">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`py-3 text-sm font-medium whitespace-nowrap transition-colors ${activeTab === 'profile' ? 'text-indigo-600 dark:text-indigo-500 border-b-2 border-indigo-500' : 'text-muted-foreground hover:text-foreground dark:text-muted-foreground dark:hover:text-zinc-200 border-b-2 border-transparent'}`}>
            Profile settings
          </button>
          <button 
            onClick={() => setActiveTab('accounts')}
            className={`py-3 text-sm font-medium whitespace-nowrap transition-colors ${activeTab === 'accounts' ? 'text-indigo-600 dark:text-indigo-500 border-b-2 border-indigo-500' : 'text-muted-foreground hover:text-foreground dark:text-muted-foreground dark:hover:text-zinc-200 border-b-2 border-transparent'}`}>
            Connected accounts
          </button>
          <button 
            onClick={() => setActiveTab('experience')}
            className={`py-3 text-sm font-medium whitespace-nowrap transition-colors ${activeTab === 'experience' ? 'text-indigo-600 dark:text-indigo-500 border-b-2 border-indigo-500' : 'text-muted-foreground hover:text-foreground dark:text-muted-foreground dark:hover:text-zinc-200 border-b-2 border-transparent'}`}>
            Share experience
          </button>
          <button 
            onClick={() => setActiveTab('feedback')}
            className={`py-3 text-sm font-medium whitespace-nowrap transition-colors ${activeTab === 'feedback' ? 'text-indigo-600 dark:text-indigo-500 border-b-2 border-indigo-500' : 'text-muted-foreground hover:text-foreground dark:text-muted-foreground dark:hover:text-zinc-200 border-b-2 border-transparent'}`}>
            User feedback
          </button>
          <button 
            onClick={() => setActiveTab('subscription')}
            className={`py-3 text-sm font-medium whitespace-nowrap transition-colors ${activeTab === 'subscription' ? 'text-indigo-600 dark:text-indigo-500 border-b-2 border-indigo-500' : 'text-muted-foreground hover:text-foreground dark:text-muted-foreground dark:hover:text-zinc-200 border-b-2 border-transparent'}`}>
            Subscription
          </button>
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`py-3 text-sm font-medium whitespace-nowrap transition-colors ${activeTab === 'notifications' ? 'text-indigo-600 dark:text-indigo-500 border-b-2 border-indigo-500' : 'text-muted-foreground hover:text-foreground dark:text-muted-foreground dark:hover:text-zinc-200 border-b-2 border-transparent'}`}>
            Notifications
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'profile' && (
            <div className="bg-card rounded-2xl border border-border shadow-sm p-8 space-y-8 relative overflow-hidden">
              
              {/* Avatar Section */}
              <div className="flex items-center gap-4">
                <Avatar src={user?.avatarUrl || "https://api.dicebear.com/7.x/notionists/svg?seed=Felix"} initials={user?.fullName?.substring(0,2) || "U"} size="xl" />
                <div>
                  <h2 className="text-lg font-bold text-foreground">{user?.fullName || "Trader"}</h2>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input 
                  label="Full Name" 
                  type="text" 
                  value={fullName}
                  onChange={setFullName} 
                />
                <Input 
                  label="Email Address" 
                  type="email" 
                  value={user?.email || ""} 
                  isDisabled
                />
                <div className="md:col-span-2">
                  <Input 
                    label="Phone Number" 
                    type="tel" 
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                  />
                </div>
                <div className="md:col-span-2">
                  <TextArea 
                    label="Bio"
                    rows={3}
                    value={bio}
                    onChange={setBio}
                    className="resize-none"
                  />
                </div>
              </div>

              {/* Mailing Address Section */}
              <div className="pt-6 border-t border-border">
                <h3 className="text-lg font-bold text-foreground mb-6">Mailing Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <Input 
                      label="Address Line 1" 
                      type="text" 
                      defaultValue="123 Trading St" 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Input 
                      label="Address Line 2" 
                      type="text" 
                      defaultValue="Suite, Apt, etc." 
                    />
                  </div>
                  <Select label="City" placeholder="Select a city">
                    <Select.Item id="NY" label="New York" />
                    <Select.Item id="LD" label="London" />
                    <Select.Item id="SF" label="San Francisco" />
                  </Select>
                  <Select label="Country" placeholder="Select a country">
                    <Select.Item id="US" label="United States" />
                    <Select.Item id="UK" label="United Kingdom" />
                    <Select.Item id="CA" label="Canada" />
                  </Select>
                </div>
              </div>

              <div className="pt-6 flex justify-end">
                <button 
                  onClick={handleSave}
                  className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${isSaved ? 'bg-emerald-500 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-500'}`}
                >
                  {isSaved ? 'Saved!' : '{isLoading ? "Saving..." : "Save Changes"}'}
                </button>
              </div>

            </div>
          )}

          {activeTab !== 'profile' && (
            <div className="bg-card rounded-2xl border border-border shadow-sm p-12 text-center">
              <h2 className="text-xl font-bold text-foreground mb-2 capitalize">{activeTab}</h2>
              <p className="text-muted-foreground">This section is currently in development.</p>
            </div>
          )}
        </motion.div>
      
          {activeTab === 'subscription' && (
            <div className="bg-card rounded-2xl border border-border shadow-sm p-8 space-y-8 relative overflow-hidden">
              <h3 className="text-xl font-bold text-foreground">Subscription & Billing</h3>
              <div className="p-6 border border-border rounded-xl bg-secondary/30">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-2">Current Plan</p>
                    <p className="text-3xl font-bold text-foreground mb-2">{user?.isPro ? 'Pro Tier' : 'Basic (Free)'}</p>
                    <p className="text-sm text-muted-foreground">
                      {user?.isPro 
                        ? 'You have access to all premium features, including AI Coach and Playbook.' 
                        : 'Upgrade to Pro to unlock AI Coach and custom Playbooks.'}
                    </p>
                  </div>
                  <div className="text-right w-full md:w-auto">
                    <a 
                      href="/pricing" 
                      className="inline-block w-full md:w-auto px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-bold transition-colors text-center"
                    >
                      {user?.isPro ? 'Manage Billing' : 'View Upgrade Options'}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>
    </div>
  );
}
