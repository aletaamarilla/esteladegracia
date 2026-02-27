import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react"
import { HugIcon } from "@/components/icons/hug-icon"

const navLinks = [
  { label: "Sobre Mi", href: "/sobre-mi" },
  {
    label: "Servicios",
    href: "/servicios",
    children: [
      { label: "Terapia Individual", href: "/servicios/terapia-individual" },
      { label: "Terapia Grupal", href: "/servicios/terapia-grupal" },
    ],
  },
  { label: "Testimonios", href: "/testimonios" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contacto", href: "/contacto" },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [mobileReady, setMobileReady] = useState(false)
  const [currentPath, setCurrentPath] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      requestAnimationFrame(() => setMobileReady(true))
    } else {
      setMobileReady(false)
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const isActive = (href: string) => {
    if (href === "/") return currentPath === "/"
    return currentPath.startsWith(href)
  }

  const closeMobile = () => {
    setMobileReady(false)
    setTimeout(() => setIsOpen(false), 300)
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f6f3f5]/80 backdrop-blur-lg border-b border-[#cfcdff]/30">
        <div className="container mx-auto px-5">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-[#98465d] to-[#9591eb] rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-md group-hover:shadow-lg group-hover:shadow-[#98465d]/25">
                <HugIcon className="w-7 h-7" fill="white" />
              </div>
              <span className="font-display text-[#5d5a5a] tracking-wide text-base sm:text-lg">
                Estela <span className="text-[#98465d]">de Gracia</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) =>
                link.children ? (
                  <div
                    key={link.label}
                    ref={dropdownRef}
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <a
                      href={link.href}
                      className={`flex items-center gap-1 font-medium transition-all duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-gradient-to-r after:from-[#98465d] after:to-[#9591eb] after:transition-all after:duration-300 ${
                        isActive(link.href)
                          ? "text-[#98465d] after:w-full"
                          : "text-[#5d5a5a] hover:text-[#98465d] after:w-0 hover:after:w-full"
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                      />
                    </a>

                    {servicesOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                        <div className="bg-white rounded-2xl shadow-xl border border-[#cfcdff]/30 py-2 min-w-[220px]">
                          {link.children.map((child) => (
                            <a
                              key={child.label}
                              href={child.href}
                              className={`block px-5 py-3 text-sm font-medium transition-colors ${
                                isActive(child.href)
                                  ? "text-[#98465d] bg-[#f6f3f5]"
                                  : "text-[#5d5a5a] hover:text-[#98465d] hover:bg-[#f6f3f5]"
                              }`}
                            >
                              {child.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className={`font-medium transition-all duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-gradient-to-r after:from-[#98465d] after:to-[#9591eb] after:transition-all after:duration-300 ${
                      isActive(link.href)
                        ? "text-[#98465d] after:w-full"
                        : "text-[#5d5a5a] hover:text-[#98465d] after:w-0 hover:after:w-full"
                    }`}
                  >
                    {link.label}
                  </a>
                )
              )}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <a href="/contacto">
                <Button className="hover-shimmer bg-[#98465d] hover:bg-[#98465d]/90 text-white rounded-full px-6 hover:shadow-lg hover:shadow-[#98465d]/25 transition-all duration-300">
                  Reservar
                </Button>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden w-11 h-11 flex items-center justify-center text-[#98465d] rounded-2xl hover:bg-[#98465d]/8 active:scale-95 transition-all"
              onClick={() => setIsOpen(true)}
              aria-label="Abrir menu"
            >
              <Menu className="w-6 h-6 stroke-[2]" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-[100]">
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${mobileReady ? "opacity-100" : "opacity-0"}`}
            onClick={closeMobile}
          />

          {/* Panel */}
          <div
            className={`absolute top-0 right-0 bottom-0 w-[85%] max-w-sm bg-gradient-to-b from-[#f6f3f5] via-[#f6f3f5] to-[#f4eced] shadow-2xl transition-transform duration-300 ease-out ${
              mobileReady ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Decorative blob */}
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#98465d]/[0.04] rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/3 right-0 w-32 h-32 bg-[#9591eb]/[0.06] rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between px-6 h-20 border-b border-[#cfcdff]/20">
              <a href="/" className="flex items-center gap-2.5" onClick={closeMobile}>
                <div className="w-9 h-9 bg-gradient-to-br from-[#98465d] to-[#9591eb] rounded-full flex items-center justify-center shadow-sm">
                  <HugIcon className="w-6 h-6" fill="white" />
                </div>
                <span className="font-display text-[#5d5a5a] text-[15px]">
                  Estela <span className="text-[#98465d]">de Gracia</span>
                </span>
              </a>
              <button
                className="w-10 h-10 flex items-center justify-center text-[#5d5a5a]/60 rounded-xl hover:bg-[#98465d]/8 hover:text-[#98465d] active:scale-95 transition-all"
                onClick={closeMobile}
                aria-label="Cerrar menu"
              >
                <X className="w-5 h-5 stroke-[2]" />
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-col px-6 pt-6 pb-4 relative overflow-y-auto" style={{ maxHeight: "calc(100dvh - 80px)" }}>
              <nav className="flex flex-col gap-0.5">
                {navLinks.map((link, i) =>
                  link.children ? (
                    <div key={link.label}>
                      <div className="flex items-center">
                        <a
                          href={link.href}
                          onClick={closeMobile}
                          className={`flex-1 flex items-center gap-3 px-4 py-3.5 rounded-2xl text-[17px] font-medium transition-all duration-200 ${
                            isActive(link.href)
                              ? "text-[#98465d] bg-[#98465d]/[0.06]"
                              : "text-[#5d5a5a] hover:text-[#98465d] hover:bg-[#98465d]/[0.04]"
                          }`}
                          style={{ transitionDelay: `${i * 40}ms`, opacity: mobileReady ? 1 : 0, transform: mobileReady ? "translateX(0)" : "translateX(12px)" }}
                        >
                          {isActive(link.href) && (
                            <span className="w-1 h-5 bg-gradient-to-b from-[#98465d] to-[#9591eb] rounded-full" />
                          )}
                          {link.label}
                        </a>
                        <button
                          onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                          aria-label="Ver submenú de servicios"
                          className="w-10 h-10 flex items-center justify-center text-[#5d5a5a]/40 hover:text-[#98465d] rounded-xl hover:bg-[#98465d]/[0.04] transition-all"
                        >
                          <ChevronDown
                            className={`w-4.5 h-4.5 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
                          />
                        </button>
                      </div>

                      <div
                        className={`overflow-hidden transition-all duration-200 ${mobileServicesOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
                      >
                        <div className="ml-4 pl-4 border-l-2 border-[#cfcdff]/30 flex flex-col gap-0.5 py-1">
                          {link.children.map((child) => (
                            <a
                              key={child.label}
                              href={child.href}
                              onClick={closeMobile}
                              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[15px] transition-all duration-200 ${
                                isActive(child.href)
                                  ? "text-[#98465d] font-medium bg-[#98465d]/[0.05]"
                                  : "text-[#5d5a5a]/70 hover:text-[#98465d] hover:bg-[#98465d]/[0.04]"
                              }`}
                            >
                              <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                              {child.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={closeMobile}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-[17px] font-medium transition-all duration-200 ${
                        isActive(link.href)
                          ? "text-[#98465d] bg-[#98465d]/[0.06]"
                          : "text-[#5d5a5a] hover:text-[#98465d] hover:bg-[#98465d]/[0.04]"
                      }`}
                      style={{ transitionDelay: `${i * 40}ms`, opacity: mobileReady ? 1 : 0, transform: mobileReady ? "translateX(0)" : "translateX(12px)" }}
                    >
                      {isActive(link.href) && (
                        <span className="w-1 h-5 bg-gradient-to-b from-[#98465d] to-[#9591eb] rounded-full" />
                      )}
                      {link.label}
                    </a>
                  )
                )}
              </nav>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-[#cfcdff]/30 via-[#98465d]/10 to-transparent my-5 mx-4" />

              {/* CTA */}
              <a href="/contacto" onClick={closeMobile} className="block">
                <Button className="w-full bg-[#98465d] hover:bg-[#98465d]/90 text-white rounded-2xl py-6 text-base font-medium shadow-lg shadow-[#98465d]/15 transition-all duration-300 hover:shadow-xl">
                  Reservar Cita
                </Button>
              </a>

              <p className="text-center text-[13px] text-[#5d5a5a]/40 font-serif italic mt-5">
                Un espacio seguro para ti
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
