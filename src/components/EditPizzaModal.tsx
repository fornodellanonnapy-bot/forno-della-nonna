import { useState } from 'react';
import type { PizzaItem } from './PizzaCard';

interface EditPizzaModalProps {
  pizza: PizzaItem;
  onSave: (updated: PizzaItem) => void;
  onClose: () => void;
}

export function EditPizzaModal({ pizza, onSave, onClose }: EditPizzaModalProps) {
  const [name, setName] = useState(pizza.name);
  const [description, setDescription] = useState(pizza.description);
  const [price, setPrice] = useState(pizza.price.toString());
  const [image, setImage] = useState(pizza.image);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave({ ...pizza, name, description, price: parseInt(price) || pizza.price, image });
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
          maxWidth: '460px',
          boxShadow: '0 25px 50px rgba(0,0,0,0.6)',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ color: 'white', margin: 0, fontSize: '1.3rem' }}>✏️ Editar Pizza</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)',
              fontSize: '1.5rem', cursor: 'pointer', padding: 0, lineHeight: 1
            }}
          >×</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Nombre */}
          <div>
            <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', display: 'block', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
              NOMBRE
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
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

          {/* Ingredientes / Descripción */}
          <div>
            <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', display: 'block', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
              INGREDIENTES / DESCRIPCIÓN
            </label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={4}
              style={{
                width: '100%', boxSizing: 'border-box',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,94,0,0.3)',
                borderRadius: '0.75rem',
                padding: '0.75rem 1rem',
                color: 'white',
                fontSize: '0.9rem',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit',
              }}
            />
          </div>

          {/* Precio */}
          <div>
            <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', display: 'block', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
              PRECIO (Gs.)
            </label>
            <input
              type="number"
              value={price}
              onChange={e => setPrice(e.target.value)}
              style={{
                width: '100%', boxSizing: 'border-box',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,94,0,0.3)',
                borderRadius: '0.75rem',
                padding: '0.75rem 1rem',
                color: 'var(--primary)',
                fontSize: '1.1rem',
                fontWeight: 700,
                outline: 'none',
              }}
            />
          </div>

          {/* Imagen */}
          <div>
            <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', display: 'block', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
              IMAGEN DE LA PIZZA
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{
                width: '100%', boxSizing: 'border-box',
                color: 'white',
                fontSize: '0.9rem',
              }}
            />
            {image && (
              <div style={{ marginTop: '0.5rem', width: '80px', height: '80px', borderRadius: '0.5rem', overflow: 'hidden' }}>
                <img src={image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}
          </div>

          {/* Botones */}
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
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
