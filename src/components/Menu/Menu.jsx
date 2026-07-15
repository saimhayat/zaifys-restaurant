import { useMemo, useState } from "react";
import { useReveal } from "../../hooks/useReveal";
import { menuCategories, menuItems } from "../../data/menuData";
import OrderModal from "./OrderModal";
import "./Menu.css";

function MenuCard({ item, onOrder }) {
  const ref = useReveal();

  return (
    <article ref={ref} className="menu-card reveal">
      <div className="menu-card__image">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          width="400"
          height="280"
        />

        <span className="menu-card__category">
          {item.category}
        </span>
      </div>

      <div className="menu-card__body">
        <div className="menu-card__title-row">
          <h3>{item.name}</h3>

          <span className="menu-card__price">
            {item.price}
          </span>
        </div>

        <p className="menu-card__description">
          {item.description}
        </p>

        <button
          className="menu-card__order"
          aria-label={`Order ${item.name}`}
          onClick={() => onOrder(item)}
        >
          <span>Order Now</span>

          <svg
            className="menu-card__order-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </article>
  );
}

function Menu() {
  const [activeCategory, setActiveCategory] = useState("All");

  // Selected menu item for popup
  const [selectedItem, setSelectedItem] = useState(null);

  const headRef = useReveal();

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return menuItems;

    return menuItems.filter(
      (item) => item.category === activeCategory
    );
  }, [activeCategory]);

  return (
    <>
      <section id="menu" className="menu section-padding">
        <div className="container">

          <div
            ref={headRef}
            className="section-head center reveal"
          >
            <span className="eyebrow">
              Featured Menu
            </span>

            <h2 className="section-heading">
              Five cuisines, one kitchen, no compromise
            </h2>

            <p className="section-sub">
              From smoky coal-grilled BBQ to wok-tossed Chinese and
              hand-cut steaks — a menu built to satisfy every craving
              at the table.
            </p>
          </div>

          {/* Category Tabs */}
          <div
            className="menu__tabs"
            role="tablist"
            aria-label="Menu categories"
          >
            {menuCategories.map((category) => (
              <button
                key={category}
                role="tab"
                aria-selected={activeCategory === category}
                className={`menu__tab ${
                  activeCategory === category
                    ? "menu__tab--active"
                    : ""
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Menu Grid */}
          <div className="menu__grid">
            {filteredItems.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                onOrder={setSelectedItem}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Order Modal */}
      {selectedItem && (
        <OrderModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </>
  );
}

export default Menu;