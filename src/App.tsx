import { useState } from 'react';
import { Header } from './components/Header';
import { PizzaCard } from './components/PizzaCard';
import type { PizzaItem } from './components/PizzaCard';
import { CartModal } from './components/CartModal';
import { ToppingsModal } from './components/ToppingsModal';
import { FlavorModal } from './components/FlavorModal';
import { useCart } from './hooks/useCart';
import { ShoppingCart } from 'lucide-react';
import './index.css';

const MENU_DATA: PizzaItem[] = [
  {
    id: 'mozzarella',
    name: 'Especial de la Casa',
    description: 'Nuestra creación estrella: Rúcula fresca, queso parmesano en escamas y jamón crudo sobre una base crujiente. ¡Pura elegancia!',
    price: 80000,
    price12: 100000,
    image: 'pizza_especial.png'
  },
  {
    id: 'napolitana',
    name: 'Napolitana Gourmet',
    description: 'Base clásica con jugosas rodajas de tomate seleccionados, ajo finamente picado, mozzarella elástica y hojas de albahaca fresca cosechada al día.',
    price: 65000,
    price12: 80000,
    image: 'pizza_napolitana.png'
  },
  {
    id: 'pepperoni',
    name: 'Pepperoni Premium',
    description: 'Abundantes y crujientes láminas de pepperoni de primer nivel curado artesanalmente, sobre una deliciosa y cremosa cama de queso mozzarella.',
    price: 70000,
    price12: 90000,
    image: 'pizza_pepperoni.png'
  },
  {
    id: 'pollo_catupiry',
    name: 'Pollo con Katipyri',
    description: 'Pollo desmenuzado súper jugoso y sazonado a las finas hierbas, coronado con los emblemáticos y generosos hilos de queso Catupiry original.',
    price: 70000,
    price12: 90000,
    image: 'pizza_pollo_catupiry.png'
  },
  {
    id: 'jamon_queso',
    name: 'Jamón y Queso',
    description: 'Láminas finas de jamón cocido seleccionado de alta calidad, doble capa de mozzarella fundida y aceitunas negras sobre nuestra masa de autor.',
    price: 65000,
    price12: 80000,
    image: 'pizza_jamon_queso.png'
  },
  {
    id: 'cuatro_quesos',
    name: '4 Quesos Suprema',
    description: 'Una obra de arte láctea: combinación majestuosa de Mozzarella premium, Gorgonzola intenso, Provolone ahumado y un toque de Parmesano gratinado.',
    price: 75000,
    price12: 95000,
    image: 'pizza_4_quesos.png'
  },
  {
    id: 'mozzarella_clasica',
    name: 'Clásica Mozzarella',
    description: 'La reina indiscutible: abundante queso mozzarella de primera fundido a la perfección sobre nuestra salsa de tomate artesanal y hojas de albahaca fresca.',
    price: 60000,
    price12: 75000,
    image: 'pizza_mozzarella.png'
  },
  {
    id: 'pizza_bianca',
    name: 'Pizza Bianca Gourmet',
    description: 'Una exquisitez sin salsa de tomate. Fina mezcla de quesos cremosos, ajo asado y un toque de aceite de oliva premium sobre nuestra masa crujiente.',
    price: 55000,
    price12: 70000,
    image: 'pizza_bianca.png'
  }
];

const EXTRAS_DATA: PizzaItem[] = [
  {
    id: 'coca_cola_linea',
    name: 'Línea Coca-Cola',
    description: 'Nuestras opciones de Coca-Cola en botella de plástico, bien frías para acompañar su pizza.',
    price: 0, // No se usa directamente porque hay variantes
    image: 'coca_cola_fog.png',
    variants: [
      { id: 'coca_cola_2l', name: 'Botella 2 Litros', price: 18000 },
      { id: 'coca_cola_500ml', name: 'Botella 500 ml', price: 8000 },
      { id: 'coca_cola_250ml', name: 'Botella 250 ml', price: 5000 }
    ]
  },
  {
    id: 'papas_fritas',
    name: 'Papas Fritas Crujientes',
    description: 'Porción dorada a la perfección, crujientes por fuera y tiernas por dentro.',
    price: 0,
    image: 'papas_fritas_1779419086376.png',
    variants: [
      { id: 'papas_fritas_premium', name: 'Papas Premium (Compartir)', price: 25000 },
      { id: 'papas_fritas_personal', name: 'Papas Personal (Individual)', price: 15000 }
    ]
  }
];

const STORIES_DATA = [
  {
    id: 'story_1',
    video: 'WhatsApp Video 2026-05-22 at 09.42.20.mp4',
    title: 'El Arte del Amasado 👨‍🍳',
    subtitle: 'Nuestra masa artesanal de fermentación lenta.'
  },
  {
    id: 'story_2',
    video: 'WhatsApp Video 2026-05-22 at 09.42.44.mp4',
    title: 'Salsa Secreta de la Casa 🍅',
    subtitle: 'Preparada con tomates seleccionados.'
  },
  {
    id: 'story_3',
    video: 'WhatsApp Video 2026-05-22 at 09.45.14.mp4',
    title: '¡Al Horno de Leña! 🔥',
    subtitle: 'Horneado perfecto para ese borde crujiente.'
  },
  {
    id: 'story_4',
    video: 'WhatsApp Video 2026-05-22 at 09.45.15.mp4',
    title: 'Queso Derretido Real 🧀',
    subtitle: 'El toque final que hace la magia.'
  }
];


function App() {
  const { items, addToCart, removeFromCart, clearCart, totalCount, totalPrice } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedPizzaForToppings, setSelectedPizzaForToppings] = useState<PizzaItem | null>(null);
  const [selectedBeverageForFlavor, setSelectedBeverageForFlavor] = useState<PizzaItem | null>(null);

  return (
    <div style={{ 
      minHeight: '100vh', 
      paddingBottom: '6rem',
      color: 'var(--text-main)'
    }}>
      <Header cartItemCount={totalCount} />
      
      <main className="container" style={{ marginTop: '2rem' }}>
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}>Nuestras Especialidades</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.125rem' }}>
            Masa de fermentación lenta, ingredientes de la más alta calidad y pasión por la verdadera pizza artesanal.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '2rem' 
        }}>
          {MENU_DATA.map(pizza => (
            <PizzaCard 
              key={pizza.id} 
              pizza={pizza} 
              onAdd={(p) => setSelectedPizzaForToppings(p)} 
            />
          ))}
        </div>

        <div style={{ marginTop: '5rem', marginBottom: '3rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}>Bebidas y Adicionales</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.125rem' }}>
            Complete su pedido con nuestras opciones extra.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '2rem' 
        }}>
          {EXTRAS_DATA.map(extra => (
            <PizzaCard 
              key={extra.id} 
              pizza={extra} 
              onAdd={(item) => {
                if (item.id.startsWith('coca_cola')) {
                  setSelectedBeverageForFlavor(item);
                } else if (item.id.startsWith('papas_fritas')) {
                  setSelectedPizzaForToppings(item);
                } else {
                  addToCart(item, []);
                }
              }} 
            />
          ))}
        </div>

        {/* Sección: La Cocina en Vivo 🎥 */}
        <section 
          className="stories-section"
          style={{
            background: 'linear-gradient(180deg, transparent, rgba(255, 94, 0, 0.02) 50%, rgba(255, 94, 0, 0.05) 100%)',
            padding: '3rem 1.5rem',
            borderRadius: '30px',
            border: '1px solid rgba(255, 94, 0, 0.08)',
            margin: '5rem 0 2rem 0',
            overflow: 'hidden'
          }}
        >
          <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
            <h2 style={{ 
              fontSize: '2.2rem', 
              marginBottom: '0.75rem', 
              color: 'white',
              letterSpacing: '-0.03em'
            }}>
              La Cocina en Vivo 🎥
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem' }}>
              ¡Toca sobre un video en tu celular o pasa el cursor para ver la preparación real en nuestra pizzería! 👨‍🍳🔥
            </p>
          </div>

          <div className="stories-carousel-container">
            {STORIES_DATA.map((story) => (
              <div 
                key={story.id} 
                className="story-card"
                onMouseEnter={(e) => {
                  const video = e.currentTarget.querySelector('video');
                  if (video) {
                    video.play().catch(err => console.log("Video auto-play blocked or interrupted", err));
                  }
                }}
                onMouseLeave={(e) => {
                  const video = e.currentTarget.querySelector('video');
                  if (video) video.pause();
                }}
                onClick={(e) => {
                  const video = e.currentTarget.querySelector('video');
                  if (video) {
                    if (video.paused) {
                      video.play().catch(err => console.log("Video play blocked", err));
                    } else {
                      video.pause();
                    }
                  }
                }}
                style={{ cursor: 'pointer' }}
              >
                <div className="story-play-btn">
                  <span>▶</span>
                </div>
                <video 
                  ref={(el) => { if (el) el.muted = true; }}
                  className="story-video"
                  loop 
                  muted 
                  playsInline
                  preload="metadata"
                >
                  <source src={story.video} type="video/mp4" />
                  Tu navegador no soporta la reproducción de video.
                </video>
                <div className="story-overlay">
                  <h3 className="story-title">{story.title}</h3>
                  <p className="story-subtitle">{story.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Floating Cart Button */}
      {totalCount > 0 && (
        <button 
          onClick={() => setIsCartOpen(true)}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            background: 'var(--primary)',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            padding: '1rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '1.125rem',
            fontWeight: 700,
            boxShadow: 'var(--shadow-lg)',
            cursor: 'pointer',
            zIndex: 40,
            transition: 'var(--transition)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <ShoppingCart />
          Ver Pedido ({totalCount}) - {totalPrice.toLocaleString('es-PY')} Gs.
        </button>
      )}

      {/* Cart Modal */}
      {isCartOpen && (
        <CartModal 
          onClose={() => setIsCartOpen(false)}
          items={items}
          total={totalPrice}
          onRemove={removeFromCart}
          onClear={clearCart}
        />
      )}

      {/* Toppings Modal */}
      <ToppingsModal
        isOpen={!!selectedPizzaForToppings}
        onClose={() => setSelectedPizzaForToppings(null)}
        pizza={selectedPizzaForToppings}
        onConfirm={(pizza, toppings) => addToCart(pizza, toppings)}
      />

      {/* Flavor Modal */}
      <FlavorModal
        isOpen={!!selectedBeverageForFlavor}
        onClose={() => setSelectedBeverageForFlavor(null)}
        beverage={selectedBeverageForFlavor}
        onConfirm={(beverage) => addToCart(beverage, [])}
      />
    </div>
  );
}

export default App;
