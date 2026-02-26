import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Heart, ChevronDown } from "lucide-react"
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
  const [currentPath, setCurrentPath] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
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

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f6f3f5]/80 backdrop-blur-lg border-b border-[#cfcdff]/30">
        <div className="container mx-auto px-4">
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
            {!isOpen && (
              <button
                className="md:hidden w-12 h-12 flex items-center justify-center text-[#98465d] rounded-full hover:bg-[#cfcdff]/30 transition-colors"
                onClick={() => setIsOpen(true)}
                aria-label="Abrir menu"
              >
                <Menu className="w-7 h-7 stroke-[2.5]" />
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Full Screen Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-[100] overflow-hidden">
          <div className="absolute inset-0 bg-[#f6f3f5]" />

          {/* Floating Hearts Decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[
              { left: 8, size: 18, duration: 12, delay: 0, opacity: 0.12 },
              { left: 25, size: 22, duration: 14, delay: 2, opacity: 0.1 },
              { left: 45, size: 16, duration: 11, delay: 4, opacity: 0.14 },
              { left: 65, size: 20, duration: 13, delay: 1, opacity: 0.11 },
              { left: 85, size: 17, duration: 12, delay: 3, opacity: 0.13 },
              { left: 15, size: 19, duration: 14, delay: 5, opacity: 0.1 },
              { left: 55, size: 21, duration: 11, delay: 6, opacity: 0.12 },
              { left: 75, size: 15, duration: 13, delay: 7, opacity: 0.14 },
              { left: 92, size: 18, duration: 12, delay: 8, opacity: 0.11 },
            ].map((heart, index) => (
              <div
                key={index}
                className="absolute animate-float-up"
                style={{
                  left: `${heart.left}%`,
                  bottom: "-30px",
                  animationDelay: `${heart.delay}s`,
                  animationDuration: `${heart.duration}s`,
                }}
              >
                <Heart
                  className="text-[#98465d]"
                  fill={`rgba(152, 70, 93, ${heart.opacity})`}
                  style={{
                    width: heart.size,
                    height: heart.size,
                    opacity: heart.opacity,
                  }}
                />
              </div>
            ))}
          </div>

          {/* Close Button */}
          <button
            className="absolute top-6 right-4 w-12 h-12 flex items-center justify-center text-[#98465d] rounded-full hover:bg-[#cfcdff]/30 transition-colors z-10"
            onClick={() => setIsOpen(false)}
            aria-label="Cerrar menu"
          >
            <X className="w-8 h-8 stroke-[2.5]" />
          </button>

          {/* Navigation Content */}
          <div className="relative flex flex-col items-center justify-center h-full gap-4 px-8">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label} className="flex flex-col items-center">
                  <div className="flex items-center gap-2 py-2">
                    <a
                      href={link.href}
                      className="text-3xl text-[#5d5a5a] hover:text-[#98465d] transition-all duration-300 font-serif font-medium tracking-wide"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </a>
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      aria-label="Ver submenú de servicios"
                      className="text-[#5d5a5a] hover:text-[#98465d] transition-colors"
                    >
                      <ChevronDown
                        className={`w-6 h-6 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  </div>
                  {mobileServicesOpen && (
                    <div className="flex flex-col items-center gap-2 mt-1">
                      {link.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          className="text-xl text-[#5d5a5a]/80 hover:text-[#98465d] transition-colors font-serif"
                          onClick={() => setIsOpen(false)}
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-3xl text-[#5d5a5a] hover:text-[#98465d] transition-all duration-300 font-serif font-medium tracking-wide py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              )
            )}

            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#9591eb]/50 to-transparent my-2" />

            <a href="/contacto" onClick={() => setIsOpen(false)}>
              <Button className="bg-[#98465d] hover:bg-[#98465d]/90 text-white rounded-full px-12 py-7 text-lg font-medium mt-2 shadow-lg hover:shadow-xl transition-all duration-300">
                Reservar Cita
              </Button>
            </a>

            <p className="text-sm text-[#5d5a5a]/60 font-serif italic mt-6">
              Un espacio seguro para ti
            </p>
          </div>
        </div>
      )}
    </>
  )
}
