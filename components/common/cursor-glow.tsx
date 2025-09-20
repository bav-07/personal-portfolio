"use client";

import { useEffect, useMemo, useState } from "react";

type CursorVariant = "default" | "pointer" | "text";

type Coordinates = {
  x: number;
  y: number;
};

const defaultCoords: Coordinates = { x: 0, y: 0 };

const CursorGlow = () => {
  const [coordinates, setCoordinates] = useState<Coordinates>(defaultCoords);
  const [isPointerDown, setIsPointerDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [isFinePointer, setIsFinePointer] = useState(false);

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
    if (!isFinePointer) {
      setIsVisible(false);
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      setCoordinates({ x: event.clientX, y: event.clientY });
      setIsVisible(true);

      if (event.target instanceof Element) {
        const element = event.target;
        const computedCursor = window.getComputedStyle(element).cursor;
        const isTextTarget =
          computedCursor === "text" ||
          element.tagName === "INPUT" ||
          element.tagName === "TEXTAREA" ||
          (element instanceof HTMLElement ? element.isContentEditable : false);

        if (computedCursor === "pointer") {
          setVariant("pointer");
        } else if (isTextTarget) {
          setVariant("text");
        } else {
          setVariant("default");
        }
      }
    };

    const handlePointerDown = () => setIsPointerDown(true);
    const handlePointerUp = () => setIsPointerDown(false);

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

  const { glowDiameter, glowColor, glowOpacity, cursorSize, cursorColor } = useMemo(() => {
    const variantSettings: Record<CursorVariant, {
      glowDiameter: number;
      glowColor: string;
      glowOpacity: number;
      cursorSize: number;
      cursorColor: string;
    }> = {
      default: {
        glowDiameter: 360,
        glowColor: "255, 119, 214",
        glowOpacity: 0.18,
        cursorSize: 14,
        cursorColor: "214, 226, 255",
      },
      pointer: {
        glowDiameter: 420,
        glowColor: "255, 119, 214",
        glowOpacity: 0.26,
        cursorSize: 18,
        cursorColor: "255, 119, 214",
      },
      text: {
        glowDiameter: 280,
        glowColor: "56, 189, 248",
        glowOpacity: 0.22,
        cursorSize: 10,
        cursorColor: "148, 163, 255",
      },
    };

    return variantSettings[variant];
  }, [variant]);

  if (!isFinePointer) {
    return null;
  }

  return (
    <>
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          left: coordinates.x,
          top: coordinates.y,
          width: glowDiameter,
          height: glowDiameter,
          pointerEvents: "none",
          transform: "translate3d(-50%, -50%, 0)",
          borderRadius: "9999px",
          background: `radial-gradient(circle, rgba(${glowColor}, ${isPointerDown ? glowOpacity + 0.08 : glowOpacity}) 0%, rgba(${glowColor}, 0) 65%)`,
          opacity: isVisible ? 1 : 0,
          transition: "opacity 200ms ease, background 250ms ease",
          mixBlendMode: "screen",
          zIndex: 20,
          filter: "blur(0px)",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          left: coordinates.x,
          top: coordinates.y,
          width: cursorSize,
          height: cursorSize,
          pointerEvents: "none",
          transform: `translate3d(-50%, -50%, 0) scale(${isPointerDown ? 0.9 : 1})`,
          borderRadius: "9999px",
          border: `1.4px solid rgba(${cursorColor}, ${variant === "pointer" ? 0.9 : 0.65})`,
          backgroundColor: `rgba(${cursorColor}, ${isPointerDown ? 0.4 : 0.26})`,
          boxShadow: `0 0 32px rgba(${cursorColor}, 0.55)`,
          opacity: isVisible ? 1 : 0,
          transition:
            "transform 120ms ease, width 160ms ease, height 160ms ease, opacity 180ms ease, border-color 160ms ease, background-color 160ms ease, box-shadow 160ms ease",
          mixBlendMode: "screen",
          zIndex: 30,
        }}
      />
    </>
  );
};

export default CursorGlow;
