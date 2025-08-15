import React, {useState} from 'react';

export default function App(){
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchWikipedia = async () => {
    if(!query){
      setError("Please enter a search term.");
      return;
    }
    setError("");
    setLoading(true);
    try{
      const response = await fetch(`http://127.0.0.1:5000/search?q=${encodeURIComponent(query)}`);

      const data = await response.json();
      setResults(data);
    } catch(err) {
      setError('Failed to fetch results');
    }
    setLoading(false);
  };

  return (
    <div>
          <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Wikipedia Search</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter search term..."
        style={{ padding: "10px", width: "300px" }}
      />
      <button onClick={searchWikipedia} style={{ padding: "10px", marginLeft: "10px" }}>
        Search
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {results.map((item, idx) => (
          <li key={idx} style={{ margin: "10px 0" }}>
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
    </div>
  );
}