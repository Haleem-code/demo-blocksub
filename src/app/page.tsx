import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to the Blog!</h1>
      <p>
        Click <Link href="/auth">here</Link> to authenticate.
      </p>
    </div>
  );
}
