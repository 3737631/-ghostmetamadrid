export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'entrantes' | 'carnes' | 'pescados' | 'arroces' | 'postres' | 'bebidas';
  popular?: boolean;
  vegetarian?: boolean;
  celiac?: boolean;
}

export interface Review {
  id: string;
  name: string;
  stars: number;
  comment: string;
  date: string;
  source: string;
}

export interface InteractiveTableDish {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  icon: string;
  x: number;
  y: number;
}

export interface EventPackage {
  id: string;
  name: string;
  description: string;
  pricePerPerson: number;
  starters: string[];
  mains: string[];
  desserts: string[];
  drinks: string[];
  iconName: string;
}
