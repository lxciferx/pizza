import React, { useState } from 'react';
import { Pizza, ChevronLeft, ChevronRight, Phone, MapPin, Clock, ShoppingCart, X, Plus, Minus } from 'lucide-react';

interface PizzaItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface CartItem extends PizzaItem {
  quantity: number;
}

interface MenuItem {
  name: string;
  description: string;
  price: number;
  image: string;
}

function App() {
  const [currentPizza, setCurrentPizza] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const pizzas: PizzaItem[] = [
    {
      id: 1,
      name: "Margherita Supreme",
      description: "Fresh basil, mozzarella, and our signature tomato sauce",
      price: 14.99,
      image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      name: "Pepperoni Paradise",
      description: "Double pepperoni, extra cheese, and Italian herbs",
      price: 16.99,
      image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      name: "Veggie Delight",
      description: "Bell peppers, mushrooms, onions, and black olives",
      price: 15.99,
      image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const menuItems = [
    {
      category: "Signature Pizzas",
      items: [
        {
          name: "The Royal Feast",
          description: "24K gold leaf, caviar, truffle, wagyu beef, and buffalo mozzarella",
          price: 999.99,
          image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80"
        },
        {
          name: "Lobster Luxury",
          description: "Fresh lobster, scallops, shrimp, garlic butter sauce",
          price: 599.99,
          image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80"
        }
      ]
    },
    {
      category: "Premium Selection",
      items: [
        {
          name: "Truffle Paradise",
          description: "Black truffle shavings, wild mushrooms, fontina cheese",
          price: 299.99,
          image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&q=80"
        },
        {
          name: "Wagyu Wonder",
          description: "Premium wagyu beef, caramelized onions, gorgonzola",
          price: 249.99,
          image: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=800&q=80"
        }
      ]
    },
    {
      category: "Classic Collection",
      items: [
        {
          name: "Mediterranean Dream",
          description: "Kalamata olives, feta, sun-dried tomatoes, oregano",
          price: 149.99,
          image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80"
        },
        {
          name: "Four Cheese Royale",
          description: "Mozzarella, gorgonzola, parmesan, ricotta",
          price: 129.99,
          image: "https://images.unsplash.com/photo-1548369937-47519962c11a?auto=format&fit=crop&w=800&q=80"
        }
      ]
    }
  ];

  const nextPizza = () => {
    setCurrentPizza((prev) => (prev + 1) % pizzas.length);
  };

  const prevPizza = () => {
    setCurrentPizza((prev) => (prev - 1 + pizzas.length) % pizzas.length);
  };

  const addToCart = (item: MenuItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.name === item.name);
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevItems, { ...item, id: Date.now(), quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (itemName: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.name !== itemName));
  };

  const updateQuantity = (itemName: string, delta: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => {
        if (item.name === itemName) {
          const newQuantity = item.quantity + delta;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-orange-200">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm fixed w-full z-50 shadow-md">
        <nav className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Pizza className="h-8 w-8 text-orange-500" />
                <span className="text-xl sm:text-2xl font-bold text-gray-800">Pizzeria 3D</span>
              </div>
              <button 
                className="sm:hidden relative bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors flex items-center gap-2"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
            <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6">
              <a href="#menu" className="text-gray-600 hover:text-orange-500 transition-colors text-sm sm:text-base">Menu</a>
              <a href="#contact" className="text-gray-600 hover:text-orange-500 transition-colors text-sm sm:text-base">Contact</a>
              <button 
                className="hidden sm:flex relative bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors items-center gap-2"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-5 w-5" />
                Cart
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl sm:text-2xl font-bold">Your Cart</h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.name} className="flex items-center gap-3 sm:gap-4 border-b pb-4">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm sm:text-base truncate">{item.name}</h3>
                        <p className="text-gray-500 text-sm">${item.price}</p>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <button 
                          onClick={() => updateQuantity(item.name, -1)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-6 sm:w-8 text-center text-sm sm:text-base">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.name, 1)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => removeFromCart(item.name)}
                          className="ml-1 sm:ml-2 text-red-500 hover:text-red-700"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold">Total:</span>
                    <span className="text-lg sm:text-xl font-bold">${cartTotal.toFixed(2)}</span>
                  </div>
                  <button 
                    className="w-full bg-orange-500 text-white py-3 rounded-full hover:bg-orange-600 transition-colors text-sm sm:text-base"
                    onClick={() => alert('Checkout functionality coming soon!')}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Hero Section with 3D Effect */}
      <div className="pt-24 sm:pt-32 min-h-screen flex items-center">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Pizza Showcase */}
            <div className="flex-1 relative w-full max-w-xl mx-auto md:max-w-none">
              <div className="relative group perspective">
                <div className="relative transform transition-transform duration-1000 preserve-3d hover:rotate-y-180">
                  <img
                    src={pizzas[currentPizza].image}
                    alt={pizzas[currentPizza].name}
                    className="w-full h-[250px] sm:h-[350px] md:h-[400px] object-cover rounded-2xl shadow-2xl"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-between px-4">
                  <button
                    onClick={prevPizza}
                    className="bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextPizza}
                    className="bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Pizza Details */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
                {pizzas[currentPizza].name}
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-6">
                {pizzas[currentPizza].description}
              </p>
              <div className="text-2xl sm:text-3xl font-bold text-orange-500 mb-8">
                ${pizzas[currentPizza].price}
              </div>
              <button 
                onClick={() => addToCart(pizzas[currentPizza])}
                className="bg-orange-500 text-white px-6 sm:px-8 py-3 rounded-full text-base sm:text-lg font-semibold hover:bg-orange-600 transition-colors transform hover:scale-105"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div id="menu" className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16">Our Menu</h2>
          {menuItems.map((category, index) => (
            <div key={index} className="mb-12 sm:mb-16">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">{category.category}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-40 sm:h-48 object-cover"
                    />
                    <div className="p-4 sm:p-6">
                      <div className="flex justify-between items-start mb-3 sm:mb-4">
                        <h4 className="text-lg sm:text-xl font-bold text-gray-800">{item.name}</h4>
                        <span className="text-xl sm:text-2xl font-bold text-orange-500">${item.price}</span>
                      </div>
                      <p className="text-sm sm:text-base text-gray-600">{item.description}</p>
                      <button 
                        onClick={() => addToCart(item)}
                        className="mt-4 sm:mt-6 w-full bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors text-sm sm:text-base"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="bg-white py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Visit Us Today</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-4 sm:p-6 bg-orange-50 rounded-lg">
              <Phone className="h-8 w-8 mx-auto mb-4 text-orange-500" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Call Us</h3>
              <p className="text-gray-600">(555) 123-4567</p>
            </div>
            <div className="text-center p-4 sm:p-6 bg-orange-50 rounded-lg">
              <MapPin className="h-8 w-8 mx-auto mb-4 text-orange-500" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Location</h3>
              <p className="text-gray-600">123 Pizza Street, NY 10001</p>
            </div>
            <div className="text-center p-4 sm:p-6 bg-orange-50 rounded-lg sm:col-span-2 md:col-span-1">
              <Clock className="h-8 w-8 mx-auto mb-4 text-orange-500" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Hours</h3>
              <p className="text-gray-600">Mon-Sun: 11AM - 10PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;