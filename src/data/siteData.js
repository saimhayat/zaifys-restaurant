export const testimonials = [
  {
    id: 1,
    name: "Ayesha Malik",
    role: "Google Review",
    rating: 5,
    quote:
      "Ambience felt like a proper hotel restaurant, not a Satellite Town spot. The Chicken Karahi tasted like it was made for a wedding, not a weeknight.",
  },
  {
    id: 2,
    name: "Bilal Ahmed",
    role: "Google Review",
    rating: 5,
    quote:
      "Genuinely a hidden gem. Staff remembered our order preferences from last visit, and the hygiene standards are visibly higher than most places nearby.",
  },
  {
    id: 3,
    name: "Sana Tariq",
    role: "Google Review",
    rating: 4,
    quote:
      "Took the whole family for a Sunday dinner — kids loved the fries, we loved the BBQ platter. Great value for a fine-dining feel.",
  },
  {
    id: 4,
    name: "Hamza Raza",
    role: "Google Review",
    rating: 5,
    quote:
      "The Moroccan Steak surprised me — cooked exactly to order, proper rest time, real char. Didn't expect that quality in this price range.",
  },
  {
    id: 5,
    name: "Fatima Iqbal",
    role: "Google Review",
    rating: 5,
    quote:
      "Their Chinese section is underrated — Singapore Chowmein was better than most dedicated Chinese restaurants I've tried in Rawalpindi.",
  },
  {
    id: 6,
    name: "Usman Sheikh",
    role: "Google Review",
    rating: 4,
    quote:
      "Friendly staff, fast service even on a busy Friday night. Interior lighting makes it a good spot for family photos too.",
  },
];

export const galleryImages = [
  {
    id: 1,
    alt: "Elegant dark dining hall with warm pendant lighting at Zaify's Restaurant",
    category: "Interior",
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    alt: "Chicken karahi served in traditional wok",
    category: "Pakistani",
    src: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    alt: "Family enjoying dinner together at a restaurant table",
    category: "Family",
    src: "https://images.unsplash.com/photo-1529543544282-ea669407fca3?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    alt: "Skewers of seekh kabab grilling over open coals",
    category: "BBQ",
    src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    alt: "Wok-tossed Chinese noodles with vegetables",
    category: "Chinese",
    src: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    alt: "Seared steak resting on a wooden board",
    category: "Steaks",
    src: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 7,
    alt: "Chocolate lava cake with molten centre and ice cream",
    category: "Desserts",
    src: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 8,
    alt: "Fresh fruit juices and shakes lined up on a marble counter",
    category: "Drinks",
    src: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 9,
    alt: "Professional chef plating a dish in the kitchen",
    category: "Chefs",
    src: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=900&q=80",
  },
];

export const galleryFilters = [
  "All",
  "Interior",
  "Pakistani",
  "BBQ",
  "Chinese",
  "Steaks",
  "Desserts",
  "Drinks",
  "Family",
  "Chefs",
];

export const stats = [
  { id: 1, value: 673, suffix: "+", label: "Happy Reviews" },
  { id: 2, value: 4.3, suffix: "★", label: "Google Rating", isDecimal: true },
  { id: 3, value: 100, suffix: "+", label: "Signature Dishes" },
  { id: 4, value: 1000, suffix: "+", label: "Happy Customers" },
];

export const features = [
  {
    id: 1,
    title: "Fresh Ingredients",
    description: "Sourced daily from trusted local markets, never held over.",
    icon: "leaf",
  },
  {
    id: 2,
    title: "Expert Chefs",
    description: "Seasoned hands trained across Pakistani, Chinese and continental kitchens.",
    icon: "chef",
  },
  {
    id: 3,
    title: "Premium Taste",
    description: "Every recipe balanced and tested before it reaches your table.",
    icon: "star",
  },
  {
    id: 4,
    title: "Luxury Ambience",
    description: "Warm lighting, comfortable seating, and a room that feels occasion-worthy.",
    icon: "lamp",
  },
  {
    id: 5,
    title: "Family Friendly",
    description: "Spacious seating and a menu that works for every generation at the table.",
    icon: "family",
  },
  {
    id: 6,
    title: "Fast Service",
    description: "Attentive staff and a kitchen built to keep pace without cutting corners.",
    icon: "clock",
  },
  {
    id: 7,
    title: "Excellent Hygiene",
    description: "Rigorous kitchen standards, visible cleanliness, every single service.",
    icon: "shield",
  },
  {
    id: 8,
    title: "Friendly Staff",
    description: "A team that remembers regulars and treats first-timers the same way.",
    icon: "heart",
  },
];

export const restaurantInfo = {
  name: "Zaify's Restaurant",
  tagline: "Where Every Meal Becomes a Memory.",
  address: "57-B, Block B, Commercial Market, Satellite Town, Rawalpindi, Pakistan",
  phone: "+92 300 6165529",
  phoneHref: "+923006165529",
  rating: 4.3,
  reviews: 673,
  priceRange: "Rs. 1000 – 2000",
  hours: [
    { day: "Monday – Thursday", time: "12:00 PM – 11:30 PM" },
    { day: "Friday", time: "1:00 PM – 12:30 AM" },
    { day: "Saturday – Sunday", time: "12:00 PM – 12:30 AM" },
  ],
  services: ["Dine In", "Takeaway", "No Contact Delivery"],
};
