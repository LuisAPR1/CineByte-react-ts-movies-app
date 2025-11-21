import React from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import NowPlaying from "./pages/NowPlaying";
import Popular from "./pages/Popular";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import { AuthProvider } from "./context/AuthContext";
import EditAccount from "./pages/EditAccount";
import SearchResults from "./pages/SearchResults";
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/Favorites";
import Suggestions from "./pages/Suggestions";

function App() {
  return (
    <AuthProvider>
      <Header />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/now_playing" element={<NowPlaying />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create_account" element={<CreateAccount />} />
          <Route path="/account" element={<EditAccount />} />
          <Route path="/suggestions" element={<Suggestions />} />
        </Routes>
      </main>
    </AuthProvider>
  );
}

export default App;
