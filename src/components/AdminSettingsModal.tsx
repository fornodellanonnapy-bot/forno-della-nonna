import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export function AdminSettingsModal({ onClose }: { onClose: () => void }) {
  const { updateCredentials } = useAuth();
  
  // Asumimos que los actuales están en localStorage o son los default
  const [newUser, setNewUser] = useState(localStorage.getItem('admin_user') || 'admin');
  const [newPass, setNewPass] = useState(localStorage.getItem('admin_pass') || 'nonna2024');
  
  const handleSave = () => {
    updateCredentials(newUser, newPass);
    alert('Credenciales actualizadas correctamente.');
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.75)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(8px)',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'rgba(26,29,36,0.99)',
          border: '1px solid rgba(255,94,0,0.4)',
          borderRadius: '1.5rem',
          padding: '2rem',
          width: '100%',
          maxWidth: '380px',
          boxShadow: '0 25px 50px rgba(0,0,0,0.6)',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ color: 'white', margin: 0, fontSize: '1.3rem' }}>⚙️ Credenciales</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)',
              fontSize: '1.5rem', cursor: 'pointer', padding: 0, lineHeight: 1
            }}
          >×</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', display: 'block', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
              NUEVO USUARIO
            </label>
            <input
              type="text"
              value={newUser}
              onChange={e => setNewUser(e.target.value)}
              style={{
                width: '100%', boxSizing: 'border-box',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,94,0,0.3)',
                borderRadius: '0.75rem',
                padding: '0.75rem 1rem',
                color: 'white',
                fontSize: '1rem',
                outline: 'none',
              }}
            />
          </div>

          <div>
            <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', display: 'block', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
              NUEVA CONTRASEÑA
            </label>
            <input
              type="text"
              value={newPass}
              onChange={e => setNewPass(e.target.value)}
              style={{
                width: '100%', boxSizing: 'border-box',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,94,0,0.3)',
                borderRadius: '0.75rem',
                padding: '0.75rem 1rem',
                color: 'white',
                fontSize: '1rem',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button
              onClick={onClose}
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.08)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '0.75rem',
                padding: '0.75rem',
                fontSize: '0.95rem',
                cursor: 'pointer',
              }}
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              style={{
                flex: 1,
                background: 'var(--primary)',
                color: 'white',
                border: 'none',
                borderRadius: '0.75rem',
                padding: '0.75rem',
                fontSize: '0.95rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
