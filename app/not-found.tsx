"use client"

export default function NotFound() {
  const packageName = process.env.NEXT_PUBLIC_PACKAGE_NAME || "somthing";
  
  return <div>Package: {packageName}</div>;
}
