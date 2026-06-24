import type { InteractiveTableDish } from '../types';

export const interactiveDishes: InteractiveTableDish[] = [
  {
    id: 'it1',
    name: 'Croquetas Caseras',
    description: 'Selección de croquetas artesanales de jamón, puchero y boletus.',
    price: '9 €',
    image: 'https://res.cloudinary.com/dmuxgamms/image/upload/v1782260951/unnamed_18_ckvs0l.webp',
    category: 'Entrantes'
  },
  {
    id: 'it2',
    name: 'Solomillo al Whisky',
    description: 'Solomillo ibérico flambeado con salsa al whisky y guarnición.',
    price: '17 €',
    image: 'https://res.cloudinary.com/dmuxgamms/image/upload/v1782260951/unnamed_19_c2jiks.webp',
    category: 'Carnes'
  },
  {
    id: 'it3',
    name: 'Torrijas de la Abuela',
    description: 'Torrijas caramelizadas con canela y helado de vainilla.',
    price: '7 €',
    image: 'https://res.cloudinary.com/dmuxgamms/image/upload/v1782260952/unnamed_23_jmbunf.webp',
    category: 'Postres'
  },
  {
    id: 'it4',
    name: 'Manzanilla de Sanlúcar',
    description: 'Vino fino de la Denominación de Origen Sanlúcar de Barrameda.',
    price: '3 €',
    image: 'https://res.cloudinary.com/dmuxgamms/image/upload/v1782260952/unnamed_18_ckvs0l.webp',
    category: 'Bebidas'
  },
  {
    id: 'it5',
    name: 'Jamón Ibérico',
    description: 'Jamón ibérico de bellota cortado a cuchillo con pan tostado.',
    price: '18 €',
    image: 'https://res.cloudinary.com/dmuxgamms/image/upload/v1782260951/unnamed_25_h4vgqs.webp',
    category: 'Entrantes'
  }
];
