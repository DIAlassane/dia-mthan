import { useInView } from "react-intersection-observer";
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@emotion/react";

const Text = ({ children, id, onInView }) => {
  const theme = useTheme();
  const ref = useRef(null);
  const [isInView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setInView(entry.isIntersecting);
          if (entry.isIntersecting) {
            onInView(id);
          }
        }
      },
      { root: null, rootMargin: "-50% 0px -50% 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [id, onInView]);

  return (
    <div
      ref={ref}
      className={`feature-title py-16 font-heading text-5xl`}
      style={{
        color: isInView ? theme.palette.secondary.main : theme.palette.primary.main,
        transition: "color 0.3s ease-in-out",
      }}
    >
      {children}
    </div>
  );
};

export default Text;
