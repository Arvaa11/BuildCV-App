import React, { useState } from 'react';

export function BulletInput({ value, onChange, jobTitle }) {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const handleAiPolish = async () => {
    if (!value.trim()) return alert('Please enter a draft bullet point first.');
    
    setLoading(true);
    try {
      const res = await fetch('/api/enhance-bullet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ draftBullet: value, jobTitle }),
      });
      const data = await res.json();
      if (data.suggestions) {
        setSuggestions(data.suggestions);
      }
    } catch (err) {
      alert('Failed to connect to AI server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g., Led a team to build a new React dashboard..."
          className="flex-1 border p-2 rounded"
        />
        <button
          type="button"
          onClick={handleAiPolish}
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm font-medium"
        >
          {loading ? 'Thinking...' : '✨ AI Polish'}
        </button>
      </div>

      {/* Suggestion Dropdown/List */}
      {suggestions.length > 0 && (
        <div className="bg-purple-50 border border-purple-200 p-3 rounded space-y-2 text-sm">
          <p className="font-semibold text-purple-900">Select an AI suggestion:</p>
          {suggestions.map((option, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                onChange(option);
                setSuggestions([]);
              }}
              className="block w-full text-left p-2 bg-white hover:bg-purple-100 border rounded text-gray-800 transition"
            >
              • {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
