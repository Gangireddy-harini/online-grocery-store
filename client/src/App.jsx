
import { useState } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "Fresh Tomatoes",
    category: "Vegetables",
    price: 30,
    image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400",
  },
  {
    id: 2,
    name: "Fresh Apples",
    category: "Fruits",
    price: 120,
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400",
  },
  {
    id: 3,
    name: "Fresh Milk",
    category: "Dairy",
    price: 28,
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400",
  },
  {
    id: 4,
    name: "Fresh Carrots",
    category: "Vegetables",
    price: 40,
    image: "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=400",
  },
  {
    id: 5,
    name: "Bananas",
    category: "Fruits",
    price: 50,
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400",
  },
  {
    id: 6,
    name: "Bread",
    category: "Bakery",
    price: 35,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400",
  },
  {
    id: 7,
    name: "Eggs",
    category: "Dairy",
    price: 70,
    image: "https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=400",
  },
  {
    id: 8,
    name: "Orange Juice",
    category: "Beverages",
    price: 90,
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400",
  },
];

function App() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const addToCart = (product) => {
    setCart((current) => {
      const existing = current.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });
  };

  const changeQuantity = (id, amount) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="app">

      {/* Navigation Bar */}
      <header className="navbar">
        <h2>🥬 grocery</h2>

        <nav>
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#cart">My Cart ({cartCount})</a>
        </nav>
      </header>

      {/* Home Banner */}
      <section className="hero" id="home">
        <div>
          <p className="tagline">
            FRESHNESS AT YOUR DOORSTEP
          </p>

          <h1>
            Fresh Groceries,
            <br />
            Happy Living!
          </h1>

          <p>
            Shop fresh fruits, vegetables and daily essentials.
          </p>

          <a href="#products" className="shop-button">
            Shop Now
          </a>
        </div>
      </section>

      {/* Products Section */}
      <main>
        <section id="products">
          <h2 className="section-title">
            Explore Our Products
          </h2>

          <input
            className="search"
            type="text"
            placeholder="Search groceries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Categories */}
          <div className="categories">
            {[
              "All",
              "Fruits",
              "Vegetables",
              "Dairy",
              "Bakery",
              "Beverages",
            ].map((item) => (
              <button
                key={item}
                className={category === item ? "active" : ""}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Product Cards */}
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <div className="product-card" key={product.id}>
                <img
                  src={product.image}
                  alt={product.name}
                />

                <div className="product-info">
                  <p className="product-category">
                    {product.category}
                  </p>

                  <h3>{product.name}</h3>

                  <p className="price">
                    ₹{product.price}
                  </p>

                  <button
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart +
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <p>No products found.</p>
          )}
        </section>

        {/* Shopping Cart */}
        <section className="cart-section" id="cart">
          <h2 className="section-title">
            🛒 Your Shopping Cart
          </h2>

          {cart.length === 0 ? (
            <p>Your cart is empty. Start shopping!</p>
          ) : (
            <>
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <span>
                    {item.name} - ₹{item.price}
                  </span>

                  <div className="quantity">
                    <button
                      onClick={() =>
                        changeQuantity(item.id, -1)
                      }
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        changeQuantity(item.id, 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}

              <h3 className="total">
                Total: ₹{total}
              </h3>

              <button
                className="checkout"
                onClick={() =>
                  alert("Checkout feature will be added next!")
                }
              >
                Proceed to Checkout
              </button>
            </>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer>
        <p>
          © 2026 FreshBasket | Online Grocery Store
        </p>
      </footer>

    </div>
  );
}

export default App;
