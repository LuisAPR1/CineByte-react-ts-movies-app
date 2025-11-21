import React, { useMemo, useState } from "react";
import axios from "axios";
import { bearerToken, getDiscoverMoviesUrl } from "../modules/ApiLinks";
import "../styles/SuggestionsStyle.css";

type Suggestion = {
  id: number;
  title?: string;
  name?: string;
  overview?: string;
  poster_path?: string | null;
  release_date?: string;
  vote_average?: number;
};

const genreOptions = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Horror" },
  { id: 878, name: "Sci-Fi" },
  { id: 10749, name: "Romance" },
];

const languageOptions = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "pt", label: "Portuguese" },
  { value: "ko", label: "Korean" },
  { value: "ja", label: "Japanese" },
];

const decadeOptions = [
  { value: "", label: "Any decade" },
  { value: "2020", label: "2020s" },
  { value: "2010", label: "2010s" },
  { value: "2000", label: "2000s" },
  { value: "1990", label: "1990s" },
  { value: "1980", label: "1980s" },
];

const Suggestions: React.FC = () => {
  const [genre, setGenre] = useState<string>("");
  const [decade, setDecade] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [highRated, setHighRated] = useState<boolean>(true);
  const [popularOnly, setPopularOnly] = useState<boolean>(true);
  const [familyFriendly, setFamilyFriendly] = useState<boolean>(false);
  const [surprise, setSurprise] = useState<Suggestion | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const decadeRange = useMemo(() => {
    if (!decade) return null;
    const start = Number(decade);
    const end = start + 9;
    return { start: `${start}-01-01`, end: `${end}-12-31` };
  }, [decade]);

  const fetchSuggestion = async () => {
    setLoading(true);
    setError(null);
    try {
      const options: Record<string, any> = {};
      if (genre) options.with_genres = genre;
      if (language) options.with_original_language = language;
      if (decadeRange) {
        options["primary_release_date.gte"] = decadeRange.start;
        options["primary_release_date.lte"] = decadeRange.end;
      }
      if (highRated) options["vote_average.gte"] = 7.2;
      if (popularOnly) options["vote_count.gte"] = 250;
      if (familyFriendly) {
        options.certification_country = "US";
        options["certification.lte"] = "PG-13";
      }

      const url = getDiscoverMoviesUrl(options);
      const randomPage = Math.floor(Math.random() * 5) + 1;
      const { data } = await axios.get(url, {
        params: { page: randomPage },
        headers: { Authorization: `Bearer ${bearerToken}` },
      });

      const results: Suggestion[] = data.results || [];
      if (!results.length) {
        setError("No movies found with those filters. Try adjusting your picks.");
        setSurprise(null);
      } else {
        const pick = results[Math.floor(Math.random() * results.length)];
        setSurprise(pick);
      }
    } catch (err) {
      console.error(err);
      setError("Couldn't fetch a suggestion right now. Please try again.");
      setSurprise(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="suggestions-page">
      <header className="suggestions-hero">
        <div>
          <p className="pill">Smart pick</p>
          <h1>Find a movie you'll actually like</h1>
          <p className="sub">
            Choose a vibe, decade, or language. We'll serve a random title that matches.
          </p>
        </div>
        <button className="primary" onClick={fetchSuggestion} disabled={loading}>
          {loading ? "Finding..." : "Surprise me"}
        </button>
      </header>

      <section className="suggestions-filters">
        <div className="filter-item">
          <label htmlFor="genre">Genre</label>
          <select id="genre" value={genre} onChange={(e) => setGenre(e.target.value)}>
            <option value="">Any genre</option>
            {genreOptions.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-item">
          <label htmlFor="decade">Decade</label>
          <select id="decade" value={decade} onChange={(e) => setDecade(e.target.value)}>
            {decadeOptions.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-item">
          <label htmlFor="language">Language</label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="">Any language</option>
            {languageOptions.map((l) => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-grid">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={highRated}
              onChange={(e) => setHighRated(e.target.checked)}
            />
            <span>Only well-rated (≥ 7.2)</span>
          </label>
          <label className="checkbox">
            <input
              type="checkbox"
              checked={popularOnly}
              onChange={(e) => setPopularOnly(e.target.checked)}
            />
            <span>Popular picks (vote count ≥ 250)</span>
          </label>
          <label className="checkbox">
            <input
              type="checkbox"
              checked={familyFriendly}
              onChange={(e) => setFamilyFriendly(e.target.checked)}
            />
            <span>Family-friendly (PG-13 or below)</span>
          </label>
        </div>
      </section>

      {error && <div className="suggestion-error">{error}</div>}

      {surprise && (
        <div className="suggestion-card">
          <div className="suggestion-img">
            <img
              src={
                surprise.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${surprise.poster_path}`
                  : "https://dummyimage.com/400x600/0b1024/ffffff&text=No+Image"
              }
              alt={surprise.title || surprise.name}
            />
          </div>
          <div className="suggestion-info">
            <p className="pill small">Suggested for you</p>
            <h2>{surprise.title || surprise.name}</h2>
            {surprise.vote_average && (
              <p className="rating-row">★ {surprise.vote_average.toFixed(1)}</p>
            )}
            <p className="overview">
              {surprise.overview || "No synopsis available for this title."}
            </p>
            <button className="primary ghost" onClick={fetchSuggestion} disabled={loading}>
              Try another
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Suggestions;
