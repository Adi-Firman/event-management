import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 py-16 px-8">
      <main className="flex flex-col items-center gap-8">
        {/* Logo Next.js */}
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        
        {/* Welcome Message and Instructions */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome to Next.js</h1>
        <ol className="text-lg text-center sm:text-left font-mono text-gray-700 dark:text-gray-300">
          <li className="mb-4">
            Start by editing{" "}
            <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded font-semibold">
              src/app/page.tsx
            </code>
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        {/* Button Section */}
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          {/* Deploy Button */}
          <a
            className="rounded-full bg-blue-600 text-white py-2 px-6 text-lg hover:bg-blue-700 transition"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logo"
              width={20}
              height={20}
            />
            Deploy Now
          </a>

          {/* Docs Button */}
          <a
            className="rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white py-2 px-6 text-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read Docs
          </a>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400">
        <div className="flex justify-center gap-8">
          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Learn
          </a>
          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Examples
          </a>
          <a
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Next.js
          </a>
        </div>
      </footer>
    </div>
  );
}
