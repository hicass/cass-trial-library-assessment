import { type ReactNode } from 'react';

interface ContentContainerProps {
  children: ReactNode;
}

// A reusable responsive container with max-width and horizontal padding
export const ContentContainer = ({ children }: ContentContainerProps) => {
  return <div className="w-full px-4 sm:px-6 lg:max-w-6xl mx-auto">{children}</div>;
};
