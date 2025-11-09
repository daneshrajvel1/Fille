import { useState } from "react";
import { X, Bell, Palette, Plug, Shield, Lock, User as UserIcon, Settings as SettingsIcon, Baby } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { Switch } from "./ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
  initialTab?: string;
}

const tabs = [
  { id: "general", label: "General", icon: SettingsIcon },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "personalization", label: "Personalization", icon: Palette },
  { id: "apps", label: "Apps & Connectors", icon: Plug },
  { id: "data", label: "Data Controls", icon: Shield },
  { id: "security", label: "Security", icon: Lock },
  { id: "parental", label: "Parental Controls", icon: Baby },
  { id: "account", label: "Account", icon: UserIcon },
];

export function SettingsModal({ open, onClose, initialTab = "general" }: SettingsModalProps) {
  const [activeTab, setActiveTab] = useState(initialTab);
  
  // Update active tab when initialTab changes
  useState(() => {
    if (open) {
      setActiveTab(initialTab);
    }
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl h-[80vh] bg-[#121212] border border-[#2A2A2A] p-0 rounded-[12px]">
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <DialogDescription className="sr-only">
          Manage your application settings and preferences
        </DialogDescription>
        <div className="flex h-full">
          {/* Tabs Sidebar */}
          <div className="w-64 border-r border-[#2A2A2A] p-4 space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-[#1E1E1E] text-white'
                      : 'text-[#A0A0A0] hover:bg-[#1E1E1E] hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-8">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-[#1E1E1E] text-[#A0A0A0] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <AnimatePresence mode="wait">
                {activeTab === "general" && (
                  <motion.div
                    key="general"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <h2 className="text-[#EAEAEA] mb-6">General Settings</h2>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[#A0A0A0]">Appearance</label>
                        <Select defaultValue="dark">
                          <SelectTrigger className="bg-[#181818] border-[#2A2A2A] text-[#EAEAEA]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#181818] border-[#2A2A2A]">
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[#A0A0A0]">Accent Color</label>
                        <Select defaultValue="purple">
                          <SelectTrigger className="bg-[#181818] border-[#2A2A2A] text-[#EAEAEA]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#181818] border-[#2A2A2A]">
                            <SelectItem value="purple">Purple</SelectItem>
                            <SelectItem value="blue">Blue</SelectItem>
                            <SelectItem value="green">Green</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[#A0A0A0]">Language</label>
                        <Select defaultValue="auto">
                          <SelectTrigger className="bg-[#181818] border-[#2A2A2A] text-[#EAEAEA]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#181818] border-[#2A2A2A]">
                            <SelectItem value="auto">Auto-detect</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[#A0A0A0]">Spoken Language</label>
                        <Select defaultValue="en-us">
                          <SelectTrigger className="bg-[#181818] border-[#2A2A2A] text-[#EAEAEA]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#181818] border-[#2A2A2A]">
                            <SelectItem value="en-us">English (US)</SelectItem>
                            <SelectItem value="en-gb">English (UK)</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[#A0A0A0]">Voice</label>
                      <div className="flex gap-2">
                        <Select defaultValue="nova">
                          <SelectTrigger className="bg-[#181818] border-[#2A2A2A] text-[#EAEAEA]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#181818] border-[#2A2A2A]">
                            <SelectItem value="nova">Nova</SelectItem>
                            <SelectItem value="echo">Echo</SelectItem>
                            <SelectItem value="sage">Sage</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button className="bg-[#5A5BEF] hover:bg-[#4A4BDF] text-white">
                          Play
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "personalization" && (
                  <motion.div
                    key="personalization"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <h2 className="text-[#EAEAEA] mb-6">Personalization</h2>

                    <div className="flex items-center justify-between p-4 bg-[#181818] border border-[#2A2A2A] rounded-[12px]">
                      <div>
                        <div className="text-[#EAEAEA]">Enable Customization</div>
                        <div className="text-[#A0A0A0]">Allow ChatGPT to learn from your conversations</div>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[#A0A0A0]">ChatGPT Personality</label>
                      <Select defaultValue="default">
                        <SelectTrigger className="bg-[#181818] border-[#2A2A2A] text-[#EAEAEA]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#181818] border-[#2A2A2A]">
                          <SelectItem value="default">Default</SelectItem>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="casual">Casual</SelectItem>
                          <SelectItem value="technical">Technical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[#A0A0A0]">Custom Instructions</label>
                      <Textarea
                        placeholder="What would you like ChatGPT to know about you?"
                        defaultValue="You are a helpful AI assistant. Be concise and accurate. When writing code, use modern best practices and include comments for clarity."
                        className="bg-[#181818] border-[#2A2A2A] text-[#EAEAEA] min-h-[120px] resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[#A0A0A0]">How should I call you?</label>
                      <Input
                        placeholder="Nickname"
                        defaultValue="Chief"
                        className="bg-[#181818] border-[#2A2A2A] text-[#EAEAEA]"
                      />
                      <p className="text-[#A0A0A0]">This will be used in greetings and throughout the conversation.</p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[#A0A0A0]">About You</label>
                      <Textarea
                        placeholder="Tell me about yourself, your work, interests..."
                        defaultValue="I'm a product designer working on SaaS applications. I value clean, minimal design and efficient workflows."
                        className="bg-[#181818] border-[#2A2A2A] text-[#EAEAEA] min-h-[80px] resize-none"
                      />
                    </div>
                  </motion.div>
                )}

                {activeTab === "notifications" && (
                  <motion.div
                    key="notifications"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <h2 className="text-[#EAEAEA] mb-6">Notification Settings</h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-[#181818] border border-[#2A2A2A] rounded-[12px]">
                        <div>
                          <div className="text-[#EAEAEA]">Email Notifications</div>
                          <div className="text-[#A0A0A0]">Receive updates via email</div>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-[#181818] border border-[#2A2A2A] rounded-[12px]">
                        <div>
                          <div className="text-[#EAEAEA]">Browser Notifications</div>
                          <div className="text-[#A0A0A0]">Get notified in your browser</div>
                        </div>
                        <Switch />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-[#181818] border border-[#2A2A2A] rounded-[12px]">
                        <div>
                          <div className="text-[#EAEAEA]">Sound Alerts</div>
                          <div className="text-[#A0A0A0]">Play sound for new messages</div>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-[#181818] border border-[#2A2A2A] rounded-[12px]">
                        <div>
                          <div className="text-[#EAEAEA]">Weekly Summary</div>
                          <div className="text-[#A0A0A0]">Receive weekly usage reports</div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "apps" && (
                  <motion.div
                    key="apps"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <h2 className="text-[#EAEAEA] mb-6">Apps & Connectors</h2>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { name: "Slack", description: "Connect your workspace", connected: true },
                        { name: "Google Drive", description: "Access your files", connected: false },
                        { name: "Notion", description: "Sync your notes", connected: true },
                        { name: "GitHub", description: "Link repositories", connected: false },
                      ].map((app) => (
                        <div
                          key={app.name}
                          className="p-4 bg-[#181818] border border-[#2A2A2A] rounded-[12px] hover:border-[#5A5BEF] transition-colors"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-[#EAEAEA]">{app.name}</h3>
                            <div className={`px-2 py-1 rounded text-xs ${
                              app.connected 
                                ? 'bg-[#5A5BEF]/20 text-[#5A5BEF]' 
                                : 'bg-[#2A2A2A] text-[#A0A0A0]'
                            }`}>
                              {app.connected ? 'Connected' : 'Available'}
                            </div>
                          </div>
                          <p className="text-[#A0A0A0] mb-3">{app.description}</p>
                          <Button 
                            className={`w-full ${
                              app.connected
                                ? 'bg-[#2A2A2A] hover:bg-[#1E1E1E] text-[#EAEAEA]'
                                : 'bg-[#5A5BEF] hover:bg-[#4A4BDF] text-white'
                            }`}
                          >
                            {app.connected ? 'Disconnect' : 'Connect'}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === "data" && (
                  <motion.div
                    key="data"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <h2 className="text-[#EAEAEA] mb-6">Data Controls</h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-[#181818] border border-[#2A2A2A] rounded-[12px]">
                        <div>
                          <div className="text-[#EAEAEA]">Chat History</div>
                          <div className="text-[#A0A0A0]">Save conversation history</div>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-[#181818] border border-[#2A2A2A] rounded-[12px]">
                        <div>
                          <div className="text-[#EAEAEA]">Improve Model</div>
                          <div className="text-[#A0A0A0]">Use my data to improve ChatGPT</div>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="p-4 bg-[#181818] border border-[#2A2A2A] rounded-[12px]">
                        <h3 className="text-[#EAEAEA] mb-2">Export Data</h3>
                        <p className="text-[#A0A0A0] mb-3">Download all your conversations and data</p>
                        <Button className="bg-[#5A5BEF] hover:bg-[#4A4BDF] text-white">
                          Export Data
                        </Button>
                      </div>

                      <div className="p-4 bg-[#181818] border border-red-900/50 rounded-[12px]">
                        <h3 className="text-red-400 mb-2">Delete All Data</h3>
                        <p className="text-[#A0A0A0] mb-3">Permanently delete all your conversations</p>
                        <Button className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-900">
                          Delete Everything
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "security" && (
                  <motion.div
                    key="security"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <h2 className="text-[#EAEAEA] mb-6">Security</h2>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-[#181818] border border-[#2A2A2A] rounded-[12px]">
                        <h3 className="text-[#EAEAEA] mb-2">Change Password</h3>
                        <p className="text-[#A0A0A0] mb-3">Update your account password</p>
                        <Button className="bg-[#5A5BEF] hover:bg-[#4A4BDF] text-white">
                          Change Password
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-[#181818] border border-[#2A2A2A] rounded-[12px]">
                        <div>
                          <div className="text-[#EAEAEA]">Two-Factor Authentication</div>
                          <div className="text-[#A0A0A0]">Add an extra layer of security</div>
                        </div>
                        <Switch />
                      </div>

                      <div className="p-4 bg-[#181818] border border-[#2A2A2A] rounded-[12px]">
                        <h3 className="text-[#EAEAEA] mb-2">Active Sessions</h3>
                        <p className="text-[#A0A0A0] mb-3">Manage devices logged into your account</p>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between py-2">
                            <div>
                              <div className="text-[#EAEAEA]">Current Session</div>
                              <div className="text-[#A0A0A0]">Chrome on MacOS</div>
                            </div>
                            <div className="text-[#5A5BEF]">Active</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "parental" && (
                  <motion.div
                    key="parental"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <h2 className="text-[#EAEAEA] mb-6">Parental Controls</h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-[#181818] border border-[#2A2A2A] rounded-[12px]">
                        <div>
                          <div className="text-[#EAEAEA]">Content Filtering</div>
                          <div className="text-[#A0A0A0]">Filter inappropriate content</div>
                        </div>
                        <Switch />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-[#181818] border border-[#2A2A2A] rounded-[12px]">
                        <div>
                          <div className="text-[#EAEAEA]">Safe Search</div>
                          <div className="text-[#A0A0A0]">Enable safe search mode</div>
                        </div>
                        <Switch />
                      </div>

                      <div className="p-4 bg-[#181818] border border-[#2A2A2A] rounded-[12px]">
                        <h3 className="text-[#EAEAEA] mb-2">Usage Limits</h3>
                        <p className="text-[#A0A0A0] mb-3">Set daily usage time limits</p>
                        <Input 
                          type="number"
                          placeholder="Hours per day"
                          className="bg-[#121212] border-[#2A2A2A] text-[#EAEAEA]"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "account" && (
                  <motion.div
                    key="account"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <h2 className="text-[#EAEAEA] mb-6">Account</h2>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-[#181818] border border-[#2A2A2A] rounded-[12px]">
                        <h3 className="text-[#EAEAEA] mb-4">Account Information</h3>
                        <div className="space-y-3">
                          <div>
                            <label className="text-[#A0A0A0]">Email</label>
                            <Input 
                              defaultValue="darshhrajwal@gmail.com"
                              className="bg-[#121212] border-[#2A2A2A] text-[#EAEAEA] mt-1"
                            />
                          </div>
                          <div>
                            <label className="text-[#A0A0A0]">Name</label>
                            <Input 
                              defaultValue="Darshh Rajwal"
                              className="bg-[#121212] border-[#2A2A2A] text-[#EAEAEA] mt-1"
                            />
                          </div>
                        </div>
                        <Button className="mt-4 bg-[#5A5BEF] hover:bg-[#4A4BDF] text-white">
                          Save Changes
                        </Button>
                      </div>

                      <div className="p-4 bg-[#181818] border border-[#2A2A2A] rounded-[12px]">
                        <h3 className="text-[#EAEAEA] mb-2">Subscription</h3>
                        <p className="text-[#A0A0A0] mb-1">Current Plan: Free</p>
                        <p className="text-[#A0A0A0] mb-3">Member since October 2024</p>
                        <Button className="bg-[#5A5BEF] hover:bg-[#4A4BDF] text-white">
                          Upgrade Plan
                        </Button>
                      </div>

                      <div className="p-4 bg-[#181818] border border-red-900/50 rounded-[12px]">
                        <h3 className="text-red-400 mb-2">Danger Zone</h3>
                        <p className="text-[#A0A0A0] mb-3">Permanently delete your account</p>
                        <Button className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-900">
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
