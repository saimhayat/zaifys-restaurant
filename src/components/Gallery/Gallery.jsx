import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { useBodyScrollLock } from "../../hooks/useBodyScrollLock";
import { useReveal } from "../../hooks/useReveal";
import { CloseIcon, ChevronIcon } from "../Icons";
import { galleryFilters, galleryImages } from "../../data/siteData";
import "./Gallery.css";

function Gallery() {
  const headRef = useReveal();
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredImages = useMemo(() => {
    if (activeFilter === "All") return galleryImages;
    return galleryImages.filter((img) => img.category === activeFilter);
  }, [activeFilter]);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  // The lightbox covers the page, so the page behind it must not scroll —
  // including on a phone, where a swipe on a body-only lock still scrolls.
  useBodyScrollLock(lightboxIndex !== null);

  const showNext = () =>
    setLightboxIndex((prev) => (prev + 1) % filteredImages.length);
  const showPrev = () =>
    setLightboxIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxIndex, filteredImages.length]);

  return (
    <section id="gallery" className="gallery section-padding">
      <div className="container">
        <div ref={headRef} className="section-head center reveal">
          <span className="eyebrow">Gallery</span>
          <h2 className="section-heading">A look inside the room, and onto the plate</h2>
        </div>

        {/* Filter Navigation */}
        <div className="gallery__filters">
          {galleryFilters.map((filter) => (
            <button
              key={filter}
              className={`gallery__filter ${activeFilter === filter ? "gallery__filter--active" : ""}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Masonry Image Grid */}
        <div className="gallery__masonry">
          {filteredImages.map((img, index) => (
            <button
              key={img.id}
              className="gallery__item"
              onClick={() => openLightbox(index)}
              aria-label={`View larger image: ${img.alt}`}
            >
              <img src={img.src} alt={img.alt} loading="lazy" />
              <div className="gallery__item-overlay">
                <span className="gallery__item-category">{img.category}</span>
                <div className="gallery__item-icon" aria-hidden="true">
                  <Plus size={16} strokeWidth={2.5} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer">
          <button className="lightbox__close" onClick={closeLightbox} aria-label="Close image viewer">
            <CloseIcon width="20" height="20" />
          </button>
          
          <button className="lightbox__nav lightbox__nav--prev" onClick={showPrev} aria-label="Previous image">
            <ChevronIcon width="24" height="24" style={{ transform: "rotate(180deg)" }} />
          </button>
          
          <figure className="lightbox__figure">
            <img
              key={lightboxIndex} /* Key forces remount on change to trigger CSS animation */
              src={filteredImages[lightboxIndex].src}
              alt={filteredImages[lightboxIndex].alt}
            />
            <figcaption>{filteredImages[lightboxIndex].alt}</figcaption>
          </figure>
          
          <button className="lightbox__nav lightbox__nav--next" onClick={showNext} aria-label="Next image">
            <ChevronIcon width="24" height="24" />
          </button>
        </div>
      )}
    </section>
  );
}

export default Gallery;