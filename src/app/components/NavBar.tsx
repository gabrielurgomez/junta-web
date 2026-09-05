"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import PanelVisualizacion from "@/app/components/PanelVisualizacion.client";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/entidad", label: "Entidad" },
  { href: "/normatividad", label: "Normatividad" },
  {
    href: "https://app.digitalmedic.co/consulta/JRCIS/calificacion",
    label: "Dictamenes",
    esExterno: true,
  },
  // { href: "/dictamenes", label: "Dictámenes" },
  // { href: "/atencion-al-usuario", label: "Atención al usuario" },
  { href: "/pagos", label: "Pagos" },
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
    /*
      El <header> aporta el landmark `banner`, que antes no existía, y es quien
      queda sticky: la barra debe poder crecer con el ajuste de tamaño de texto.

      El disparador de los ajustes va DENTRO de la cabecera pero FUERA del <nav>
      (no es navegación), en el extremo derecho. Su posición en el DOM coincide
      con la visual: colocarlo antes y moverlo con `order` dejaría el orden de
      lectura y el de tabulación en desacuerdo con lo que se ve (WCAG 1.3.2).
      Queda por tanto tras los enlaces en la tabulación; el skip link sigue
      siendo lo primero, así que nadie está obligado a recorrer el menú.

      Tampoco puede ir dentro del drawer: ese ya es un diálogo modal con su
      propia trampa de foco, y anidar otro haría que un solo Escape cerrase los
      dos y que el Tab devolviese el foco al drawer.
    */
    <header className="sitio-cabecera">
      <div className="cabecera-container">
        {/* Logo & Entity Name */}
        <Link href="/" className="navbar-brand" aria-label="Ir al inicio">
          {/* Shield / institutional icon */}
          {/* La altura se fija por CSS: el preflight de Tailwind aplica
              `height: auto` a los <img>, así que el atributo `height` no la
              controla. `h-12` son 3rem, de modo que el logo escala junto al
              resto; la cabecera usa `min-height` para acompañarlo. */}
          <Image
            src="/imagenes/logo.webp"
            alt="Logo Junta Regional"
            width={73}
            height={48}
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>

        <nav className="navbar" id="navbar-principal" aria-label="Principal">
          {/* Desktop Navigation Links */}
          <div className="navbar-links-desktop">
            {NAV_LINKS.map((link) =>
              link.esExterno ? (
                <a key={link.href} href={link.href} className="navbar-link">
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`navbar-link ${isActive(link.href) ? "navbar-link-active" : ""}`}
                >
                  {link.label}
                </Link>
              ),
            )}
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
        </nav>

        <PanelVisualizacion />
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
              aria-hidden="true"
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
          {NAV_LINKS.map((link) =>
            link.esExterno ? (
              <a
                key={link.href}
                href={link.href}
                className="navbar-drawer-link"
                onClick={() => setMenuMovilAbierto(false)}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`navbar-drawer-link ${isActive(link.href) ? "navbar-drawer-link-active" : ""}`}
                onClick={() => setMenuMovilAbierto(false)}
              >
                {link.label}
              </Link>
            ),
          )}
        </div>
        <div className="navbar-drawer-footer">
          <p>Junta Regional de Calificación de Invalidez de Santander</p>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
