import React, { CSSProperties, useEffect, useState } from "react";

export default function RadialPointer(): JSX.Element {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (event: { pageX: number; pageY: number }) => {
      setMousePosition({ x: event.pageX, y: event.pageY });
    };
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  const radialStyle: CSSProperties = {
    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.1), transparent 80%)`,

    // pointerEvents: "none",
  };

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition duration-300 lg:absolute"
      style={radialStyle}
    ></div>
  );
}
