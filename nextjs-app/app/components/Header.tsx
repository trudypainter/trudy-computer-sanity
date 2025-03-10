export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 h-20 bg-transparent flex items-center">
      <div className="container mx-auto px-4 h-full flex items-center max-w-content">
        <div className="flex items-center justify-between gap-5 w-full">
          <a
            className="flex items-center gap-2 hover:opacity-75 transition-opacity translate-x-1"
            href="/"
          >
            <span className="font-base flex items-center">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                className="text-gray-500 leading-none align-middle mt-1"
              >
                <rect
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="transition-opacity hover:opacity-75"
                />
              </svg>
              <span className="ml-1">Trudy Painter</span>
            </span>
          </a>

          <nav>
            <ul
              role="list"
              className="flex items-center gap-4 md:gap-6 leading-5 text-sm md:text-base tracking-tight"
            >
              <li>
                <a
                  href="/about"
                  className="hover:opacity-75 transition-opacity"
                >
                  About
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
