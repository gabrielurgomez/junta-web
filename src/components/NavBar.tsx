"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/entidad", label: "Entidad" },
  { href: "/normatividad", label: "Normatividad" },
  { href: "/dictamenes", label: "Dictámenes" },
  { href: "/atencion-al-usuario", label: "Atención al usuario" },
  { href: "/pagos", label: "Pagos" },
  { href: "/contratacion", label: "Contratación" },
];

function NavBar() {
  const pathname = usePathname();
  const [menuMovilAbierto, setMenuMovilAbierto] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuMovilAbierto(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuMovilAbierto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuMovilAbierto]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="navbar" id="navbar-principal">
      <div className="navbar-container">
        {/* Logo & Entity Name */}
        <Link href="/" className="navbar-brand" aria-label="Ir al inicio">
          {/* Shield / institutional icon */}
          <svg
            className="navbar-logo-icon"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect width="40" height="40" rx="8" fill="#348ceb" />
            <path
              d="M20 8L10 13V19C10 25.05 14.26 30.68 20 32C25.74 30.68 30 25.05 30 19V13L20 8Z"
              fill="white"
              fillOpacity="0.9"
            />
            <path
              d="M20 10.5L12 14.5V19C12 24.05 15.58 28.78 20 30C24.42 28.78 28 24.05 28 19V14.5L20 10.5Z"
              fill="#348ceb"
            />
            <path
              d="M18 22.5L15.5 20L14.5 21L18 24.5L26 16.5L25 15.5L18 22.5Z"
              fill="white"
            />
          </svg>
          <div className="navbar-brand-text">
            <span className="navbar-brand-name">Junta Regional</span>
            <span className="navbar-brand-subtitle">
              Calificación de Invalidez
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="navbar-links-desktop">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`navbar-link ${isActive(link.href) ? "navbar-link-active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className="navbar-hamburger"
          aria-label={menuMovilAbierto ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuMovilAbierto}
          aria-controls="navbar-menu-movil"
          onClick={() => setMenuMovilAbierto((prev) => !prev)}
        >
          <div
            className={`hamburger-icon ${menuMovilAbierto ? "hamburger-icon-open" : ""}`}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>

      {/* Mobile Overlay */}
      {menuMovilAbierto && (
        <div
          className="navbar-overlay"
          onClick={() => setMenuMovilAbierto(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer Menu */}
      <div
        id="navbar-menu-movil"
        className={`navbar-drawer ${menuMovilAbierto ? "navbar-drawer-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
      >
        <div className="navbar-drawer-header">
          <span className="navbar-drawer-title">Navegación</span>
          <button
            type="button"
            className="navbar-drawer-close"
            aria-label="Cerrar menú"
            onClick={() => setMenuMovilAbierto(false)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="navbar-drawer-links">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`navbar-drawer-link ${isActive(link.href) ? "navbar-drawer-link-active" : ""}`}
              onClick={() => setMenuMovilAbierto(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="navbar-drawer-footer">
          <p>Junta Regional de Calificación de Invalidez de Santander</p>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
