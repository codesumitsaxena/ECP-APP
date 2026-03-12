import { useState } from "react";
import LoginScreen from "./screens/LoginScreen.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import LearnScreen from "./screens/LearnScreen.jsx";
import TrainScreen from "./screens/TrainScreen.jsx";
import CasesScreen from "./screens/CasesScreen.jsx";
import SettingsScreen from "./screens/SettingsScreen.jsx";
import BottomNav from "./components/BottomNav.jsx";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  if (!loggedIn) {
    return (
      <div className="app-container">
        <LoginScreen onLogin={() => setLoggedIn(true)} />
      </div>
    );
  }

  const renderScreen = () => {
    switch (activeTab) {
      case "home": return <HomeScreen setActiveTab={setActiveTab} onResumeModule={() => setActiveTab("learn")} />;
      case "learn": return <LearnScreen />;
      case "train": return <TrainScreen />;
      case "cases": return <CasesScreen />;
      case "settings": return <SettingsScreen onLogout={() => { setLoggedIn(false); setActiveTab("home"); }} />;
      default: return <HomeScreen setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="max-w-sm mx-auto min-h-screen bg-[#EEF2F7] relative overflow-x-hidden">
      <div className="w-full pb-20">
        {renderScreen()}
      </div>
      <BottomNav active={activeTab} setActive={setActiveTab} />
    </div>
  );
}