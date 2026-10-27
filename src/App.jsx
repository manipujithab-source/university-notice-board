
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [notices, setNotices] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/notices")
      .then((response) => response.json())
      .then((data) => setNotices(data))
      .catch((error) => console.error(error));
  }, []);

  const filteredNotices = notices.filter((notice) =>
    notice.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <header>
        <h1>🎓 University Notice Board</h1>
        <p>Your one-stop place for campus updates</p>
      </header>

      <main>
        <h2>Latest Announcements</h2>

        <input
          type="text"
          placeholder="Search notices..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="notices">
          {filteredNotices.map((notice) => (
            <div className="notice" key={notice.id}>
              <span>{notice.category}</span>
              <h3>{notice.title}</h3>
              <p>{notice.description}</p>
              <small>Date: {notice.date}</small>
            </div>
          ))}

          {filteredNotices.length === 0 && (
            <p>No notices found.</p>
          )}
        </div>
      </main>

      <footer>© University Notice Board</footer>
    </div>
  );
}

export default App;
