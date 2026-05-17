import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  Mail, 
  FileSpreadsheet, 
  Video, 
  LogOut, 
  ShieldCheck, 
  ExternalLink, 
  Plus, 
  RefreshCw,
  Clock,
  User
} from 'lucide-react';
import { auth, googleSignIn, logout, getAccessToken } from '../lib/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

interface Event {
  id: string;
  summary: string;
  start: { dateTime?: string; date?: string };
}

interface Thread {
  id: string;
  snippet: string;
}

interface Sheet {
  id: string;
  name: string;
}

export default function WorkspaceDashboard() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'calendar' | 'gmail' | 'sheets' | 'meet'>('calendar');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (!u) {
        setAccessToken(null);
        setData(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setAccessToken(result.accessToken);
        fetchData(activeTab, result.accessToken);
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
    }
  };

  const handleSignOut = async () => {
    await logout();
    setUser(null);
    setAccessToken(null);
    setData(null);
  };

  const fetchData = async (tab: string, token: string | null = accessToken) => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      let url = '';
      if (tab === 'calendar') {
        url = 'https://www.googleapis.com/calendar/v3/calendars/primary/events?maxResults=5&orderBy=startTime&singleEvents=true&timeMin=' + new Date().toISOString();
      } else if (tab === 'gmail') {
        url = 'https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=5';
      } else if (tab === 'sheets') {
        url = 'https://www.googleapis.com/drive/v3/files?q=mimeType=\'application/vnd.google-apps.spreadsheet\'&pageSize=5';
      } else {
        setLoading(false);
        return;
      }

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();
      
      // For Gmail, we need to fetch details for each message
      if (tab === 'gmail' && result.messages) {
        const details = await Promise.all(
          result.messages.map(async (msg: any) => {
            const detailRes = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            return detailRes.json();
          })
        );
        setData(details);
      } else {
        setData(result);
      }
    } catch (err) {
      setError(`Failed to fetch ${tab} data. Your session may have expired.`);
    } finally {
      setLoading(false);
    }
  };

  const createMeet = async () => {
    if (!accessToken) return;
    setLoading(true);
    try {
      // Create a calendar event with conference data
      const event = {
        summary: 'Vishesh Portfolio - Strategy Session',
        description: 'Generated from Vishesh Jaiswal\'s Professional Portfolio',
        start: { dateTime: new Date().toISOString() },
        end: { dateTime: new Date(Date.now() + 3600000).toISOString() },
        conferenceData: {
          createRequest: {
            requestId: Math.random().toString(36).substring(7),
            conferenceSolutionKey: { type: 'hangoutsMeet' }
          }
        }
      };

      const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      });

      const result = await response.json();
      if (result.hangoutLink) {
        window.open(result.hangoutLink, '_blank');
      } else {
        throw new Error('Failed to create Meet link');
      }
    } catch (err) {
      setError('Failed to create Meet link. Please check your permissions.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken && user) {
      fetchData(activeTab);
    }
  }, [activeTab]);

  return (
    <section id="workspace" className="py-24 px-8 max-w-7xl mx-auto border-t border-white/5 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full bg-neon-blue/5 rounded-full blur-[160px] opacity-20 pointer-events-none" />

      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 relative z-10">
        <div className="text-center md:text-left">
          <p className="font-mono text-neon-blue text-xs uppercase tracking-[0.2em] mb-4">Integration</p>
          <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tighter">
            Workspace <span className="text-white/20 italic">Portal</span>
          </h2>
        </div>
        
        {user && (
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors"
          >
            <LogOut className="h-3 w-3" />
            Sign Out
          </button>
        )}
      </div>

      <div className="relative z-10 bg-white/[0.02] border border-white/10 rounded-[40px] p-8 md:p-12 backdrop-blur-xl min-h-[500px] flex flex-col">
        {!user ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-8 py-12">
            <div className="h-20 w-20 rounded-3xl bg-neon-blue/10 border border-neon-blue/20 flex items-center justify-center animate-pulse">
              <ShieldCheck className="h-10 w-10 text-neon-blue" />
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-display font-bold">Secure Access Needed</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                Log in with your Google account to access your workspace tools directly from this portfolio. I use restricted scopes to ensure your data stays private.
              </p>
            </div>
            
            <button 
              onClick={handleSignIn}
              className="gsi-material-button w-full sm:w-auto"
            >
              <div className="gsi-material-button-state"></div>
              <div className="gsi-material-button-content-wrapper">
                <div className="gsi-material-button-icon">
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ display: 'block' }}>
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                  </svg>
                </div>
                <span className="gsi-material-button-contents">Sign in with Google</span>
              </div>
            </button>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 p-1.5 bg-white/5 rounded-2xl w-fit mb-12">
              {[
                { id: 'calendar', label: 'Calendar', icon: Calendar },
                { id: 'gmail', label: 'Gmail', icon: Mail },
                { id: 'sheets', label: 'Sheets', icon: FileSpreadsheet },
                { id: 'meet', label: 'Meet', icon: Video },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-display font-medium transition-all ${
                    activeTab === tab.id 
                    ? 'bg-white text-black shadow-lg shadow-white/10' 
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1">
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div 
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex items-center justify-center py-20"
                  >
                    <RefreshCw className="h-8 w-8 text-neon-blue animate-spin" />
                  </motion.div>
                ) : error ? (
                  <motion.div 
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center py-20 space-y-4"
                  >
                    <div className="p-4 bg-red-500/10 rounded-full border border-red-500/20">
                      <Plus className="h-6 w-6 text-red-500 transform rotate-45" />
                    </div>
                    <p className="text-red-400 font-mono text-xs">{error}</p>
                    <button 
                      onClick={() => fetchData(activeTab)}
                      className="text-white/40 hover:text-white underline text-xs font-mono"
                    >
                      Try Again
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    {activeTab === 'calendar' && (
                      <div className="grid gap-4">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="text-xl font-display font-bold">Upcoming Agenda</h4>
                          <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Next 5 Events</span>
                        </div>
                        {data?.items?.length > 0 ? data.items.map((event: any) => (
                          <div key={event.id} className="group p-6 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all flex items-center justify-between">
                            <div className="flex items-center gap-6">
                              <div className="h-12 w-12 rounded-2xl bg-neon-blue/10 flex flex-col items-center justify-center border border-neon-blue/20">
                                <span className="text-[10px] font-mono text-neon-blue uppercase">
                                  {new Date(event.start.dateTime || event.start.date).toLocaleString('en-US', { month: 'short' })}
                                </span>
                                <span className="text-lg font-display font-bold text-white">
                                  {new Date(event.start.dateTime || event.start.date).getDate()}
                                </span>
                              </div>
                              <div>
                                <h5 className="font-display font-bold group-hover:text-neon-blue transition-colors">{event.summary || '(No Title)'}</h5>
                                <p className="text-xs text-white/40 font-mono mt-1 flex items-center gap-2">
                                  <Clock className="h-3 w-3" />
                                  {new Date(event.start.dateTime || event.start.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                              </div>
                            </div>
                            <ExternalLink className="h-4 w-4 text-white/10 group-hover:text-white transition-colors" />
                          </div>
                        )) : (
                          <p className="text-white/20 text-center py-12 font-mono text-xs italic">No upcoming events found.</p>
                        )}
                      </div>
                    )}

                    {activeTab === 'gmail' && (
                      <div className="grid gap-4">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="text-xl font-display font-bold">Recent Communications</h4>
                          <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">latest Threads</span>
                        </div>
                        {data?.length > 0 ? data.map((msg: any) => (
                          <div key={msg.id} className="group p-6 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all">
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-[8px] font-mono uppercase tracking-[0.2em] px-2 py-1 rounded bg-white/5 text-white/40">
                                {msg.labelIds?.includes('INBOX') ? 'Inbox' : 'Sent'}
                              </span>
                              <span className="text-[10px] font-mono text-white/20 italic">
                                {new Date(parseInt(msg.internalDate)).toLocaleDateString()}
                              </span>
                            </div>
                            <h5 className="font-display font-bold group-hover:text-neon-blue transition-colors truncate max-w-lg">
                              {msg.payload.headers.find((h: any) => h.name === 'Subject')?.value || '(No Subject)'}
                            </h5>
                            <p className="text-xs text-white/40 font-sans mt-2 line-clamp-1">{msg.snippet}</p>
                          </div>
                        )) : (
                          <p className="text-white/20 text-center py-12 font-mono text-xs italic">No messages found.</p>
                        )}
                      </div>
                    )}

                    {activeTab === 'sheets' && (
                      <div className="grid gap-4">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="text-xl font-display font-bold">Project Reports</h4>
                          <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Recent Spreadsheets</span>
                        </div>
                        {data?.files?.length > 0 ? data.files.map((file: any) => (
                          <a 
                            key={file.id} 
                            href={`https://docs.google.com/spreadsheets/d/${file.id}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group p-6 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all flex items-center justify-between"
                          >
                            <div className="flex items-center gap-4">
                              <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                                <FileSpreadsheet className="h-5 w-5 text-green-500" />
                              </div>
                              <h5 className="font-display font-bold group-hover:text-green-500 transition-colors">{file.name}</h5>
                            </div>
                            <ExternalLink className="h-4 w-4 text-white/10 group-hover:text-white transition-colors" />
                          </a>
                        )) : (
                          <p className="text-white/20 text-center py-12 font-mono text-xs italic">No spreadsheets found.</p>
                        )}
                        <button className="flex items-center justify-center gap-2 p-6 rounded-3xl border border-dashed border-white/10 hover:border-white/20 transition-all group">
                          <Plus className="h-4 w-4 text-white/20 group-hover:text-white" />
                          <span className="text-xs font-mono text-white/30 group-hover:text-white uppercase tracking-widest">New Spreadsheet</span>
                        </button>
                      </div>
                    )}

                    {activeTab === 'meet' && (
                      <div className="flex flex-col items-center justify-center py-12 space-y-8 text-center bg-white/[0.03] rounded-3xl border border-white/5">
                        <div className="h-24 w-24 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center relative">
                          <Video className="h-10 w-10 text-blue-500" />
                          <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping opacity-40" />
                        </div>
                        <div className="space-y-4 max-w-sm px-6">
                          <h3 className="text-2xl font-display font-bold">Instant Consultation</h3>
                          <p className="text-white/50 text-sm leading-relaxed font-sans">
                            Need a quick growth strategy alignment? Generate a secure Google Meet link and start a session instantly.
                          </p>
                        </div>
                        <button 
                          onClick={createMeet}
                          className="px-8 py-4 rounded-full bg-blue-500 text-white font-display font-bold flex items-center gap-3 hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/20"
                        >
                          <Plus className="h-5 w-5" />
                          Generate Meet Link
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>

      <style>{`
        .gsi-material-button {
          -moz-user-select: none;
          -webkit-user-select: none;
          -ms-user-select: none;
          -webkit-appearance: none;
          background-color: WHITE;
          background-image: none;
          border: 1px solid #747775;
          -webkit-border-radius: 20px;
          border-radius: 20px;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          color: #1f1f1f;
          cursor: pointer;
          font-family: 'Inter', arial, sans-serif;
          font-size: 14px;
          font-weight: 500;
          height: 40px;
          letter-spacing: 0.25px;
          outline: none;
          overflow: hidden;
          padding: 0 12px;
          position: relative;
          text-align: center;
          -webkit-transition: background-color .218s, border-color .218s, box-shadow .218s;
          transition: background-color .218s, border-color .218s, box-shadow .218s;
          vertical-align: middle;
          white-space: nowrap;
          width: auto;
          max-width: 400px;
          min-width: min-content;
        }

        .gsi-material-button .gsi-material-button-icon {
          height: 20px;
          margin-right: 12px;
          min-width: 20px;
          width: 20px;
        }

        .gsi-material-button .gsi-material-button-content-wrapper {
          -webkit-align-items: center;
          align-items: center;
          display: flex;
          -webkit-flex-direction: row;
          flex-direction: row;
          -webkit-flex-wrap: nowrap;
          flex-wrap: nowrap;
          height: 100%;
          justify-content: space-between;
          position: relative;
          width: 100%;
        }

        .gsi-material-button .gsi-material-button-contents {
          -webkit-flex-grow: 1;
          flex-grow: 1;
          font-family: 'Inter', arial, sans-serif;
          font-weight: 500;
          overflow: hidden;
          text-overflow: ellipsis;
          vertical-align: top;
        }

        .gsi-material-button .gsi-material-button-state {
          -webkit-transition: opacity .218s;
          transition: opacity .218s;
          bottom: 0;
          left: 0;
          opacity: 0;
          position: absolute;
          right: 0;
          top: 0;
        }

        .gsi-material-button:disabled {
          cursor: default;
          background-color: #ffffff61;
          border-color: #1f1f1f1f;
        }

        .gsi-material-button:disabled .gsi-material-button-contents {
          opacity: 38%;
        }

        .gsi-material-button:disabled .gsi-material-button-icon {
          opacity: 38%;
        }

        .gsi-material-button:not(:disabled):active .gsi-material-button-state, 
        .gsi-material-button:not(:disabled):focus .gsi-material-button-state {
          background-color: #303030;
          opacity: 12%;
        }

        .gsi-material-button:not(:disabled):hover {
          -webkit-box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .30), 0 1px 3px 1px rgba(60, 64, 67, .15);
          box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .30), 0 1px 3px 1px rgba(60, 64, 67, .15);
        }

        .gsi-material-button:not(:disabled):hover .gsi-material-button-state {
          background-color: #303030;
          opacity: 8%;
        }
      `}</style>
    </section>
  );
}
