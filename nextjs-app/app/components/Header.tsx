export default function Header() {
  return (
    <header className="sticky top-0 left-0 right-0 z-50 h-20 bg-transparent flex items-center">
      <div className="container mx-auto px-4 h-full flex items-center">
        <div className="flex items-center justify-between gap-5 w-full">
          <a
            className="flex items-center gap-2 hover:opacity-75 transition-opacity"
            href="/"
          >
            <span className="font-medium flex items-center">
              <span className="text-gray-500 text-xl leading-none align-middle mt-0.5">
                ◼
              </span>
              <span className="ml-0.5">Trudy Painter</span>
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
