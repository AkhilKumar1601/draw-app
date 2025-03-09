import { type JSX, ReactNode } from "react";

export function Card({
  className,
  title,
  children,
  href = "#", // Default to "#"
}: {
  className?: string;
  title?: string; // Make it optional
  children: React.ReactNode;
  href?: string; // Make it optional
}): JSX.Element {
  return (
    <a
      className={className}
      href={`${href}?utm_source=create-turbo&utm_medium=basic&utm_campaign=create-turbo`}
      rel="noopener noreferrer"
      target="_blank"
    >
      {title && <h2>{title} <span>-&gt;</span></h2>}
      <p>{children}</p>
    </a>
  );
}
