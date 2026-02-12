import React from "react";

/**
 * Image that loads only when near the viewport (lazy loading).
 * Uses native loading="lazy" and decoding="async" for better performance.
 */
const LazyImage = ({ src, className, alt = "", ...rest }) => {
  if (!src) return null;

  return (
    <img
      src={src}
      className={className}
      alt={alt}
      loading="lazy"
      decoding="async"
      {...rest}
    />
  );
};

export default LazyImage;
