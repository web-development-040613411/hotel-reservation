import Link from "next/link";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex w-full">
      <div className="min-h-screen border">
        <div className="sticky top-0 w-[250px] p-4 flex flex-col">
          <div className="flex justify-center">
            <Link href="/">Logo</Link>
          </div>
          <div className="flex flex-col gap-2 mt-16">
            <Link href="#">Menu</Link>
            <Link href="#">Menu</Link>
            <Link href="#">Menu</Link>
            <Link href="#">Menu</Link>
          </div>
        </div>
      </div>
      <div className="grow flex flex-col">
        <header className="bg-primary text-primary-foreground h-20 sticky top-0 border-b shadow">
          Header
        </header>
        <main className="p-12 overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
