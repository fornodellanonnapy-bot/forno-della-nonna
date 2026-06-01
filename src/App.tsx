import { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { PizzaCard } from './components/PizzaCard';
import type { PizzaItem } from './components/PizzaCard';
import { CartModal } from './components/CartModal';
import { ToppingsModal } from './components/ToppingsModal';
import { FlavorModal } from './components/FlavorModal';
import { TonicFlavorModal } from './components/TonicFlavorModal';
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
  },
  {
    id: 'papas_fritas',
    name: 'Papas Fritas Crujientes',
    description: 'Porción dorada a la perfección, crujientes por fuera y tiernas por dentro. ¡El acompañamiento perfecto!',
    price: 0,
    image: 'papas_fritas_1779419086376.png',
    variants: [
      { id: 'papas_fritas_premium', name: 'Papas Premium (Compartir)', price: 25000 },
      { id: 'papas_fritas_personal', name: 'Papas Personal (Individual)', price: 15000 }
    ]
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
    id: 'cervezas_premium',
    name: 'Cervezas Premium (750ml)',
    description: 'Las mejores marcas internacionales en botella de 750ml para maridar su pizza como se debe.',
    price: 0,
    image: 'cervezas_unificadas.png',
    variants: [
      { id: 'cerveza_heineken_750ml', name: 'Cerveza Heineken 750ml', price: 18000 },
      { id: 'cerveza_corona_750ml', name: 'Cerveza Corona 750ml', price: 20000 }
    ]
  },
  {
    id: 'tonica_de_la_costa_unificada',
    name: 'Tónicas De la Costa',
    description: 'La refrescante agua tónica nacional (Sin Azúcar) en sus sabores clásica (Original) y Grapefruit (Rosada). Elija su tamaño.',
    price: 0,
    image: 'tonica_delacosta_unificada.png',
    variants: [
      { id: 'tonica_delacosta_size_2l', name: 'Botella 2 Litros', price: 12000 },
      { id: 'tonica_delacosta_size_pequena', name: 'Botella Pequeña', price: 6000 },
      { id: 'tonica_delacosta_size_lata', name: 'Lata', price: 6000 }
    ]
  }
];

const STORIES_DATA = [
  {
    id: 'story_1',
    video: 'WhatsApp Video 2026-05-31 at 20.00.50.mp4',
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
    video: 'WhatsApp Video 2026-05-31 at 20.31.51.mp4',
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
  const [selectedTonicForFlavor, setSelectedTonicForFlavor] = useState<PizzaItem | null>(null);

  // --- Ambiente Musical ---
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasStartedRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMusicHint, setShowMusicHint] = useState(true);

  useEffect(() => {
    const audio = new Audio(`${import.meta.env.BASE_URL}Pomeriggio_al_Forno.mp3`);
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    const fadeIn = () => {
      const target = 0.25;
      const interval = setInterval(() => {
        if (audio.volume < target - 0.008) {
          audio.volume = Math.min(target, audio.volume + 0.008);
        } else {
          audio.volume = target;
          clearInterval(interval);
        }
      }, 60);
    };

    // Intentar autoplay inmediato
    audio.play()
      .then(() => {
        hasStartedRef.current = true;
        setIsPlaying(true);
        setShowMusicHint(false);
        fadeIn();
      })
      .catch(() => {
        // Chrome bloqueó el autoplay — activar en el primer gesto del usuario
        const startOnInteraction = () => {
          if (hasStartedRef.current) return; // Ya inició (ej: el botón lo activó primero)
          hasStartedRef.current = true;
          audio.volume = 0;
          audio.play()
            .then(() => {
              setIsPlaying(true);
              setShowMusicHint(false);
              fadeIn();
            })
            .catch(() => {});
          document.removeEventListener('click', startOnInteraction);
          document.removeEventListener('touchstart', startOnInteraction);
        };
        document.addEventListener('click', startOnInteraction);
        document.addEventListener('touchstart', startOnInteraction);

        return () => {
          document.removeEventListener('click', startOnInteraction);
          document.removeEventListener('touchstart', startOnInteraction);
        };
      });

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const toggleAmbientAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      // Fade-out suave antes de pausar
      const fadeOut = setInterval(() => {
        if (audio.volume > 0.02) {
          audio.volume = Math.max(0, audio.volume - 0.02);
        } else {
          audio.volume = 0;
          audio.pause();
          clearInterval(fadeOut);
        }
      }, 40);
      setIsPlaying(false);
    } else {
      // Fade-in suave al activar manualmente
      hasStartedRef.current = true; // Marcar como iniciado para bloquear el listener del documento
      audio.volume = 0;
      audio.play()
        .then(() => {
          setIsPlaying(true);
          setShowMusicHint(false);
          const target = 0.25;
          const fadeIn = setInterval(() => {
            if (audio.volume < target - 0.01) {
              audio.volume = Math.min(target, audio.volume + 0.012);
            } else {
              audio.volume = target;
              clearInterval(fadeIn);
            }
          }, 50);
        })
        .catch(err => console.log('Audio bloqueado por el navegador:', err));
    }
  };

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
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}>Bebidas</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.125rem' }}>
            Acompañe su pizza con nuestra selección de bebidas bien frías.
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
                } else if (item.id.startsWith('tonica_delacosta_size_')) {
                  setSelectedTonicForFlavor(item);
                } else if (item.id.startsWith('papas_fritas')) {
                  setSelectedPizzaForToppings(item);
                } else {
                  let finalItem = { ...item };
                  if (item.id === 'cerveza_heineken_750ml') {
                    finalItem.image = 'cerveza_heineken.png';
                  } else if (item.id === 'cerveza_corona_750ml') {
                    finalItem.image = 'cerveza_corona.png';
                  }
                  addToCart(finalItem, []);
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
                  const videos = e.currentTarget.querySelectorAll('video');
                  videos.forEach(v => {
                    v.play().catch(err => console.log("Video auto-play blocked", err));
                  });
                }}
                onMouseLeave={(e) => {
                  const videos = e.currentTarget.querySelectorAll('video');
                  videos.forEach(v => v.pause());
                }}
                onClick={(e) => {
                  const videos = e.currentTarget.querySelectorAll('video');
                  videos.forEach(v => {
                    if (v.paused) {
                      v.play().catch(err => console.log("Video play blocked", err));
                    } else {
                      v.pause();
                    }
                  });
                }}
                style={{ cursor: 'pointer' }}
              >
                <div className="story-play-btn">
                  <span>▶</span>
                </div>
                
                <div 
                  className="story-video-container"
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                    backgroundColor: '#000'
                  }}
                >
                  {/* Video de fondo desenfocado (Blur Backdrop) para rellenar estéticamente los espacios negros */}
                  <video 
                    className="story-video-blur"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'blur(20px) brightness(0.4)',
                      transform: 'scale(1.15)',
                      pointerEvents: 'none'
                    }}
                    muted 
                    playsInline
                    preload="metadata"
                  >
                    <source src={story.video} type="video/mp4" />
                  </video>

                  {/* Video frontal nítido y bien centrado */}
                  <video 
                    ref={(el) => { if (el) el.muted = true; }}
                    className="story-video-main"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      zIndex: 2
                    }}
                    muted 
                    playsInline
                    preload="metadata"
                    onEnded={(e) => {
                      const mainVideo = e.currentTarget;
                      const container = mainVideo.parentElement;
                      if (!container) return;

                      container.classList.add('circle-wipe-active');
                      
                      // Al 50% de la animación (600ms), cuando el círculo está cerrado al centro, reiniciamos ambos videos
                      setTimeout(() => {
                        const vids = container.querySelectorAll('video');
                        vids.forEach(v => {
                          v.currentTime = 0;
                          v.play().catch(err => console.log("Video replay blocked", err));
                        });
                      }, 600);

                      // Al finalizar la animación (1200ms), removemos la clase
                      setTimeout(() => {
                        container.classList.remove('circle-wipe-active');
                      }, 1200);
                    }}
                  >
                    <source src={story.video} type="video/mp4" />
                    Tu navegador no soporta la reproducción de video.
                  </video>
                </div>

                <div className="story-overlay" style={{ zIndex: 10 }}>
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

      {/* Tonic Flavor Modal */}
      <TonicFlavorModal
        isOpen={!!selectedTonicForFlavor}
        onClose={() => setSelectedTonicForFlavor(null)}
        beverage={selectedTonicForFlavor}
        onConfirm={(beverage) => addToCart(beverage, [])}
      />

      {/* Botón Flotante de Música de Ambiente */}
      <div
        style={{
          position: 'fixed',
          bottom: totalCount > 0 ? '6rem' : '2rem',
          left: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '0.5rem',
          zIndex: 39,
          transition: 'bottom 0.3s ease'
        }}
      >
        {/* Globo de sugerencia "Activar música" */}
        {showMusicHint && !isPlaying && (
          <div style={{
            background: 'rgba(24, 27, 33, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 94, 0, 0.3)',
            borderRadius: '12px',
            padding: '0.5rem 0.875rem',
            fontSize: '0.78rem',
            color: 'rgba(255,255,255,0.85)',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            animation: 'fadeInUp 0.5s ease forwards',
            pointerEvents: 'none'
          }}>
            {isPlaying ? '🎵 Toca para silenciar' : '🔇 Toca para activar el ambiente'}
          </div>
        )}

        <button
          onClick={toggleAmbientAudio}
          title={isPlaying ? 'Pausar música de ambiente' : 'Activar música de ambiente'}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: isPlaying
              ? 'linear-gradient(135deg, #ff5e00, #e05300)'
              : 'rgba(24, 27, 33, 0.85)',
            backdropFilter: 'blur(10px)',
            border: isPlaying
              ? '2px solid rgba(255,94,0,0.6)'
              : '2px solid rgba(255,255,255,0.1)',
            color: 'white',
            fontSize: '1.3rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: isPlaying
              ? '0 4px 20px rgba(255, 94, 0, 0.4)'
              : '0 4px 15px rgba(0,0,0,0.5)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            animation: isPlaying ? 'musicPulse 2s ease-in-out infinite' : 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          {isPlaying ? '🎵' : '🔇'}
        </button>
      </div>
    </div>
  );
}

export default App;
