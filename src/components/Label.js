import React from "react";

export const Label = () => {
  const links = [
    {
      href: "#movies",
      text: "Browse Movies",
      ariaLabel: "Browse all movies",
    },
    {
      href: "#add",
      text: "Add New",
      ariaLabel: "Add a new movie",
    },
  ];

  return (
    <div className="py-4">
      <p className="font-mulish font-bold text-purple text-2xl md:text-4xl tracking-wide flex items-center justify-center gap-4">
        <a
          href={links[0].href}
          rel="noopener noreferrer"
          aria-label={links[0].ariaLabel}
          className="underline hover:opacity-80 transition-opacity"
        >
          {links[0].text}
        </a>

        <span
          className="font-mulish font-bold text-purple"
          aria-hidden="true"
        >
          |
        </span>

        <a
          href={links[1].href}
          rel="noopener noreferrer"
          aria-label={links[1].ariaLabel}
          className="underline hover:opacity-80 transition-opacity"
        >
          {links[1].text}
        </a>
      </p>
    </div>
  );
};

export default Label;
