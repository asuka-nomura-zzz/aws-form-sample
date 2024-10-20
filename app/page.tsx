import Link from "next/link"
export default function Home() {
  return (
    <>
    <p>Hello world</p>
    <p>from Asuka</p>
    <Link href="/about" className="bg-red-200">about</Link>
    <Link href="/about/favorite" className="bg-blue-200">favorite</Link>

    </>
  );
}
