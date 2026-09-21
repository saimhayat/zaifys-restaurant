import { useEffect } from "react";

/**
 * Freezes page scrolling while `active` is true, restoring whatever the page
 * had before. Anything that covers the panel on a phone — the detail drawer,
 * the off-canvas nav — needs this: without it a swipe inside the overlay
 * chains through and scrolls the list behind it away.
 */
export function useBodyScrollLock(active) {
  useEffect(() => {
    if (!active) return undefined;

    // `html` owns the viewport scroll (the global sheet hides horizontal
    // overflow on it), and `body` covers browsers that hand scrolling to the
    // body instead. Locking both is what actually freezes the page.
    const root = document.documentElement;
    const body = document.body;
    const previousRootOverflow = root.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyPadding = body.style.paddingRight;

    // Freezing the page takes the scrollbar with it. Padding the body by the
    // same width puts the content back exactly where it was, so opening a
    // panel never makes the whole panel twitch sideways.
    const scrollbar = window.innerWidth - root.clientWidth;

    root.style.overflow = "hidden";
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    return () => {
      root.style.overflow = previousRootOverflow;
      body.style.overflow = previousBodyOverflow;
      body.style.paddingRight = previousBodyPadding;
    };
  }, [active]);
}
