import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchWikipedia = async () => {
    if (!query.trim()) {
      setError("Please enter a search term.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const response = await fetch(`https://wikipedia-app.onrender.com/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError('Failed to fetch results. Please try again.');
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchWikipedia();
    }
  };

  return (
    <div className="app">
      <div className="container">
        {/* Header */}
        <header className="header">
          <h1 className="title">
            <span className="wiki-icon">📚</span>
            Wikipedia Search
          </h1>
          <p className="subtitle">Discover knowledge from the world's largest encyclopedia</p>
        </header>

        {/* Search Section - Centered */}
        <div className="search-section">
          <div className="search-container">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search for articles, people, places..."
              className="search-input"
              disabled={loading}
            />
            <button 
              onClick={searchWikipedia} 
              className="search-button"
              disabled={loading || !query.trim()}
            >
              {loading ? (
                <span className="loading-spinner"></span>
              ) : (
                <span>🔍</span>
              )}
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        {/* Results Section */}
        <div className="results-section">
          {results.length > 0 && (
            <div className="results-header">
              <h2>Search Results ({results.length})</h2>
            </div>
          )}
          
          <div className="results-grid">
            {results.map((item, idx) => (
              <article key={idx} className="result-card">
                <div className="card-content">
                  <h3 className="result-title">{item.title}</h3>
                  <p className="result-summary">{item.summary}</p>
                  <div className="card-footer">
                    <a 
                      href={item.url || `https://en.wikipedia.org/wiki/${encodeURIComponent(item.title)}`} 
                      className="read-more"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read more on Wikipedia →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {!loading && results.length === 0 && query && !error && (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No results found</h3>
            <p>Try searching with different keywords</p>
          </div>
        )}
      </div>
    </div>
  );
}
