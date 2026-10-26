import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="not-found container section">
      <span className="eyebrow">Beachaven · 404</span>
      <h1>This page couldn’t be found.</h1>
      <Link className="button" href="/">
        Back to Beachaven
      </Link>
    </main>
  );
}
