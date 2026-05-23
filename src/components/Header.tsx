
interface HeaderProps {
  cartItemCount: number;
}

export function Header({ cartItemCount }: HeaderProps) {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(11, 12, 16, 0.65)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      padding: '1rem 0'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '2px solid var(--primary)',
            background: '#e4d2b9', // Color extraído del fondo del logo para rellenar
            flexShrink: 0
          }}>
            <img 
              src="/logo_nonna.png" 
              alt="Logo Forno Della Nonna" 
              style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'relative', zIndex: 1 }}
            />
            {/* Parche Noroeste para tapar restos de letras */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '35%', height: '65%', background: '#e4d2b9', zIndex: 2, clipPath: 'polygon(0 0, 100% 0, 0 100%)', pointerEvents: 'none' }}></div>
            {/* Parche Noreste para tapar restos de letras */}
            <div style={{ position: 'absolute', top: 0, right: 0, width: '35%', height: '65%', background: '#e4d2b9', zIndex: 2, clipPath: 'polygon(0 0, 100% 0, 100% 100%)', pointerEvents: 'none' }}></div>

            {/* Llama 1 Animada */}
            <div style={{
              position: 'absolute',
              top: '32%',
              left: '50%',
              width: '45px',
              height: '45px',
              background: 'radial-gradient(circle, rgba(255, 120, 0, 0.7) 0%, rgba(255, 60, 0, 0.2) 50%, transparent 80%)',
              mixBlendMode: 'color-dodge',
              pointerEvents: 'none',
              zIndex: 2,
              animation: 'danceFlicker 0.3s infinite alternate ease-in-out'
            }}></div>
            {/* Llama 2 Animada (Contrafase) */}
            <div style={{
              position: 'absolute',
              top: '34%',
              left: '50%',
              width: '35px',
              height: '35px',
              background: 'radial-gradient(circle, rgba(255, 200, 0, 0.8) 0%, transparent 60%)',
              mixBlendMode: 'color-dodge',
              pointerEvents: 'none',
              zIndex: 3,
              animation: 'danceFlicker 0.4s infinite alternate-reverse ease-in-out'
            }}></div>
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', margin: 0, lineHeight: 1.2 }}>Forno Della Nonna</h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--primary)', margin: 0, fontWeight: 600 }}>Auténtica Pizzería</p>
          </div>
        </div>
        
        {/* We can place a simple cart indicator here if we want */}
        {cartItemCount > 0 && (
          <div style={{
            background: 'var(--bg-card)',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(255,255,255,0.1)',
            fontSize: '0.875rem',
            fontWeight: 600
          }}>
            🛒 {cartItemCount}
          </div>
        )}
      </div>
    </header>
  );
}
