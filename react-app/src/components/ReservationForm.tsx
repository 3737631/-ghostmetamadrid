import { useState } from 'react';
import { Calendar, Users, Clock, Send, Phone, MapPin } from 'lucide-react';

export default function ReservationForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    guests: 4,
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="reservas" className="relative py-24 bg-[#F7F4EE] border-b border-primary/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-14">
          <span className="font-cursive text-4xl text-accent block mb-2 leading-none">
            Te Esperamos
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text font-serif mb-4">
            Reserva tu Mesa
          </h2>
          <div className="w-16 h-[1px] bg-accent/40 mx-auto mb-6"></div>
          <p className="text-sm sm:text-base text-brown/90 leading-relaxed font-sans max-w-2xl mx-auto">
            Déjanos tus datos y te confirmaremos la reserva lo antes posible. También puedes llamarnos directamente.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          
          {/* Formulario */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="bg-surface border border-accent/30 p-8 text-center">
                <Send className="w-10 h-10 text-accent mx-auto mb-4" />
                <h3 className="font-serif font-bold text-lg text-text mb-2">¡Solicitud enviada!</h3>
                <p className="text-sm text-brown/80 font-sans">
                  Te confirmaremos la reserva por teléfono o email en breve. Gracias por confiar en Venta El Capricho.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-text font-sans block mb-1.5">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-primary/40 bg-surface text-text text-sm font-sans focus:outline-none focus:border-accent transition-colors"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-text font-sans block mb-1.5">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-primary/40 bg-surface text-text text-sm font-sans focus:outline-none focus:border-accent transition-colors"
                      placeholder="664 424 736"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-text font-sans block mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-primary/40 bg-surface text-text text-sm font-sans focus:outline-none focus:border-accent transition-colors"
                    placeholder="tu@email.com"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-text font-sans block mb-1.5">
                      <Calendar className="w-3.5 h-3.5 inline mr-1 text-accent" /> Fecha
                    </label>
                    <input
                      type="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-primary/40 bg-surface text-text text-sm font-sans focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-text font-sans block mb-1.5">
                      <Clock className="w-3.5 h-3.5 inline mr-1 text-accent" /> Hora
                    </label>
                    <select
                      name="time"
                      required
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-primary/40 bg-surface text-text text-sm font-sans focus:outline-none focus:border-accent transition-colors"
                    >
                      <option value="">Seleccionar</option>
                      <option value="13:00">13:00</option>
                      <option value="13:30">13:30</option>
                      <option value="14:00">14:00</option>
                      <option value="14:30">14:30</option>
                      <option value="15:00">15:00</option>
                      <option value="20:30">20:30</option>
                      <option value="21:00">21:00</option>
                      <option value="21:30">21:30</option>
                      <option value="22:00">22:00</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-text font-sans block mb-1.5">
                      <Users className="w-3.5 h-3.5 inline mr-1 text-accent" /> Comensales
                    </label>
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-primary/40 bg-surface text-text text-sm font-sans focus:outline-none focus:border-accent transition-colors"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map(n => (
                        <option key={n} value={n}>{n} {n === 1 ? 'persona' : 'personas'}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-text font-sans block mb-1.5">
                    Comentarios (alergias, ocasión especial...)
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-primary/40 bg-surface text-text text-sm font-sans focus:outline-none focus:border-accent transition-colors resize-none"
                    placeholder="¿Algo que debamos saber?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-accent text-white hover:bg-text text-xs font-bold uppercase tracking-widest font-sans transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Solicitar Reserva
                </button>
              </form>
            )}
          </div>

          {/* Info de contacto */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-surface p-6 border border-primary/30">
              <h3 className="font-serif font-bold text-lg text-text mb-4">Información de Contacto</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-text font-sans block mb-0.5">Teléfono</span>
                    <span className="text-sm text-brown font-sans">664 424 736</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-text font-sans block mb-0.5">Dirección</span>
                    <span className="text-sm text-brown font-sans">Calle Mandarina 2, Mairena del Aljarafe, Sevilla</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-text font-sans block mb-0.5">Horario de Cocina</span>
                    <span className="text-sm text-brown font-sans">
                      Miércoles a Sábado: 13:00 a 16:30 / 20:30 a 23:30<br />
                      Domingo: 13:00 a 17:00<br />
                      Lunes y Martes: Cerrado
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-accent/5 border border-accent/20 p-6">
              <p className="text-xs text-brown/80 font-sans leading-relaxed">
                <strong className="text-text">Para grupos grandes, comuniones y bautizos</strong>, te recomendamos llamarnos directamente para asegurar disponibilidad y personalizar el menú.
              </p>
              <a href="tel:664424736" className="inline-block mt-3 text-accent font-bold text-sm underline hover:text-text transition-colors">
                Llama al 664 424 736
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
