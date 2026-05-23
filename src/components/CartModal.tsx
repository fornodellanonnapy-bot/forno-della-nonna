import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { generateWhatsAppLink } from '../utils/whatsappGenerator';
import type { CartItem } from '../hooks/useCart';

interface CartModalProps {
  items: CartItem[];
  total: number;
  onClose: () => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

export function CartModal({ items, total, onClose, onRemove, onClear }: CartModalProps) {
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Efectivo');

  const handleOrder = () => {
    if (!address) {
      alert('Por favor ingrese una dirección de envío.');
      return;
    }
    const link = generateWhatsAppLink(items, total, address, paymentMethod);
    window.open(link, '_blank');
    onClear();
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.8)',
      zIndex: 100,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1rem'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '600px',
        maxHeight: '90vh',
        backgroundColor: 'var(--bg-dark)',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.7)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 'var(--radius-lg)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0 }}>Su Pedido</h2>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '0.875rem', transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'} onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
            Cerrar
          </button>
        </div>

        <div style={{ flexGrow: 1, overflowY: 'auto', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {items.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>El carrito está vacío.</p>
          ) : (
            items.map(item => (
              <div key={item.cartItemId} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '50%' }} />
                <div style={{ flexGrow: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1rem', color: 'white' }}>{item.name}</h4>
                      {item.toppings && item.toppings.length > 0 && (
                        <p style={{ margin: '0.25rem 0 0 0', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                          + {item.toppings.join(', ')}
                        </p>
                      )}
                    </div>
                    <button 
                      onClick={() => onRemove(item.cartItemId)}
                      style={{ 
                        background: '#dc2626', 
                        border: 'none', 
                        color: 'white', 
                        cursor: 'pointer', 
                        padding: '0.5rem',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background 0.2s'
                      }}
                      onMouseOver={e => e.currentTarget.style.background = '#b91c1c'}
                      onMouseOut={e => e.currentTarget.style.background = '#dc2626'}
                      title="Eliminar ítem"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Cant: {item.quantity}</span>
                    <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{(item.price * item.quantity).toLocaleString('es-PY')} Gs.</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div style={{ marginTop: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>
              <span>Total:</span>
              <span>{total.toLocaleString('es-PY')} Gs.</span>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Dirección de Envío:</label>
              <input 
                type="text" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Ej. Av. Mariscal López 1234"
                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', outline: 'none', fontFamily: 'inherit' }}
              />
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Método de Pago:</label>
              <select 
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', outline: 'none', fontFamily: 'inherit' }}
              >
                <option>Efectivo</option>
                <option>Transferencia Bancaria</option>
                <option>POS (Tarjeta al recibir)</option>
              </select>
            </div>

            <button className="btn btn-primary" style={{ width: '100%', padding: '1rem' }} onClick={handleOrder}>
              Confirmar por WhatsApp
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
