import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Templates from "./pages/Templates";
import Builder from "./pages/Builder";
import Preview from "./pages/Preview";

// =====================================================
// BUILDCV — INITIAL CV FORM STATE
// =====================================================
const initialCvData = {
  personal: {
    fullName: "John Doe",
    jobTitle: "Software Engineer",
    email: "john.doe@example.com",
    phone: "+1 (555) 000-0000",
    location: "New York, NY",
    linkedin: "linkedin.com/in/johndoe",
    github: "github.com/johndoe",
    summary: "Driven software developer with experience in React and modern web development.",
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
  certifications: { enabled: false, items: [] },
  languages: { enabled: false, items: [] },
  achievements: { enabled: false, items: [] },
  references: { enabled: false, items: [] },
  interests: { enabled: false, value: "" },
};

function App() {
  // All useState hooks MUST be defined at the top of the function component
  const [cvData, setCvData] = useState(initialCvData);
  const [activeTab, setActiveTab] = useState('editor'); // Track active tab on mobile screens: 'editor' or 'preview'

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      {/* Navigation Header */}
      <Navbar />

      {/* Main App Routes */}
      <div className="flex-1">
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Templates Selection */}
          <Route path="/templates" element={<Templates />} />

          {/* Resume Builder (with mobile tab switcher passed as props) */}
          <Route
            path="/builder"
            element={
              <Builder
                cvData={cvData}
                setCvData={setCvData}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            }
          />

          {/* Resume Preview */}
          <Route
            path="/preview"
            element={<Preview cvData={cvData} />}
          />

          {/* Fallback for unknown routes */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;