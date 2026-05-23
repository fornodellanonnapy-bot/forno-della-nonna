import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { PizzaItem } from './PizzaCard';

interface FlavorModalProps {
  isOpen: boolean;
  onClose: () => void;
  beverage: PizzaItem | null;
  onConfirm: (beverage: PizzaItem) => void;
}

const FLAVOR_LIST = [
  { name: 'Coca-Cola Original', logo: '/coca_cola_fog.png' },
  { name: 'Coca-Cola Zero', logo: '/coca_zero_bottle.png' },
  { name: 'Fanta Naranja', logo: '/fanta_naranja_bottle.png' },
  { name: 'Fanta Guaraná', logo: '/fanta_guarana_bottle.png' },
  { name: 'Sprite', logo: '/sprite_bottle.png' }
];

export function FlavorModal({ isOpen, onClose, beverage, onConfirm }: FlavorModalProps) {
  const [selectedFlavor, setSelectedFlavor] = useState<typeof FLAVOR_LIST[0]>(FLAVOR_LIST[0]);

  useEffect(() => {
    if (isOpen) {
      setSelectedFlavor(FLAVOR_LIST[0]);
    }
  }, [isOpen, beverage]);

  if (!isOpen || !beverage) return null;

  const handleConfirm = () => {
    const updatedBeverage = {
      ...beverage,
      name: `${beverage.name} (${selectedFlavor.name})`,
      image: selectedFlavor.logo
    };
    onConfirm(updatedBeverage);
    onClose();
  };

  return (
    <div 
      onClick={onClose} 
      style={{ 
        position: 'fixed', 
        inset: 0, 
        backgroundColor: 'rgba(0,0,0,0.8)', 
        zIndex: 200, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '1rem'
      }}
    >
      <div 
        className="modal-content" 
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '450px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
          background: 'var(--surface)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid rgba(255, 94, 0, 0.15)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(26, 29, 36, 0.95)' }}>
          <h2 style={{ fontSize: '1.5rem', margin: 0, color: 'white' }}>Seleccionar Sabor</h2>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div style={{ padding: '1.5rem', overflowY: 'auto', flexGrow: 1, background: 'rgba(10, 11, 13, 0.85)' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-md)', transition: 'all 0.3s ease' }}>
             <img src={selectedFlavor.logo} alt={beverage.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.3)', transition: 'all 0.3s ease' }} />
             <div>
               <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', color: 'white' }}>{beverage.name}</h3>
               <p style={{ margin: 0, color: 'var(--text-muted)' }}>Precio: <strong style={{ color: 'var(--primary)', fontSize: '1.1rem' }}>{beverage.price.toLocaleString('es-PY')} Gs.</strong></p>
               <p style={{ margin: '0.25rem 0 0 0', color: 'white', fontWeight: 600 }}>{selectedFlavor.name}</p>
             </div>
          </div>

          <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem', color: 'white' }}>Elija la variedad:</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
            {FLAVOR_LIST.map(flavor => {
              const isSelected = selectedFlavor.name === flavor.name;
              return (
                <label 
                  key={flavor.name}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    background: isSelected ? 'rgba(255, 94, 0, 0.1)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${isSelected ? 'var(--primary)' : 'rgba(255,255,255,0.05)'}`,
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onClick={() => setSelectedFlavor(flavor)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      border: `2px solid ${isSelected ? 'var(--primary)' : 'rgba(255,255,255,0.2)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'transparent',
                      transition: 'all 0.2s ease'
                    }}>
                      {isSelected && <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--primary)' }} />}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img src={flavor.logo} alt={flavor.name} style={{ width: '32px', height: '32px', objectFit: 'cover', borderRadius: '5px' }} />
                      <span style={{ color: 'white', fontWeight: isSelected ? 600 : 400 }}>{flavor.name}</span>
                    </div>
                  </div>
                </label>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255, 94, 0, 0.2)', background: 'rgba(26, 29, 36, 0.95)' }}>
          <button 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '1rem', fontSize: '1.125rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            onClick={handleConfirm}
          >
            Confirmar al Carrito
          </button>
        </div>
      </div>
    </div>
  );
}
