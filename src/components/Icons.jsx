// A small set of hand-rolled line icons so the project has zero icon-library
// dependency. Every icon shares the same stroke weight and viewBox for visual
// consistency across feature cards, stats, and contact info.

const common = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24",
  width: 24, // Standard baseline fallback width
  height: 24, // Standard baseline fallback height
  "aria-hidden": "true",
};

export function LeafIcon(props) {
  return (
    <svg {...common} {...props}>
      <path d="M5 19c8-1 13-6 14-14-8 1-13 6-14 14Z" />
      <path d="M5 19c2-4 5-7 9-9" />
    </svg>
  );
}

export function ChefIcon(props) {
  return (
    <svg {...common} {...props}>
      <path d="M7 9a3 3 0 0 1 2-4 3 3 0 0 1 3-2 3 3 0 0 1 3 2 3 3 0 0 1 2 4c1 .6 1.5 1.6 1.2 2.7-.3 1-1.2 1.6-2.2 1.6H8c-1 0-1.9-.6-2.2-1.6C5.5 10.6 6 9.6 7 9Z" />
      <path d="M8 13v6h8v-6" />
      <path d="M8 19h8" />
    </svg>
  );
}

export function StarIcon({ filled, ...props }) {
  return (
    <svg 
      {...common} 
      {...props} 
      fill={filled ? "currentColor" : "none"}
    >
      <path d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6-4.5-4.2 6.1-.7L12 3Z" />
    </svg>
  );
}

export function LampIcon(props) {
  return (
    <svg {...common} {...props}>
      <path d="M12 3a5 5 0 0 1 5 5c0 2.5-2 3.8-2.6 5.5H9.6C9 12.8 7 11.5 7 8a5 5 0 0 1 5-5Z" />
      <path d="M10 16.5h4M9.5 19h5" />
    </svg>
  );
}

export function FamilyIcon(props) {
  return (
    <svg {...common} {...props}>
      <circle cx="8" cy="7" r="2.3" />
      <circle cx="16" cy="7" r="2.3" />
      <path d="M4 20v-3a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v3" />
      <path d="M12 20v-3a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v3" />
    </svg>
  );
}

export function ClockIcon(props) {
  return (
    <svg {...common} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function ShieldIcon(props) {
  return (
    <svg {...common} {...props}>
      <path d="M12 3.5 5 6v6c0 4.5 3 7.5 7 8.5 4-1 7-4 7-8.5V6l-7-2.5Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function HeartIcon(props) {
  return (
    <svg {...common} {...props}>
      <path d="M12 20s-7-4.4-9.5-9C1 7.7 2.3 5 5.3 4.4 7.5 4 9.8 5 12 8c2.2-3 4.5-4 6.7-3.6 3 .6 4.3 3.3 2.8 6.6C19 15.6 12 20 12 20Z" />
    </svg>
  );
}

export function PhoneIcon(props) {
  return (
    <svg {...common} {...props}>
      <path d="M6.5 3h3l1.5 4-2 1.5a11 11 0 0 0 5.5 5.5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z" />
    </svg>
  );
}

export function PinIcon(props) {
  return (
    <svg {...common} {...props}>
      <path d="M12 21s7-6.3 7-11.5A7 7 0 0 0 5 9.5C5 14.7 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.3" />
    </svg>
  );
}

export function ClockOutlineIcon(props) {
  return <ClockIcon {...props} />;
}

export function MenuIcon(props) {
  return (
    <svg {...common} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon(props) {
  return (
    <svg {...common} {...props}>
      <path d="M5 5l14 14M19 5 5 19" />
    </svg>
  );
}

export function ArrowDownIcon(props) {
  return (
    <svg {...common} {...props}>
      <path d="M12 4v15M6 13l6 6 6-6" />
    </svg>
  );
}

export function QuoteIcon(props) {
  return (
    <svg {...common} {...props} strokeWidth="0" fill="currentColor" viewBox="0 0 32 24">
      <path d="M0 24V14.6C0 6.4 4.7 1 12.8 0l1.6 4.3C9 5.6 6.6 8.4 6.4 12.6H13V24H0Zm18 0V14.6C18 6.4 22.7 1 30.8 0l1.6 4.3C27 5.6 24.6 8.4 24.4 12.6H31V24H18Z" />
    </svg>
  );
}

export function ChevronIcon(props) {
  return (
    <svg {...common} {...props}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

export function FacebookIcon(props) {
  return (
    <svg {...common} {...props}>
      <path d="M14 8.5h2.5V5H14c-2 0-3.5 1.6-3.5 3.6V11H8v3.5h2.5V21H14v-6.5h2.4l.6-3.5h-3V9c0-.3.3-1 1-1Z" />
    </svg>
  );
}

export function InstagramIcon(props) {
  return (
    <svg {...common} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function WhatsappIcon(props) {
  return (
    <svg {...common} {...props}>
      <path d="M6 18.5 4.8 21.5 8 20.3A8.5 8.5 0 1 0 6 18.5Z" />
      <path d="M9 9.3c0 3 2.7 5.7 5.7 5.7.6 0 .9-.5.7-1l-.6-1.4a.8.8 0 0 0-.9-.4l-1 .3a5 5 0 0 1-2.4-2.4l.3-1a.8.8 0 0 0-.4-.9L9.4 7.6c-.5-.2-1 .1-1 .7 0 .4.3.7.6 1Z" />
    </svg>
  );
}

const ICONS = {
  leaf: LeafIcon,
  chef: ChefIcon,
  star: StarIcon,
  lamp: LampIcon,
  family: FamilyIcon,
  clock: ClockIcon,
  shield: ShieldIcon,
  heart: HeartIcon,
};

export function FeatureIcon({ name, ...props }) {
  const Icon = ICONS[name] || StarIcon;
  return <Icon {...props} />;
}