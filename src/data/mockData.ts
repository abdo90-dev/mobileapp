import { Restaurant, Order, Review } from '../types';

export const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Le Petit Bistro',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c',
    rating: 4.5,
    deliveryTime: '25-35',
    priceRange: '€€',
    cuisine: 'French',
    address: '123 Rue de Paris',
    menu: [
      {
        id: '1',
        name: 'Coq au Vin',
        description: 'Classic French chicken braised with wine, mushrooms, and pearl onions',
        price: 24.50,
        image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e'
      },
      {
        id: '2',
        name: 'Beef Bourguignon',
        description: 'Tender beef stewed in red wine with carrots and herbs',
        price: 26.00,
        image: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7'
      },
      {
        id: '3',
        name: 'Ratatouille',
        description: 'Traditional Provençal stewed vegetables',
        price: 18.50,
        image: 'https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c'
      }
    ]
  },
  {
    id: '2',
    name: 'La Brasserie Parisienne',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
    rating: 4.2,
    deliveryTime: '30-45',
    priceRange: '€€€',
    cuisine: 'French',
    address: '456 Avenue des Champs',
    menu: [
      {
        id: '4',
        name: 'Steak Frites',
        description: 'Prime beef steak with crispy French fries',
        price: 28.00,
        image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e'
      },
      {
        id: '5',
        name: 'Moules Marinières',
        description: 'Mussels steamed in white wine and herbs',
        price: 22.50,
        image: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853'
      },
      {
        id: '6',
        name: 'Croque Monsieur',
        description: 'Classic French grilled ham and cheese sandwich',
        price: 16.00,
        image: 'https://images.unsplash.com/photo-1475090169767-40ed8d18f67d'
      }
    ]
  },
  {
    id: '3',
    name: 'Chez Marie',
    image: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa',
    rating: 4.8,
    deliveryTime: '20-35',
    priceRange: '€€',
    cuisine: 'French Bistro',
    address: '789 Rue Saint-Honoré',
    menu: [
      {
        id: '7',
        name: 'Quiche Lorraine',
        description: 'Savory tart with bacon and Gruyère cheese',
        price: 17.50,
        image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7'
      },
      {
        id: '8',
        name: 'Confit de Canard',
        description: 'Duck leg confit with roasted potatoes',
        price: 29.00,
        image: 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369'
      },
      {
        id: '9',
        name: 'Soupe à l\'Oignon',
        description: 'Traditional French onion soup',
        price: 14.50,
        image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548'
      }
    ]
  }
];

export const mockOrders: Order[] = [
  {
    id: '1',
    restaurantId: '1',
    status: 'delivering',
    items: [
      { id: '1', name: 'Coq au Vin', price: 22.50, quantity: 1 },
      { id: '2', name: 'Ratatouille', price: 15.00, quantity: 2 }
    ],
    total: 52.50,
    deliveryAddress: {
      id: '1',
      street: '789 Rue de Lyon',
      city: 'Paris',
      postalCode: '75001',
      label: 'Home'
    }
  }
];

export const mockReviews: Review[] = [
  {
    id: '1',
    restaurantId: '1',
    userId: '1',
    rating: 4,
    comment: 'Excellent food and quick delivery!',
    date: '2024-03-20'
  },
  {
    id: '2',
    restaurantId: '1',
    userId: '2',
    rating: 5,
    comment: 'Best French cuisine in the area!',
    date: '2024-03-19'
  }
];