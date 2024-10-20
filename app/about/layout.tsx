import React from 'react'

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <p className="bg-green-300">this sentence comes from about layout</p>
      {children}
    </div>
  );
}