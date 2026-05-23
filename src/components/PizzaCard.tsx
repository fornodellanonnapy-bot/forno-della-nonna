export interface PizzaItem {
  id: string;
  name: string;
  description: string;
  price: number;
  price12?: number;
  variants?: { id: string; name: string; price: number }[];
  image: string;
}

interface PizzaCardProps {
  pizza: PizzaItem;
  onAdd: (pizza: PizzaItem) => void;
}

export function PizzaCard({ pizza, onAdd }: PizzaCardProps) {
  return (
    <div 
      className="pizza-card"
      style={{
        background: 'rgba(26, 29, 36, 0.65)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        border: '1px solid rgba(255, 94, 0, 0.15)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transition: 'var(--transition)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(255, 94, 0, 0.1)';
        e.currentTarget.style.borderColor = 'rgba(255, 94, 0, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
      }}
    >
      <div style={{ position: 'relative', width: '100%', paddingTop: '75%', overflow: 'hidden' }}>
        <img 
          src={pizza.image} 
          alt={pizza.name}
          className="pizza-img-real"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>
      
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{pizza.name}</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.25rem', flexGrow: 1 }}>
          {pizza.description}
        </p>
        
        {pizza.variants && pizza.variants.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: 'auto' }}>
            {pizza.variants.map((v, index) => (
              <div key={v.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {index > 0 && <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)' }}></div>}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{v.name}</span>
                    <span style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--primary)', lineHeight: 1 }}>
                      {v.price.toLocaleString('es-PY')} Gs.
                    </span>
                  </div>
                  <button 
                    className="btn btn-primary"
                    style={{ padding: '0.4rem 0.75rem', fontSize: '0.875rem' }}
                    onClick={() => onAdd({ ...pizza, id: v.id, name: v.name, price: v.price })}
                  >
                    Agregar
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : pizza.price12 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: 'auto' }}>
            {/* Fila 8 porciones */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>8 Porciones</span>
                <span style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--primary)', lineHeight: 1 }}>
                  {pizza.price.toLocaleString('es-PY')} Gs.
                </span>
              </div>
              <button 
                className="btn btn-primary"
                style={{ padding: '0.4rem 0.75rem', fontSize: '0.875rem' }}
                onClick={() => onAdd({ ...pizza, id: `${pizza.id}_8`, name: `${pizza.name} (8 Porc.)` })}
              >
                Agregar
              </button>
            </div>
            
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)' }}></div>

            {/* Fila 12 porciones */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>12 Porciones</span>
                <span style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--primary)', lineHeight: 1 }}>
                  {pizza.price12.toLocaleString('es-PY')} Gs.
                </span>
              </div>
              <button 
                className="btn btn-primary"
                style={{ padding: '0.4rem 0.75rem', fontSize: '0.875rem' }}
                onClick={() => onAdd({ ...pizza, id: `${pizza.id}_12`, name: `${pizza.name} (12 Porc.)`, price: pizza.price12! })}
              >
                Agregar
              </button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
            <span style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--primary)' }}>
              {pizza.price.toLocaleString('es-PY')} Gs.
            </span>
            <button 
              className="btn btn-primary"
              style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
              onClick={() => onAdd(pizza)}
            >
              Agregar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
