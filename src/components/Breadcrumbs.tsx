import Link from "next/link";

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="breadcrumbs" aria-label="현재 위치">
      <ol>
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <li key={it.path}>
              {last ? <span aria-current="page">{it.name}</span> : <Link href={it.path}>{it.name}</Link>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
