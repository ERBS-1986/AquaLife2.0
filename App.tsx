
import React, { useState, useEffect } from 'react';
import { UserProfile, WaterLog } from './types';
import { calculateHydrationGoal } from './utils/hydration';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

const App: React.FC = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [logs, setLogs] = useState<WaterLog[]>([]);
  const [view, setView] = useState<'login' | 'onboarding' | 'dashboard'>('login');

  useEffect(() => {
    const savedUser = localStorage.getItem('aqua_user');
    const savedProfile = localStorage.getItem('aqua_profile');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
        setView('dashboard');
      } else {
        setView('onboarding');
      }
    }
  }, []);

  const handleLogin = (userData: { name: string; email: string }) => {
    setUser(userData);
    localStorage.setItem('aqua_user', JSON.stringify(userData));
    setView('onboarding');
  };

  const handleSaveProfile = (newProfile: UserProfile) => {
    const goal = calculateHydrationGoal(newProfile);
    const finalProfile = { ...newProfile, lastCalculatedGoal: goal };
    setProfile(finalProfile);
    localStorage.setItem('aqua_profile', JSON.stringify(finalProfile));
    setView('dashboard');
  };

  const handleAddWater = (amount: number) => {
    const newLog: WaterLog = { id: crypto.randomUUID(), amount, timestamp: Date.now() };
    setLogs(prev => [...prev, newLog]);
  };

  const handleUpdateProfile = (updates: Partial<UserProfile>) => {
    if (profile) {
      const updated = { ...profile, ...updates };
      setProfile(updated);
      localStorage.setItem('aqua_profile', JSON.stringify(updated));
    }
  };

  return (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center p-0 sm:p-4">
      <div className={`w-full max-w-md ${profile?.themeColor || 'bg-slate-50'} min-h-screen sm:min-h-[850px] sm:rounded-[3rem] shadow-2xl flex flex-col overflow-hidden relative border-[8px] border-white`}>
        {view === 'login' && <Login onLogin={handleLogin} />}
        {view === 'onboarding' && <Onboarding onSave={handleSaveProfile} user={user} currentProfile={profile} />}
        {view === 'dashboard' && profile && (
          <Dashboard 
            profile={profile} logs={logs} 
            onAddWater={handleAddWater} 
            onLogout={() => setView('login')}
            onUpdateProfile={() => setView('onboarding')}
            onSaveProfile={handleUpdateProfile}
          />
        )}
      </div>
    </div>
  );
};

export default App;
