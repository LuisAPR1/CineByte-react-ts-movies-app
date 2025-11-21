import React, { useContext, useEffect, useRef, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/HeaderStyle.css";
import logo from "../assets/cinebyte.png";

// Lista de itens para as tabs de navegação
const tabItems = [
  { name: "Home", link: "/" },
  { name: "Now Playing", link: "/now_playing" },
  { name: "Popular", link: "/popular" },
  { name: "Suggestions", link: "/suggestions" },
];

// Componente funcional Header
const Header: React.FC = () => {
  const { token, logout } = useContext(AuthContext); // Obtém o token e a função de logout do AuthContext
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Estado para controlar o menu dropdown
  const [navState, setNavState] = useState<"top" | "compact" | "hidden">("top");
  const lastScrollY = useRef(0);
  const navigate = useNavigate(); // Hook para redirecionamento de páginas

  // Função para abrir o menu ao clicar no ícone do utilizador
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Função para fechar o menu dropdown
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Função para realizar o logout
  const handleLogout = () => {
    logout(); // Chama a função de logout do contexto
    handleMenuClose(); // Fecha o menu
    navigate('/'); // Redireciona para a página inicial
  };

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const current = window.scrollY;
      const scrollingDown = current > lastScrollY.current + 6;
      const scrollingUp = current < lastScrollY.current - 6;

      if (current < 40) {
        setNavState("top");
      } else if (scrollingDown && current > 120) {
        setNavState("hidden");
      } else if (scrollingUp) {
        setNavState("compact");
      }

      lastScrollY.current = current;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="navBarWrapper">
      {/* Barra de navegação principal */}
      <AppBar
        position="fixed"
        elevation={0}
        className={`navBar ${navState === "hidden" ? "nav-hidden" : ""} ${navState !== "top" ? "nav-compact" : ""}`}
        sx={{
          background: "linear-gradient(120deg, rgba(6, 9, 20, 0.92), rgba(7, 12, 28, 0.88))",
          backdropFilter: "blur(18px)",
          borderBottom: "1px solid var(--border)",
          boxShadow: "0 20px 70px rgba(0,0,0,0.42)",
        }}
      >
        <Toolbar
          className="navToolbar"
          sx={{
            width: "min(1240px, 94vw)",
            mx: "auto",
            py: navState === "compact" ? 0.75 : 1.25,
          }}
        >
          {/* Logo que redireciona para a página inicial */}
          <div className="brand" onClick={() => navigate("/")}>
            <img src={logo} alt="CineByte" className="brandMark" />
            
          </div>

          {/* Links de navegação */}
          <nav className="navLinks">
            {tabItems.map((tab) => (
              <NavLink
                to={tab.link}
                key={tab.link}
                end={tab.link === "/"}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                {tab.name}
              </NavLink>
            ))}
          </nav>

          {/* Menu para utilizadors autenticados */}
          {token ? (
            <div className="navActions">
              {/* Ícone para abrir o menu do utilizador */}
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenuOpen}
                color="inherit"
                className="userButton"
              >
                <AccountCircle />
              </IconButton>

              {/* Menu dropdown com opções de favoritos, conta e logout */}
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                PaperProps={{
                  sx: {
                    backgroundColor: "rgba(6, 9, 20, 0.94)",
                    border: "1px solid var(--border)",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
                    borderRadius: "14px",
                    color: "#e9efff",
                  },
                }}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem
                  onClick={() => navigate("/favorites")}
                  sx={{
                    fontWeight: 600,
                    letterSpacing: "0.01em",
                    "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.06)" },
                  }}
                >
                  Favorite Movies
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/account");
                    handleMenuClose();
                  }}
                  sx={{
                    fontWeight: 600,
                    letterSpacing: "0.01em",
                    "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.06)" },
                  }}
                >
                  Account Settings
                </MenuItem>
                <MenuItem
                  onClick={handleLogout}
                  sx={{
                    fontWeight: 600,
                    letterSpacing: "0.01em",
                    "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.06)" },
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </div>
          ) : (
            // Botões para login e criação de conta para utilizadors não autenticados
            <div className="authButtons">
              <NavLink to="/login">
                <Button className="authButton ghost" variant="outlined">
                  Login
                </Button>
              </NavLink>
              <NavLink to="/create_account">
                <Button className="authButton">
                  Sign Up
                </Button>
              </NavLink>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
