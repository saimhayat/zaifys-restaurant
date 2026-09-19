import { useMemo, useState } from "react";
import { Clock, Search, X } from "lucide-react";
import { useReveal } from "../../hooks/useReveal";
import { menuCategories } from "../../data/menuData";
import { useAdminMenu } from "../../store/restaurantStore";
import { defaultSize, formatRs } from "../../utils/price";
import OrderModal from "./OrderModal";
import "./Menu.css";

function MenuCard({ item, onOrder }) {
  const ref = useReveal();
  const isSoldOut = item.available === false;
  const leadSize = defaultSize(item);

  return (
    <article
      ref={ref}
      className={`menu-card reveal ${isSoldOut ? "menu-card--soldout" : ""}`}
    >
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

        <span className="menu-card__prep">
          <Clock size={12} strokeWidth={2.25} aria-hidden="true" />
          {item.prepTime} min
        </span>

        {isSoldOut && <span className="menu-card__soldout">Sold Out</span>}
      </div>

      <div className="menu-card__body">
        <div className="menu-card__title-row">
          <h3>{item.name}</h3>

          <span className="menu-card__price">
            {formatRs(leadSize?.price)}
          </span>
        </div>

        <p className="menu-card__description">
          {item.description}
        </p>

        <ul className="menu-card__tags">
          {item.tags.slice(0, 2).map((tag) => (
            <li key={tag} className="menu-card__tag">
              {tag}
            </li>
          ))}
        </ul>

        <button
          className="menu-card__order"
          aria-label={isSoldOut ? `${item.name} is sold out` : `Order ${item.name}`}
          onClick={() => onOrder(item)}
          disabled={isSoldOut}
        >
          <span>{isSoldOut ? "Sold Out" : "Order Now"}</span>

          {!isSoldOut && (
            <svg
              className="menu-card__order-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          )}
        </button>
      </div>
    </article>
  );
}

function Menu() {
  // The live menu — admin edits (price, availability, badges, tags) appear
  // here immediately because both read the same store.
  const menuItems = useAdminMenu();

  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  // Selected menu item for popup
  const [selectedItem, setSelectedItem] = useState(null);

  const headRef = useReveal();

  const filteredItems = useMemo(() => {
    let items = menuItems;
    if (activeCategory !== "All") {
      items = items.filter((item) => item.category === activeCategory);
    }
    const q = query.trim().toLowerCase();
    if (q) {
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
      );
    }
    return items;
  }, [activeCategory, query, menuItems]);

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
          </div>          {/* Search + Category Tabs */}
          <div className="menu__toolbar">
            <div className="menu__search">
              <Search size={16} strokeWidth={2} className="menu__search-icon" />
              <input
                type="search"
                className="menu__search-input"
                placeholder="Search dishes…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search the menu"
              />
              {query && (
                <button
                  className="menu__search-clear"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                >
                  <X size={14} strokeWidth={2.25} />
                </button>
              )}
            </div>
          </div>

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
            ))
            }
          </div>

          {/* Menu Grid */}
          {filteredItems.length > 0 ? (
            <div className="menu__grid">
              {filteredItems.map((item) => (
                <MenuCard
                  key={item.id}
                  item={item}
                  onOrder={setSelectedItem}
                />
              ))}
            </div>
          ) : (
            <div className="menu__empty">
              <Search size={40} strokeWidth={1.5} />
              <h3>No dishes found</h3>
              <p>
                Nothing matches &ldquo;{query}&rdquo;
                {activeCategory !== "All" && <> in {activeCategory}</>}. Try a
                different search or category.
              </p>
              <button
                className="btn btn-outline"
                onClick={() => {
                  setQuery("");
                  setActiveCategory("All");
                }}
              >
                Show Full Menu
              </button>
            </div>
          )}
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