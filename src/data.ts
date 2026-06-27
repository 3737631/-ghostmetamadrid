import { MenuItem, Review, InteractiveTableDish, EventPackage } from './types';

export const menuItems: MenuItem[] = [
  // Entrantes
  {
    id: 'e1',
    name: 'Croquetas Caseras del Capricho',
    description: 'Selección de croquetas cremosas de jamón ibérico de bellota y puchero andaluz',
    price: 9.50,
    category: 'entrantes',
    popular: true
  },
  {
    id: 'e2',
    name: 'Jamón Ibérico de Bellota',
    description: 'Cortado a cuchillo al momento, acompañado de picos artesanos de Utrera',
    price: 19.50,
    category: 'entrantes',
    popular: true
  },
  {
    id: 'e3',
    name: 'Salmorejo Cordobés Tradicional',
    description: 'Emulsionado con aceite de oliva virgen extra de Estepa, huevo de corral y virutas de jamón',
    price: 8.00,
    category: 'entrantes'
  },
  {
    id: 'e4',
    name: 'Revuelto de Espárragos Trigueros y Setas',
    description: 'Salteado jugoso con huevos camperos de Mairena y las mejores setas de temporada',
    price: 10.50,
    category: 'entrantes',
    vegetarian: true
  },
  {
    id: 'e5',
    name: 'Queso Payoyo Curado',
    description: 'Queso artesanal de la Sierra de Grazalema madurado en manteca ibérica',
    price: 12.00,
    category: 'entrantes',
    celiac: true
  },

  // Carnes
  {
    id: 'c1',
    name: 'Solomillo Ibérico al Whisky',
    description: 'La gran especialidad de la casa, cocinado con ajos dorados, manzanilla de Sanlúcar y toque secreto',
    price: 17.50,
    category: 'carnes',
    popular: true
  },
  {
    id: 'c2',
    name: 'Carrillada de Cerdo Ibérico en Salsa',
    description: 'Melosa carrillada cocinada a fuego lento en reducción de vino tinto del Aljarafe y patatas panaderas',
    price: 16.00,
    category: 'carnes'
  },
  {
    id: 'c3',
    name: 'Secreto Ibérico a la Brasa',
    description: 'Corte selecto asado con sal gorda marina y guarnición de pimientos fritos del Aljarafe',
    price: 18.00,
    category: 'carnes'
  },
  {
    id: 'c4',
    name: 'Rabo de Toro Estofado',
    description: 'Receta tradicional andaluza con una salsa rica y melosa que se deshace en el paladar',
    price: 19.50,
    category: 'carnes',
    popular: true
  },

  // Pescados
  {
    id: 'p1',
    name: 'Bacalao Gratinado al Alioli de Miel',
    description: 'Lomo de bacalao premium sobre cama de patatas panaderas y un toque suave y dulce de alioli',
    price: 18.50,
    category: 'pescados',
    popular: true
  },
  {
    id: 'p2',
    name: 'Merluza Fresa de la Bahía',
    description: 'A la plancha con ajillo crujiente, guarnición de calabacín y espárragos trigueros asados',
    price: 16.50,
    category: 'pescados'
  },
  {
    id: 'p3',
    name: 'Chipirones a la Plancha con Salsa Verde',
    description: 'Frescos del mercado, marcados a fuego vivo con emulsión de perejil y ajo tierno',
    price: 15.00,
    category: 'pescados',
    celiac: true
  },

  // Arroces
  {
    id: 'a1',
    name: 'Arroz Meloso Capricho',
    description: 'Arroz meloso con pluma ibérica, boletus edulis y aromas de romero silvestre',
    price: 16.00,
    category: 'arroces',
    popular: true
  },
  {
    id: 'a2',
    name: 'Arroz con Bogavante Nacional',
    description: 'Arroz caldoso e intenso cocinado al momento con bogavante entero y sofrito tradicional',
    price: 24.00,
    category: 'arroces'
  },
  {
    id: 'a3',
    name: 'Paella Mixta Sevillana',
    description: 'Arroz seco con pollo de corral, judías verdes, mejillones y gambas frescas',
    price: 16.50,
    category: 'arroces'
  },

  // Postres
  {
    id: 'po1',
    name: 'Tarta de Queso "El Capricho"',
    description: 'Tarta horneada súper cremosa con base de galleta y sirope artesanal de frutos del bosque',
    price: 6.50,
    category: 'postres',
    popular: true
  },
  {
    id: 'po2',
    name: 'Torrijas Caramelizadas con Canela',
    description: 'Receta centenaria, empapadas en leche con cáscara de naranja de Mairena y canela de Ceilán',
    price: 7.00,
    category: 'postres',
    popular: true
  },
  {
    id: 'po3',
    name: 'Flan Casero de Huevo y Caramelo',
    description: 'Elaborado con huevos de corral, leche entera fresca y caramelo tostado a mano',
    price: 5.50,
    category: 'postres'
  },

  // Bebidas
  {
    id: 'b1',
    name: 'Manzanilla de Sanlúcar Muy Fría',
    description: 'Copa de vino fino, perfecta para maridar con jamón o croquetas',
    price: 3.00,
    category: 'bebidas'
  },
  {
    id: 'b2',
    name: 'Cerveza Cruzcampo de Barril',
    description: 'Tirada de manera tradicional, con su espuma perfecta y súper helada',
    price: 2.60,
    category: 'bebidas'
  },
  {
    id: 'b3',
    name: 'Vino Tinto Rioja Crianza (Copa)',
    description: 'Vino tinto elegante, ideal para acompañar nuestras carnes ibéricas',
    price: 3.50,
    category: 'bebidas'
  }
];

export const reviews: Review[] = [
  {
    id: 'r1',
    name: 'Lola Ramos',
    stars: 5,
    comment: 'Celebré la comunión de mi hija el mes pasado y fue un acierto total. La comida estuvo espectacular, los espacios son amplios e idóneos para que los niños jueguen, y el servicio de mesa fue súper atento y profesional. ¡Totalmente recomendado!',
    date: 'Mayo 2026',
    source: 'Reseña de Google'
  },
  {
    id: 'r2',
    name: 'Jorge Rodríguez',
    stars: 4,
    comment: 'Un restaurante excelente para disfrutar en familia de la gastronomía de toda la vida. La terraza exterior es súper agradable para la sobremesa con un café o una copa de manzanilla. Las croquetas y el solomillo al whisky son obligatorios.',
    date: 'Junio 2026',
    source: 'Reseña de Google'
  },
  {
    id: 'r3',
    name: 'María Luisa Sánchez',
    stars: 5,
    comment: 'La calidez andaluza en estado puro. Te atienden con una sonrisa desde el primer segundo. Celebramos el bautizo de mi nieto y todos los invitados quedaron encantados tanto con el menú como con la belleza tradicional de la venta.',
    date: 'Abril 2026',
    source: 'Reseña de Google'
  },
  {
    id: 'r4',
    name: 'Antonio J. Benítez',
    stars: 5,
    comment: 'Excelente comida y precio inmejorable en la zona del Aljarafe. Probamos el arroz de la casa y el rabo de toro, ambos platos cocinados con el cariño que ya casi no se encuentra en las grandes ciudades. Volveremos sin duda.',
    date: 'Marzo 2026',
    source: 'Reseña de Google'
  }
];

export const interactiveDishes: InteractiveTableDish[] = [
  {
    id: 'it1',
    name: 'Croquetas Caseras',
    description: 'Doradas por fuera, increíblemente fundentes por dentro con un toque generoso de jamón ibérico de bellota.',
    price: 9.50,
    category: 'Entrante',
    icon: 'croquette',
    x: 20,
    y: 35
  },
  {
    id: 'it2',
    name: 'Solomillo al Whisky',
    description: 'Corte tierno asado a la perfección, bañado en su icónica salsa de ajos confitados, limón y manzanilla.',
    price: 17.50,
    category: 'Carnes',
    icon: 'steak',
    x: 50,
    y: 15
  },
  {
    id: 'it3',
    name: 'Torrija Caramelizada',
    description: 'Postre cremoso de leche aromatizada con canela y cáscara de naranja, caramelizada al momento con azúcar quemado.',
    price: 7.00,
    category: 'Postre',
    icon: 'toast',
    x: 80,
    y: 35
  },
  {
    id: 'it4',
    name: 'Copa de Manzanilla',
    description: 'Fría, limpia y punzante. El maridaje perfecto para abrir el apetito e iniciar el almuerzo andaluz.',
    price: 3.00,
    category: 'Bebidas',
    icon: 'wine',
    x: 35,
    y: 65
  },
  {
    id: 'it5',
    name: 'Jamón Ibérico de Bellota',
    description: 'El orgullo de nuestra gastronomía, cortado al momento con el veteado perfecto que se deshace en boca.',
    price: 19.50,
    category: 'Entrante',
    icon: 'ham',
    x: 65,
    y: 65
  }
];

export const eventPackages: EventPackage[] = [
  {
    id: 'ep1',
    name: 'Menú Tradicional Aljarafe',
    pricePerPerson: 38,
    description: 'Perfecto para bautizos y reuniones familiares íntimas.',
    starters: ['Surtido de Ibéricos', 'Croquetas Caseras', 'Salmorejo Sevillano'],
    mains: ['Carrillada Ibérica en salsa', 'Lomo de Bacalao gratinado'],
    desserts: ['Flan casero', 'Café o Infusión'],
    drinks: ['Cerveza Cruzcampo, Vino de la Casa, Refrescos y Agua'],
    iconName: 'Sparkles'
  },
  {
    id: 'ep2',
    name: 'Menú Celebración Premium',
    pricePerPerson: 52,
    description: 'Para Comuniones y grandes acontecimientos.',
    starters: ['Jamón Ibérico y Queso Grazalema', 'Revuelto de espárragos', 'Gambas de Huelva'],
    mains: ['Solomillo Ibérico al Whisky', 'Merluza de la Bahía asada'],
    desserts: ['Tarta personalizada', 'Copa de Cava', 'Café'],
    drinks: ['Vinos Rioja, Manzanilla, Cerveza, Refrescos, Licores'],
    iconName: 'Award'
  },
  {
    id: 'ep3',
    name: 'Menú Infantil "Caprichito"',
    pricePerPerson: 18,
    description: 'Para los más pequeños.',
    starters: ['Surtido de fritos (croquetas, fingers de pollo)'],
    mains: ['Escalope de pollo crujiente con patatas'],
    desserts: ['Copa de helado o tarta infantil'],
    drinks: ['Refrescos y zumos'],
    iconName: 'Heart'
  }
];
