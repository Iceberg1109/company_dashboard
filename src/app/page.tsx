import Image from "next/image";
import Companies from "./components/Dashboard";

export default function Home() {
  return (
    <div className="grid justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex items-center sm:items-start">
        <Companies />
      </main>
    </div>
  );
}
