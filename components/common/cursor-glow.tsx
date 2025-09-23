"use client";

import { useEffect, useMemo, useState } from "react";
import { isMobileDevice } from "@/lib/mobile-utils";

type CursorVariant = "default" | "pointer" | "text" | "nav";

type Coordinates = {
  x: number;
  y: number;
};

const defaultCoords: Coordinates = { x: 0, y: 0 };

const CursorGlow = () => {
  const [coordinates, setCoordinates] = useState<Coordinates>(defaultCoords);
  const [glowCoordinates, setGlowCoordinates] = useState<Coordinates>(defaultCoords);
  const [isPointerDown, setIsPointerDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [glowOffset, setGlowOffset] = useState<Coordinates>({ x: 0, y: 0 });
  const [showClickGlow, setShowClickGlow] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
    borderRadius: number;
  } | null>(null);
  const [isLightMode, setIsLightMode] = useState(() => {
    // Initialize with correct theme state to prevent hydration mismatch
    if (typeof window !== 'undefined') {
      return document.documentElement.getAttribute('data-theme') === 'light';
    }
    return false; // SSR fallback
  });

  // Track whether mobile nav is open (set as a body attribute by SiteHeader)
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const attr = document.body.getAttribute('data-nav-open') === 'true';
      setIsNavMenuOpen(attr);
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-nav-open'] });
    // Initialize
    setIsNavMenuOpen(document.body.getAttribute('data-nav-open') === 'true');
    return () => observer.disconnect();
  }, []);

  // Observe theme changes on root element
  useEffect(() => {
    const checkTheme = () => {
      const root = document.documentElement;
      const isLight = root.getAttribute('data-theme') === 'light';
      setIsLightMode(isLight);
    };
    
    // Check immediately in case theme was set by the blocking script
    checkTheme();
    
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");

    const handleMediaChange = (event: MediaQueryList | MediaQueryListEvent) => {
      setIsFinePointer(event.matches);
    };

    const handleChangeEvent = (event: MediaQueryListEvent) => handleMediaChange(event);

    handleMediaChange(mediaQuery);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChangeEvent);
    } else if (typeof mediaQuery.addListener === "function") {
      mediaQuery.addListener(handleChangeEvent);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", handleChangeEvent);
      } else if (typeof mediaQuery.removeListener === "function") {
        mediaQuery.removeListener(handleChangeEvent);
      }
    };
  }, []);

  useEffect(() => {
    const body = document.body;
    const className = "has-custom-cursor";

    if (!body) {
      return undefined;
    }

    if (isFinePointer) {
      body.classList.add(className);
    } else {
      body.classList.remove(className);
    }

    return () => {
      body.classList.remove(className);
    };
  }, [isFinePointer]);

  useEffect(() => {
    if (!isFinePointer) {
      setIsVisible(false);
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      setCoordinates({ x: event.clientX, y: event.clientY });
      setIsVisible(true);

      if (event.target instanceof Element) {
        // Function to find the closest interactive element
        const findInteractiveElement = (element: Element): Element | null => {
          let current: Element | null = element;
          
          while (current && current !== document.body) {
            const computedStyle = window.getComputedStyle(current);
            const computedCursor = computedStyle.cursor;
            
            // Check if current element is interactive
            const isInteractive = computedCursor === "pointer" || 
                                 current.tagName === "A" || 
                                 current.tagName === "BUTTON" ||
                                 current.hasAttribute("onclick") ||
                                 current.getAttribute("role") === "button";
            
            if (isInteractive) {
              return current;
            }
            
            current = current.parentElement;
          }
          
          return null;
        };

        const interactiveElement = findInteractiveElement(event.target);
        
        if (interactiveElement) {
          const computedStyle = window.getComputedStyle(interactiveElement);
          const computedCursor = computedStyle.cursor;
          const isTextTarget =
            computedCursor === "text" ||
            interactiveElement.tagName === "INPUT" ||
            interactiveElement.tagName === "TEXTAREA" ||
            (interactiveElement instanceof HTMLElement ? interactiveElement.isContentEditable : false);
          
          if (!isTextTarget) {
            // Check if it's a navigation link (only inside nav element, not all header elements)
            const isNavLink = interactiveElement.closest('nav') !== null;
            
            setVariant(isNavLink ? "nav" : "pointer");
            
            // Calculate element dimensions - cache expensive calculations
            const rect = interactiveElement.getBoundingClientRect();
            const paddingTop = parseFloat(computedStyle.paddingTop) || 0;
            const paddingRight = parseFloat(computedStyle.paddingRight) || 0;
            const paddingBottom = parseFloat(computedStyle.paddingBottom) || 0;
            const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;

            const isBrandLink = interactiveElement.hasAttribute('data-brand-link');

            // Base visual padding (symmetrical) for non-nav interactive elements
            const visualPadding = 8;
            const borderRadius = parseFloat(computedStyle.borderRadius) || 8;
            let totalWidth = rect.width + (visualPadding * 2);
            let totalHeight = rect.height + (visualPadding * 2);

            // Extra right-only padding for brand link to create a "tag" feel
            // Keeps left edge snug while giving breathing room on the right
            const extraRightPadding = isBrandLink ? 16 : 0; // tweakable

            // Border radius logic
            const maxBorderRadius = totalHeight / 2;
            let finalBorderRadius: number;

            if (isNavLink) {
              finalBorderRadius = 4; // match nav link rounding
              totalWidth = rect.width; // nav links stay tight (no added visual padding)
              totalHeight = rect.height;
            } else {
              finalBorderRadius = Math.max(borderRadius, Math.min(maxBorderRadius, 24));
            }

            // Apply asymmetric expansion for brand link (only extend width to the right)
            if (!isNavLink && isBrandLink) {
              totalWidth += extraRightPadding; // extend width to right side only
            }

            // Compute center X taking into account asymmetric right extension.
            // Left boundary should remain rect.left - visualPadding (for symmetry) unless nav link
            let centerX: number;
            if (isNavLink) {
              centerX = rect.left + rect.width / 2;
            } else {
              const baseLeft = rect.left - (isBrandLink ? visualPadding * 2 : visualPadding); // original left with padding
              const effectiveWidth = rect.width + visualPadding * 2 + (isBrandLink ? extraRightPadding : 0);
              centerX = baseLeft + effectiveWidth / 2;
            }

            setHoveredElement({
              x: centerX,
              y: rect.top + rect.height / 2,
              width: isNavLink ? rect.width : totalWidth,
              height: isNavLink ? rect.height : totalHeight,
              borderRadius: finalBorderRadius,
            });
          } else {
            setHoveredElement(null);
            setVariant("text");
          }
        } else {
          setHoveredElement(null);
          setVariant("default");
        }
      }
    };

    const handlePointerDown = () => {
      setIsPointerDown(true);
      setShowClickGlow(true);
    };
    
    const handlePointerUp = () => {
      setIsPointerDown(false);
      // Delay hiding the click glow to allow smooth fade-out
      setTimeout(() => {
        setShowClickGlow(false);
      }, 200); // Increased delay for smoother transition
    };

    const handlePointerLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);
    document.addEventListener("mouseleave", handlePointerLeave);
    window.addEventListener("blur", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
      document.removeEventListener("mouseleave", handlePointerLeave);
      window.removeEventListener("blur", handlePointerLeave);
    };
  }, [isFinePointer]);

  // Fluid glow animation with lag and organic movement
  useEffect(() => {
    if (!isFinePointer) return;

    let animationId: number;
    let lastTime = 0;

    const animateGlow = (currentTime: number) => {
      if (currentTime - lastTime > 33) { // Back to ~30fps for smoother goo effect
        setGlowCoordinates(prev => {
          // Balanced lag for visible goo effect
          const lagFactor = 0.03; // Less extreme lag, still goo-like but visible
          
          // Enhanced organic movement for goo-like fluidity with random character
          const time = currentTime * 0.001;
          
          // Base organic movement (smooth waves) - visible but not overwhelming
          const organicX = Math.sin(time * 1.2) * 18 + Math.cos(time * 0.8) * 12;
          const organicY = Math.cos(time * 1.1) * 18 + Math.sin(time * 0.9) * 12;
          
          // Random movement with character - larger but controlled
          const randomX = Math.sin(time * 2.37) * 12 + Math.cos(time * 3.14) * 8 + Math.sin(time * 5.67) * 5;
          const randomY = Math.cos(time * 2.83) * 12 + Math.sin(time * 4.19) * 8 + Math.cos(time * 6.41) * 5;
          
          // Chaotic micro-movements - visible but not excessive
          const chaoticX = Math.sin(time * 12.7) * 4 + Math.cos(time * 18.3) * 3;
          const chaoticY = Math.cos(time * 15.1) * 4 + Math.sin(time * 21.9) * 3;
          
          // Occasional "impulses" - controlled size
          const impulseX = Math.sin(time * 0.3) > 0.9 ? (Math.random() * 20 - 10) : 0;
          const impulseY = Math.cos(time * 0.4) > 0.9 ? (Math.random() * 20 - 10) : 0;
          
          // Goo deformation - reduced for stability
          const deformX = (prev.x - coordinates.x) * 0.2; // Reduced deformation
          const deformY = (prev.y - coordinates.y) * 0.2;
          
          // Controlled drag-based deformation
          const velocityX = coordinates.x - prev.x;
          const velocityY = coordinates.y - prev.y;
          const dragDeformX = -velocityX * 1; // Reduced drag effect
          const dragDeformY = -velocityY * 1;
          
          // Combine movements with limits to keep glow near cursor
          const totalOffsetX = Math.max(-50, Math.min(50, organicX + randomX + chaoticX + impulseX + deformX + dragDeformX));
          const totalOffsetY = Math.max(-50, Math.min(50, organicY + randomY + chaoticY + impulseY + deformY + dragDeformY));
          
          // Target position with bounded organic offset
          const targetX = coordinates.x + totalOffsetX;
          const targetY = coordinates.y + totalOffsetY;
          
          // Smooth interpolation towards target with balanced goo-like lag
          return {
            x: prev.x + (targetX - prev.x) * lagFactor,
            y: prev.y + (targetY - prev.y) * lagFactor,
          };
        });
        
        lastTime = currentTime;
      }
      
      animationId = requestAnimationFrame(animateGlow);
    };

    animationId = requestAnimationFrame(animateGlow);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [coordinates, isFinePointer]);

  const { glowDiameter, glowColor, glowOpacity, cursorSize, cursorColor, borderRadius: variantBorderRadius } = useMemo(() => {
    const variantSettings: Record<CursorVariant, {
      glowDiameter: number;
      glowColor: string;
      glowOpacity: number;
      cursorSize: number;
      cursorColor: string;
      borderRadius: number;
    }> = {
      default: {
        glowDiameter: 820, // Unified base size
        glowColor: "255, 119, 214",
        glowOpacity: 0.25, // Slightly increased
        cursorSize: 14,
        cursorColor: "214, 226, 255",
        borderRadius: 7, // Half of cursorSize for perfect circle
      },
      pointer: {
        glowDiameter: 820, // Unified (remove hover enlargement perception)
        glowColor: "255, 119, 214",
        glowOpacity: 0.35, // Increased
        cursorSize: 18,
        cursorColor: "255, 119, 214",
        borderRadius: 32, // Pill shape for buttons
      },
      text: {
        glowDiameter: 820, // Unified for consistency
        glowColor: "56, 189, 248",
        glowOpacity: 0.3, // Increased
        cursorSize: 10,
        cursorColor: "148, 163, 255",
        borderRadius: 5, // Half of cursorSize for perfect circle
      },
      nav: {
        glowDiameter: 820, // Unified
        glowColor: "255, 255, 255",
        glowOpacity: 0.2, // Slightly increased
        cursorSize: 16,
        cursorColor: "255, 255, 255",
        borderRadius: 8, // Fixed rounded rectangle for nav
      },
    };

    return variantSettings[variant];
  }, [variant]);

  // Goo-like shape: velocity stretch only (no hover enlargement) + subtle organic wobble
  const glowStyle = useMemo(() => {
    const t = Date.now() * 0.001;
    const vx = glowCoordinates.x - coordinates.x;
    const vy = glowCoordinates.y - coordinates.y;
    const speed = Math.sqrt(vx * vx + vy * vy);

    const base = glowDiameter; // unified base size
    // Stronger stretch for goo feel
    const stretch = Math.min(speed * 0.55, 180); // higher multiplier & cap
    const width = base + stretch;
    const height = base - stretch * 0.32; // more flattening

    // Organic pulsation independent of hover (very subtle)
    const wobbleScaleX = 1 + Math.sin(t * 1.6) * 0.06 + Math.sin(t * 3.3) * 0.025;
    const wobbleScaleY = 1 + Math.cos(t * 1.4) * 0.05 + Math.sin(t * 2.9) * 0.02;
    const angle = vx * 0.045; // slight orientation

    return {
      width,
      height,
      transform: `translate3d(-50%, -50%, 0) scale(${wobbleScaleX}, ${wobbleScaleY}) rotate(${angle}deg)`,
      baseOpacity: 0.38, // constant (no hover bump)
    };
  }, [glowCoordinates, coordinates, glowDiameter]);

  if (!isFinePointer || isMobileDevice()) {
    return null;
  }

  return (
    <>
      {/* Dynamic grid overlay that follows the glow */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          backgroundImage: isLightMode 
            ? `
              linear-gradient(0deg, rgba(71, 85, 105, 0.4) 1.35px, transparent 0),
              linear-gradient(90deg, rgba(71, 85, 105, 0.4) 1.35px, transparent 0),
              radial-gradient(circle, rgba(51, 65, 85, 0.35) 1px, transparent 0)
            `
            : `
              linear-gradient(0deg, rgba(210, 218, 255, 0.3) 1.35px, transparent 0),
              linear-gradient(90deg, rgba(210, 218, 255, 0.3) 1.35px, transparent 0),
              radial-gradient(circle, rgba(148, 163, 184, 0.28) 1px, transparent 0)
            `,
          backgroundSize: "80px 80px, 80px 80px, 80px 80px",
          backgroundPosition: "0 0, 0 0, 40px 40px",
          maskImage: `radial-gradient(circle ${glowDiameter * 1.2}px at ${glowCoordinates.x}px ${glowCoordinates.y}px, 
            black 0%, 
            black 40%, 
            transparent 80%)`,
          WebkitMaskImage: `radial-gradient(circle ${glowDiameter * 1.2}px at ${glowCoordinates.x}px ${glowCoordinates.y}px, 
            black 0%, 
            black 40%, 
            transparent 80%)`,
          opacity: isNavMenuOpen ? 0 : (isVisible ? (isLightMode ? 0.12 : 0.1) : 0),
          transition: "opacity 400ms ease, mask-image 200ms ease, -webkit-mask-image 200ms ease",
          zIndex: -1, // Behind all content including sections
        }}
      />
      
      {/* Vibrant blue/pink gradient overlay that follows the glow */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          background: isLightMode 
            ? `
              radial-gradient(circle at 30% 20%, rgba(84, 234, 234, 0.8), transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(255, 119, 198, 0.8), transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(172, 101, 228, 0.7), transparent 50%),
              linear-gradient(135deg, 
                rgba(147, 234, 234, 0.4) 0%, 
                rgba(6, 182, 212, 0.5) 25%, 
                rgba(16, 185, 129, 0.3) 50%, 
                rgba(245, 101, 101, 0.4) 75%, 
                rgba(236, 72, 153, 0.4) 100%
              )
            `
            : `
              radial-gradient(circle at 30% 20%, rgba(80, 79, 138, 0.5), transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(180, 79, 138, 0.5), transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(24, 141, 168, 0.4), transparent 50%),
              linear-gradient(135deg, 
                rgba(97, 31, 154, 0.25) 0%, 
                rgba(4, 122, 142, 0.3) 25%, 
                rgba(12, 125, 89, 0.2) 50%, 
                rgba(165, 71, 71, 0.25) 75%, 
                rgba(156, 52, 103, 0.25) 100%
              )
            `,
          maskImage: `radial-gradient(circle ${glowDiameter * 1.3}px at ${glowCoordinates.x}px ${glowCoordinates.y}px, 
            black 0%, 
            black 30%, 
            transparent 70%)`,
          WebkitMaskImage: `radial-gradient(circle ${glowDiameter * 1.3}px at ${glowCoordinates.x}px ${glowCoordinates.y}px, 
            black 0%, 
            black 30%, 
            transparent 70%)`,
          opacity: isNavMenuOpen ? 0 : (isVisible ? (isLightMode ? 0.4 : 0.2) : 0),
          // Disable blend mode when nav menu open to avoid global brightness shift
          mixBlendMode: isNavMenuOpen ? "normal" : (isLightMode ? "multiply" : "screen"),
          transition: "opacity 600ms ease, mask-image 250ms ease, -webkit-mask-image 250ms ease",
          zIndex: -1, // Behind all content including sections
        }}
      />
      
      {/* Base fluid glow */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          left: glowCoordinates.x,
          top: glowCoordinates.y,
          width: glowStyle.width,
          height: glowStyle.height,
          pointerEvents: "none",
          transform: glowStyle.transform,
            borderRadius: "50%",
            background: `radial-gradient(ellipse 50% 60% at center, 
              rgba(255, 255, 255, ${glowStyle.baseOpacity * 0.85}) 0%, 
              rgba(255, 255, 255, ${glowStyle.baseOpacity * 0.65}) 10%, 
              rgba(255, 255, 255, ${glowStyle.baseOpacity * 0.5}) 20%, 
              rgba(255, 255, 255, 0.28) 30%, 
              rgba(255, 255, 255, 0.20) 40%, 
              rgba(255, 255, 255, 0.15) 50%, 
              rgba(255, 255, 255, 0.11) 60%, 
              rgba(255, 255, 255, 0.08) 70%, 
              rgba(255, 255, 255, 0.055) 80%, 
              rgba(255, 255, 255, 0.03) 90%, 
              rgba(255, 255, 255, 0.015) 95%, 
              transparent 100%)`,
            opacity: isNavMenuOpen ? 0 : (isVisible ? 1 : 0),
            transition: "opacity 400ms ease",
            mixBlendMode: isNavMenuOpen ? (isLightMode ? 'normal' : 'screen') : 'overlay',
            zIndex: 20,
            filter: `blur(60px)`, // Reduced blur to match lower brightness
        }}
      />
      {/* Click enhancement overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          left: glowCoordinates.x,
          top: glowCoordinates.y,
          width: showClickGlow ? glowStyle.width * 1.4 : glowStyle.width,
          height: showClickGlow ? glowStyle.height * 1.4 : glowStyle.height,
          pointerEvents: "none",
          transform: glowStyle.transform,
          borderRadius: "50%",
          background: `radial-gradient(ellipse 50% 60% at center, 
            rgba(255, 255, 255, 0.18) 0%, 
            rgba(255, 255, 255, 0.14) 15%, 
            rgba(255, 255, 255, 0.10) 30%, 
            rgba(255, 255, 255, 0.06) 50%, 
            rgba(255, 255, 255, 0.035) 70%, 
            transparent 85%)`,
          opacity: isNavMenuOpen ? 0 : (isVisible && showClickGlow ? 0.85 : 0),
          transition: "opacity 800ms cubic-bezier(0.25, 0.1, 0.25, 1), filter 600ms ease-out, width 400ms ease-out, height 400ms ease-out",
          mixBlendMode: isNavMenuOpen ? (isLightMode ? 'normal' : 'screen') : 'overlay',
          zIndex: 21,
          filter: `blur(${showClickGlow ? 60 : 80}px)`, // Increased from 25/30px
        }}
      />
      {/* Clean cursor circle */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          left: coordinates.x,
          top: coordinates.y,
          width: hoveredElement ? hoveredElement.width : cursorSize,
          height: hoveredElement ? hoveredElement.height : cursorSize,
          pointerEvents: "none",
          transform: hoveredElement 
            ? `translate3d(${hoveredElement.x - coordinates.x}px, ${hoveredElement.y - coordinates.y}px, 0) translate3d(-50%, -50%, 0) scale(${isPointerDown ? 0.95 : 1})`
            : `translate3d(-50%, -50%, 0) scale(${isPointerDown ? 0.95 : 1})`,
          borderRadius: hoveredElement ? `${variantBorderRadius}px` : `${variantBorderRadius}px`,
          border: isLightMode 
            ? `1px solid rgba(32, 18, 63, ${variant === "pointer" || variant === "nav" ? 0.9 : 0.75})`
            : `1px solid rgba(255, 255, 255, ${variant === "pointer" || variant === "nav" ? 1.0 : 0.9})`,
          backgroundColor: isPointerDown 
            ? (isLightMode 
                ? `rgba(32, 18, 63, ${variant === "pointer" ? 0.2 : 0.12})`
                : `rgba(255, 255, 255, ${variant === "pointer" ? 0.3 : 0.2})`)
            : 'transparent',
          opacity: isVisible ? 1 : 0,
          transition:
            "width 400ms cubic-bezier(0.25, 0.1, 0.25, 1), height 400ms cubic-bezier(0.25, 0.1, 0.25, 1), border-radius 600ms cubic-bezier(0.25, 0.1, 0.25, 1), opacity 400ms cubic-bezier(0.25, 0.1, 0.25, 1), transform 300ms cubic-bezier(0.25, 0.1, 0.25, 1)",
          mixBlendMode: isLightMode ? "normal" : "screen",
          zIndex: variant === "nav" ? 100 : 60,
          // Debug border to see if it's expanding (disabled for performance)
          // boxShadow: hoveredElement ? '0 0 0 2px red' : 'none',
        }}
      />
    </>
  );
};

export default CursorGlow;
