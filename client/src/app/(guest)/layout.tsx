export default function GuestLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div>Navbar</div>
      {children}
    </>
  );
}
