import { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import type { PizzaItem } from './PizzaCard';

interface ToppingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  pizza: PizzaItem | null;
  onConfirm: (pizza: PizzaItem, toppings: string[]) => void;
}

const TOPPINGS_LIST = [
  'Extra Queso',
  'Pepperoni',
  'Albahaca',
  'Tomate',
  'Catupiry',
  'Jamón Crudo',
  'Jamón Cocido',
  'Aceitunas Negras',
  'Aceitunas Verdes',
  'Champiñón',
  'Panceta',
  'Carne Picada',
  'Cebolla'
];

const FRIES_TOPPINGS_LIST = [
  'Panceta',
  'Cheddar'
];

const TOPPING_PRICE = 7000;

export function ToppingsModal({ isOpen, onClose, pizza, onConfirm }: ToppingsModalProps) {
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      setSelectedToppings([]);
    }
  }, [isOpen, pizza]);

  if (!isOpen || !pizza) return null;

  const isFries = pizza.id.startsWith('papas_fritas');
  const toppingsList = isFries ? FRIES_TOPPINGS_LIST : TOPPINGS_LIST;

  const handleToggleTopping = (topping: string) => {
    setSelectedToppings(prev => 
      prev.includes(topping) 
        ? prev.filter(t => t !== topping)
        : [...prev, topping]
    );
  };

  const handleConfirm = () => {
    onConfirm(pizza, selectedToppings);
    onClose();
  };

  const finalPrice = pizza.price + (selectedToppings.length * TOPPING_PRICE);

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
          maxWidth: '500px',
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
          <h2 style={{ fontSize: '1.5rem', margin: 0, color: 'white' }}>
            {isFries ? 'Personalizar Papas' : 'Personalizar Pizza'}
          </h2>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div style={{ padding: '1.5rem', overflowY: 'auto', flexGrow: 1, background: 'rgba(10, 11, 13, 0.85)' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-md)' }}>
             <img src={pizza.image} alt={pizza.name} style={{ width: '110px', height: '110px', objectFit: 'cover', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }} />
             <div>
               <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', color: 'white' }}>{pizza.name}</h3>
               <p style={{ margin: 0, color: 'var(--text-muted)' }}>Precio base: <strong style={{ color: 'var(--primary)', fontSize: '1.1rem' }}>{pizza.price.toLocaleString('es-PY')} Gs.</strong></p>
             </div>
          </div>

          <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem', color: 'white' }}>
            {isFries ? '¿Desea agregar Adicionales?' : '¿Desea agregar Toppings Extra?'}
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
            {isFries 
              ? 'Personalice sus papas fritas. Cada ingrediente adicional suma 7.000 Gs.' 
              : 'Personalice su pizza. Cada ingrediente adicional suma 7.000 Gs.'}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {toppingsList.map(topping => {
              const isSelected = selectedToppings.includes(topping);
              return (
                <label 
                  key={topping}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem',
                    background: isSelected ? 'rgba(255, 94, 0, 0.1)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${isSelected ? 'var(--primary)' : 'rgba(255,255,255,0.05)'}`,
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '6px',
                      border: `2px solid ${isSelected ? 'var(--primary)' : 'rgba(255,255,255,0.2)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: isSelected ? 'var(--primary)' : 'transparent',
                      transition: 'all 0.2s ease'
                    }}>
                      <input 
                        type="checkbox" 
                        checked={isSelected} 
                        onChange={() => handleToggleTopping(topping)} 
                        style={{ display: 'none' }} 
                      />
                      {isSelected && <Check size={16} color="white" />}
                    </div>
                    <span style={{ color: 'white', fontWeight: isSelected ? 600 : 400 }}>{topping}</span>
                  </div>
                  <span style={{ color: 'var(--primary)' }}>+7.000 Gs.</span>
                </label>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255, 94, 0, 0.2)', background: 'rgba(26, 29, 36, 0.95)' }}>
          <button 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '1rem', fontSize: '1.125rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            onClick={handleConfirm}
          >
            <span>Confirmar Pedido</span>
            <span style={{ fontWeight: 800 }}>{finalPrice.toLocaleString('es-PY')} Gs.</span>
          </button>
        </div>
      </div>
    </div>
  );
}
