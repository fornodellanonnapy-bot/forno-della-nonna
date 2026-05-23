import type { CartItem } from '../hooks/useCart';

export function generateWhatsAppLink(
  items: CartItem[], 
  total: number, 
  address: string,
  paymentMethod: string
): string {
  // Configured WhatsApp Number
  const phoneNumber = '595994763407'; // Forno Della Nonna

  let text = `¡Hola! Quiero hacer un pedido: \n\n`;
  
  items.forEach(item => {
    let emoji = '🍕';
    if (item.id.startsWith('coca_cola')) {
      emoji = '🥤';
    } else if (item.id.startsWith('papas_fritas')) {
      emoji = '🍟';
    }
    text += `${emoji} ${item.quantity}x ${item.name} - ${(item.price * item.quantity).toLocaleString('es-PY')} Gs.\n`;
    if (item.toppings && item.toppings.length > 0) {
      text += `    ➕ Extras: ${item.toppings.join(', ')}\n`;
    }
  });

  text += `\n💰 *Total:* ${total.toLocaleString('es-PY')} Gs.\n`;
  text += `📍 *Dirección:* ${address}\n`;
  text += `💳 *Pago:* ${paymentMethod}\n\n`;
  text += `Por favor confirmen la recepción. ¡Gracias!`;

  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${phoneNumber}?text=${encodedText}`;
}
