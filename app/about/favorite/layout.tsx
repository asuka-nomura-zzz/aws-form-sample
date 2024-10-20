import React from 'react'

export default function FavoriteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <p className="bg-purple-300">this sentence comes from favorite layout</p>
      {children}
    </div>
  );
}