import React, { useState } from "react";

const data = [
  {
    name: "movie 1",
    movies: {
      name: "testmovie 2",
      movies: {
        name: "movie 2",
        movies: {
          name: "spamtestmovie 2",
          movies: { name: "Appspamtestmovie 2" },
        },
      },
    },
  },
  {
    name: "movie 3",
    movies: {
      name: "testmovie 2",
      movies: {
        name: "movie 4",
        movies: {
          name: "spamtestmovie 3",
          movies: { name: "Appspamtestmovie 3" },
        },
      },
    },
  },
];

const flatten = (items, d = 0) =>
  items.reduce((a, i, x) => {
    a.push({ ...i, depth: d, id: `${d}-${x}` });
    if (i.movies) a.push(...flatten([i.movies], d + 1));
    return a;
  }, []);

const Highlight = ({ text, q }) => {
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  return idx === -1 ? (
    text
  ) : (
    <>
      {text.slice(0, idx)}
      <mark>{text.slice(idx, idx + q.length)}</mark>
      {text.slice(idx + q.length)}
    </>
  );
};

export default function App() {
  const [q, setQ] = useState("");
  const flat = flatten(data);
  const filtered =
    q.length >= 3
      ? flat.filter((i) => i.name.toLowerCase().includes(q.toLowerCase()))
      : [];
  return (
    <>
      <div className="app">
        <h2>Search Movies</h2>
        <input
          className="input"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Type 3+ letters..."
        />
        {q.length >= 3 && (
          <>
            <div className="status">
              ✓ Found {filtered.length} results for "{q}"
            </div>
            {filtered.length === 0 ? (
              <p className="empty">No results</p>
            ) : (
              filtered.map((i) => (
                <div
                  key={i.id}
                  className="item"
                  style={{ paddingLeft: 10 + i.depth * 20 }}
                >
                  <span className="depth">L{i.depth} </span>
                  <Highlight text={i.name} q={q} />
                </div>
              ))
            )}
          </>
        )}
      </div>
    </>
  );
}
