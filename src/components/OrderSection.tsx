import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Minus, ShoppingCart, Send, EyeOff, RefreshCw, Sparkles, CheckCircle, Trash2 } from 'lucide-react';

const serviceOptions = [
  { id: 'led', name: 'Eliminación de LEDs', price: 49, icon: EyeOff },
  { id: 'restoration', name: 'Restauración estética', price: 29, icon: RefreshCw },
  { id: 'premium', name: 'Personalización Premium', price: 39, icon: Sparkles },
  { id: 'full', name: 'Servicio Completo', price: 79, icon: CheckCircle, desc: 'LED + Restauración + Personalización' },
];

export default function OrderSection() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [form, setForm] = useState({ name: '', phone: '', email: '', notes: '' });
  const [sent, setSent] = useState(false);

  const add = (id: string) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const remove = (id: string) => setCart((c) => {
    const next = { ...c };
    if (next[id] <= 1) delete next[id];
    else next[id]--;
    return next;
  });

  const total = Object.entries(cart).reduce((sum, [id, qty]) => {
    const svc = serviceOptions.find((s) => s.id === id);
    return sum + (svc?.price || 0) * qty;
  }, 0);

  const itemCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const items = Object.entries(cart)
      .map(([id, qty]) => {
        const s = serviceOptions.find((svc) => svc.id === id);
        return `${s?.name} x${qty} = ${((s?.price || 0) * qty).toFixed(2)}€`;
      })
      .join('\n');

    const msg = encodeURIComponent(
      `Nuevo pedido:\n${items}\n\nTotal: ${total.toFixed(2)}€\n\nNombre: ${form.name}\nTeléfono: ${form.phone}\nEmail: ${form.email}\nNotas: ${form.notes}`
    );

    window.open(`mailto:ghostmediamadrid@gmail.com?subject=Pedido Ghost Media&body=${msg}`);
    setSent(true);
  };

  return (
    <section id="pedidos" className="py-24 bg-black relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }} viewport={{ once: true }}
          className="text-center space-y-4 mb-14">
          <span className="text-gold text-[10px] font-bold tracking-[0.25em] uppercase font-sans">
            <ShoppingCart className="w-3.5 h-3.5 inline mr-1" /> Sistema de Pedidos
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-cream font-serif">
            Solicita tu servicio
          </h2>
          <p className="text-brown text-sm font-sans max-w-xl mx-auto">
            Selecciona los servicios que necesitas y te enviamos un presupuesto personalizado.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-4">
              {serviceOptions.map((svc, i) => {
                const qty = cart[svc.id] || 0;
                return (
                  <motion.div key={svc.id} initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.08 }} viewport={{ once: true }}
                    className={`border p-5 transition-all ${qty > 0 ? 'border-gold/40 bg-gold/[0.03]' : 'border-white/10 bg-white/[0.02] hover:border-white/20'}`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 border border-white/10 flex items-center justify-center shrink-0">
                          <svc.icon className="w-4 h-4 text-gold" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-sm font-bold text-cream font-serif truncate">{svc.name}</h3>
                          {svc.desc && <p className="text-[11px] text-brown font-sans truncate">{svc.desc}</p>}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 shrink-0">
                        <span className="text-sm font-bold text-gold font-sans">{svc.price.toFixed(2)}€</span>
                        <div className="flex items-center gap-2">
                          <button type="button" onClick={() => remove(svc.id)}
                            className="w-7 h-7 border border-white/20 flex items-center justify-center hover:border-gold/50 transition-colors cursor-pointer">
                            {qty > 0 ? <Minus className="w-3 h-3 text-cream/80" /> : <Trash2 className="w-3 h-3 text-cream/30" />}
                          </button>
                          <span className="w-6 text-center text-sm font-bold text-cream font-sans">{qty}</span>
                          <button type="button" onClick={() => add(svc.id)}
                            className="w-7 h-7 border border-white/20 flex items-center justify-center hover:border-gold/50 transition-colors cursor-pointer">
                            <Plus className="w-3 h-3 text-cream/80" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="lg:col-span-5 space-y-5">
              <div className="border border-white/10 bg-white/[0.02] p-6">
                <h3 className="text-sm font-bold text-cream font-serif mb-4 flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-gold" /> Resumen del pedido
                </h3>
                {itemCount === 0 ? (
                  <p className="text-xs text-brown font-sans">Selecciona los servicios que necesitas.</p>
                ) : (
                  <div className="space-y-2 mb-4">
                    {Object.entries(cart).map(([id, qty]) => {
                      const s = serviceOptions.find((svc) => svc.id === id);
                      if (!s) return null;
                      return (
                        <div key={id} className="flex justify-between text-xs font-sans">
                          <span className="text-cream/80">{s.name} <span className="text-brown">x{qty}</span></span>
                          <span className="text-gold font-bold">{(s.price * qty).toFixed(2)}€</span>
                        </div>
                      );
                    })}
                    <div className="border-t border-white/10 pt-2 flex justify-between text-sm font-sans">
                      <span className="font-bold text-cream">Total</span>
                      <span className="font-bold text-gold">{total.toFixed(2)}€</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="border border-white/10 bg-white/[0.02] p-6 space-y-4">
                <input type="text" placeholder="Nombre completo" required
                  value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 text-cream text-sm font-sans placeholder:text-brown/50 focus:outline-none focus:border-gold/40" />
                <input type="tel" placeholder="Teléfono" required
                  value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 text-cream text-sm font-sans placeholder:text-brown/50 focus:outline-none focus:border-gold/40" />
                <input type="email" placeholder="Email"
                  value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 text-cream text-sm font-sans placeholder:text-brown/50 focus:outline-none focus:border-gold/40" />
                <textarea placeholder="Modelo de gafas, notas adicionales..."
                  value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 text-cream text-sm font-sans placeholder:text-brown/50 focus:outline-none focus:border-gold/40 resize-none h-20" />

                <button type="submit" disabled={itemCount === 0}
                  className="w-full py-3.5 bg-secondary text-white font-medium text-sm rounded-full hover:bg-hover transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">
                  <Send className="w-4 h-4" /> {sent ? 'Enviado' : 'Enviar pedido'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
