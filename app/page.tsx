import Link from "next/link"
export default function Home() {
  return (
    <>
    <Link href="./client-form-sample">
      <p className="flex justify-center py-4 hover:underline">Client Side Rendering</p>
    </Link>
    <Link href="./server-form-sample">
      <p className="flex justify-center py-4 hover:underline">Server Side Rendering</p>
    </Link>
    </>
  );
}
