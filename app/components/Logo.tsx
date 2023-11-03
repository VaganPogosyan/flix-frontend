import Link from "next/link";

export default function Logo() {
  return (
    <div>
      <h1 className="text-4xl font-bebas text-red-600">
        <Link href="/">FLIX</Link>
      </h1>
    </div>
  );
}
