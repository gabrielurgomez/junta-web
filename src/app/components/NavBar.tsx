"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/entidad", label: "Entidad" },
  // { href: "/normatividad", label: "Normatividad" },
  // { href: "/dictamenes", label: "Dictámenes" },
  // { href: "/atencion-al-usuario", label: "Atención al usuario" },
  // { href: "/pagos", label: "Pagos" },
  // { href: "/contratacion", label: "Contratación" },
  { href: "/contacto", label: "Contacto" },
];

function NavBar() {
  const pathname = usePathname();
  const [menuMovilAbierto, setMenuMovilAbierto] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close mobile menu on route change
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMenuMovilAbierto(false);
  }

  // Prevent body scroll and manage keyboard accessibility when mobile menu is open
  useEffect(() => {
    if (!menuMovilAbierto) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    let focusableElements: HTMLElement[] = [];
    if (drawerRef.current) {
      focusableElements = Array.from(
        drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusableElements.length > 0) {
        // Enviar foco al primer elemento interactivo luego de un corto retardo para permitir pintado visual
        setTimeout(() => focusableElements[0].focus(), 50);
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuMovilAbierto(false);
        triggerRef.current?.focus();
        return;
      }

      if (e.key === "Tab" && focusableElements.length > 0) {
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
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
          <Image
            src="/imagenes/logo.webp"
            alt="Logo Junta Regional"
            width={40}
            height={40}
            className="navbar-logo-icon object-contain"
            priority
          />
          <div className="navbar-brand-text">
            <span className="navbar-brand-name">Junta Regional</span>
            <span className="navbar-brand-subtitle">
              Calificación de Invalidez de Santander
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
          ref={triggerRef}
          type="button"
          className="navbar-hamburger"
          aria-label={menuMovilAbierto ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuMovilAbierto}
          aria-controls="navbar-menu-movil"
          onClick={() => {
            if (menuMovilAbierto) triggerRef.current?.focus();
            setMenuMovilAbierto((prev) => !prev);
          }}
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
          onClick={() => {
            setMenuMovilAbierto(false);
            triggerRef.current?.focus();
          }}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer Menu */}
      <div
        id="navbar-menu-movil"
        ref={drawerRef}
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
            onClick={() => {
              setMenuMovilAbierto(false);
              triggerRef.current?.focus();
            }}
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
