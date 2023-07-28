import Link from "next/link";

export default function Home() {

  const arr = [
    { client: "Tortoro", name: "Saving lives" },
    { client: "Jann", name: "Grocery store antics." }

  ];
  return (
    <main>
      <h1>hullo</h1>
      <li><Link href="/about">about page</Link></li>
      <li>
        <Link href="/client/widf/fnfj">SLUG</Link>
      </li>

      {arr.map(el => {
        return (
          <li>
            <Link href={{
              pathname: "/client/[name]/project",
              query: { name: el.name }
            }}>{el.client} client page</Link>
          </li>
        );
      })}


    </main>
  );
}
