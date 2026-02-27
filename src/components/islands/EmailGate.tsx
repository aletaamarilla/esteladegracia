import { useState, useEffect } from 'react';

interface Resource {
  title: string;
  description: string;
  type: string;
  slug: string;
}

interface EmailGateProps {
  resources: Resource[];
}

const typeIcons: Record<string, string> = {
  pdf: '📄',
  audio: '🎧',
  video: '🎬',
  checklist: '✅',
};

const typeLabels: Record<string, string> = {
  pdf: 'PDF',
  audio: 'Audio',
  video: 'Video',
  checklist: 'Checklist',
};

export default function EmailGate({ resources }: EmailGateProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    const stored = localStorage.getItem('recursos_unlocked');
    if (stored === 'true') {
      setIsUnlocked(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');

    // Simulate API call — replace with actual email service (Brevo/Mailchimp)
    setTimeout(() => {
      localStorage.setItem('recursos_unlocked', 'true');
      localStorage.setItem('recursos_email', email);
      setIsUnlocked(true);
      setStatus('success');
    }, 800);
  };

  if (isUnlocked) {
    return (
      <div className="grid md:grid-cols-2 gap-6">
        {resources.map((resource) => (
          <div
            key={resource.slug}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-[#f6f3f5]"
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl">{typeIcons[resource.type] || '📦'}</span>
              <div className="flex-1">
                <span className="text-xs font-medium text-[#9591eb] uppercase tracking-wide">
                  {typeLabels[resource.type] || resource.type}
                </span>
                <h3 className="font-display text-lg text-[#5d5a5a] mt-1 mb-2">
                  {resource.title}
                </h3>
                <p className="text-sm text-[#5d5a5a]/60 leading-relaxed">
                  {resource.description}
                </p>
                <button
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#98465d] hover:underline"
                >
                  Descargar
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Blurred preview */}
      <div className="grid md:grid-cols-2 gap-6 blur-sm pointer-events-none select-none" aria-hidden="true">
        {resources.map((resource) => (
          <div
            key={resource.slug}
            className="bg-white rounded-2xl p-6 shadow-sm border border-[#f6f3f5]"
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl">{typeIcons[resource.type] || '📦'}</span>
              <div className="flex-1">
                <span className="text-xs font-medium text-[#9591eb] uppercase tracking-wide">
                  {typeLabels[resource.type] || resource.type}
                </span>
                <h3 className="font-display text-lg text-[#5d5a5a] mt-1 mb-2">
                  {resource.title}
                </h3>
                <p className="text-sm text-[#5d5a5a]/60 leading-relaxed">
                  {resource.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Email gate overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white rounded-3xl p-5 md:p-10 shadow-xl max-w-md w-full mx-4 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-[#98465d]/10 to-[#9591eb]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#98465d"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </div>

          <h3 className="font-display text-xl text-[#5d5a5a] mb-2">
            Recursos gratuitos
          </h3>
          <p className="text-sm text-[#5d5a5a]/60 mb-6">
            Deja tu email y accede a todos los recursos que he preparado para ti. Sin spam, lo prometo.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              className="w-full px-4 py-3 rounded-xl border border-[#cfcdff]/50 text-sm text-[#5d5a5a] placeholder:text-[#5d5a5a]/30 focus:outline-none focus:ring-2 focus:ring-[#9591eb]/30 focus:border-[#9591eb]"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-3 px-6 bg-[#98465d] text-white rounded-xl font-medium text-sm hover:bg-[#98465d]/90 transition-colors disabled:opacity-60"
            >
              {status === 'loading' ? 'Enviando...' : 'Quiero mis recursos'}
            </button>
          </form>

          {status === 'error' && (
            <p className="text-sm text-red-500 mt-3">
              Hubo un error. Intentalo de nuevo.
            </p>
          )}

          <p className="text-xs text-[#5d5a5a]/40 mt-4">
            Puedes darte de baja en cualquier momento.
          </p>
        </div>
      </div>
    </div>
  );
}
