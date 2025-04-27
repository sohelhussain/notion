export default function NotFound() {
  const packageName = process.env.NEXT_PUBLIC_PACKAGE_NAME;
  
  return <div>Package: {packageName}</div>;
}
