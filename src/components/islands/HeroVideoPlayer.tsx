import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import { HugIcon } from "@/components/icons/hug-icon"

export default function HeroVideoPlayer() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <>
      {/* Mobile Layout */}
      <div className="flex flex-col md:hidden h-full justify-center px-1">
        <div className="space-y-5 text-center">
          <div className="inline-flex items-center gap-2 bg-[#cfcdff]/40 px-4 py-2 rounded-full">
            <HugIcon className="w-4 h-4" fill="#98465d" />
            <span className="text-xs font-medium text-[#5d5a5a]">Un espacio seguro para ti</span>
          </div>

          <h1 className="font-display text-[1.75rem] leading-tight text-[#5d5a5a] text-balance">
            Psicologia <span className="text-[#98465d]">sin</span> distancia.{" "}
            <span className="block mt-1 text-[#9591eb]">Autentica, cercana y real.</span>
          </h1>

          <p className="font-serif text-sm text-[#5d5a5a]/80 leading-relaxed max-w-xs mx-auto">
            La terapia no tiene que sentirse fria. Aqui encontraras calidez, comprension y conexion genuina.
          </p>

          <div className="flex flex-col gap-3 px-4">
            <a href="/contacto">
              <Button
                className="w-full bg-[#98465d] hover:bg-[#98465d]/90 text-white rounded-full py-5 text-base font-medium shadow-lg"
              >
                Reservar cita
              </Button>
            </a>
            <a href="/sobre-mi">
              <Button
                variant="outline"
                className="w-full border-2 border-[#9591eb] text-[#9591eb] hover:bg-[#9591eb] hover:text-white rounded-full py-5 text-base font-medium bg-transparent"
              >
                Saber mas
              </Button>
            </a>
          </div>

          {/* Compact video card */}
          <div className="mx-2 mt-2">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-[#9591eb]/40 to-[#98465d]/40" />
              <div className="absolute inset-0 flex items-center justify-center bg-[#cfcdff]/30 backdrop-blur-sm">
                <div className="text-center space-y-2">
                  <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg mx-auto">
                    <Play className="w-6 h-6 text-[#98465d] ml-0.5" fill="#98465d" />
                  </div>
                  <p className="text-[#5d5a5a] font-medium text-xs">Conoceme en 2 minutos</p>
                </div>
              </div>
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md">
                <p className="text-[10px] text-[#5d5a5a]">
                  <span className="font-bold text-[#98465d]">500+</span> vidas transformadas
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex flex-col justify-center items-center h-full py-8">
        {/* Text Content */}
        <div className="space-y-6 text-center max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 bg-[#cfcdff]/40 px-4 py-2 rounded-full">
            <HugIcon className="w-4 h-4" fill="#98465d" />
            <span className="text-sm font-medium text-[#5d5a5a]">Un espacio seguro para ti</span>
          </div>

          <h1 className="font-display text-4xl lg:text-6xl text-[#5d5a5a] leading-tight text-balance">
            Psicologia <span className="text-[#98465d]">sin</span> distancia.{" "}
            <span className="block mt-2 text-[#9591eb]">Autentica, cercana y real.</span>
          </h1>

          <p className="text-lg text-[#5d5a5a]/80 max-w-xl mx-auto font-serif leading-relaxed">
            La terapia no tiene que sentirse fria. Aqui encontraras calidez, comprension y una conexion genuina.
          </p>

          <div className="flex flex-row gap-4 justify-center">
            <a href="/contacto">
              <Button
                size="lg"
                className="bg-[#98465d] hover:bg-[#98465d]/90 text-white rounded-full px-8 py-6 text-base font-medium transition-all hover:scale-105 hover:shadow-lg"
              >
                Comienza tu viaje
              </Button>
            </a>
            <a href="/sobre-mi">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-[#9591eb] text-[#9591eb] hover:bg-[#9591eb] hover:text-white rounded-full px-8 py-6 text-base font-medium transition-all bg-transparent"
              >
                Saber mas
              </Button>
            </a>
          </div>
        </div>

        {/* Video */}
        <div
          className="relative max-w-2xl w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className={`relative aspect-video rounded-3xl overflow-hidden shadow-xl transition-transform duration-700 ease-out ${isHovered ? 'scale-[1.02]' : ''}`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#9591eb]/40 to-[#98465d]/40" />
            <div className="absolute inset-0 flex items-center justify-center bg-[#cfcdff]/30 backdrop-blur-sm">
              <div className="text-center space-y-3">
                <div className={`w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg cursor-pointer transition-all duration-300 ${isHovered ? 'scale-110' : ''}`}>
                  <Play className="w-8 h-8 text-[#98465d] ml-1" fill="#98465d" />
                </div>
                <p className="text-[#5d5a5a] font-medium">Video de Presentacion</p>
              </div>
            </div>

            <div className={`absolute top-4 right-4 w-12 h-12 bg-[#98465d]/20 rounded-full transition-all duration-500 ${isHovered ? 'translate-y-2' : ''}`} />
            <div className={`absolute bottom-6 left-4 w-8 h-8 bg-[#9591eb]/30 rounded-full transition-all duration-700 ${isHovered ? '-translate-y-2' : ''}`} />
          </div>

          <div className="absolute -bottom-4 -left-4 bg-white px-6 py-3 rounded-2xl shadow-lg">
            <p className="text-sm text-[#5d5a5a]">
              <span className="font-bold text-[#98465d]">500+</span> vidas transformadas
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
