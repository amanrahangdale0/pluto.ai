export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--clr-border)] bg-[var(--clr-background)] py-10">
      <div className="mx-auto max-w-6xl px-4 flex flex-col items-center">
        <div className="flex flex-col items-center mb-6">
          <img src="/resumePluto.svg" alt="Pluto.ai" className="h-10 object-contain mb-3" onError={(e) => {
            e.currentTarget.style.display = 'none';
            e.currentTarget.nextElementSibling.style.display = 'inline';
          }} />
          <span style={{ display: 'none' }} className="font-head text-2xl font-extrabold tracking-tight text-gradient mb-3">Pluto.ai</span>
          <p className="text-[var(--clr-muted)] text-sm">AI-powered resume analysis & builder.</p>
        </div>
        
        <div className="w-full h-px bg-[var(--clr-border)] mb-6"></div>
        
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 text-[14px]">
          <p className="text-[var(--clr-muted)]">&copy; {currentYear} Pluto.ai. All rights reserved.</p>
          <p className="flex items-center justify-center gap-1 text-[var(--clr-muted)]">
            Made with <span className="text-red-500 animate-pulse">♥</span> by 
            <a 
              href="http://www.linkedin.com/in/aman-rahangdale-58114929b" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground hover:text-[var(--clr-accent)] hover:underline transition-colors ml-1"
            >
              Aman Rahangdale
            </a>
            <a 
              href="http://www.linkedin.com/in/aman-rahangdale-58114929b" 
              target="_blank" 
              rel="noopener noreferrer"
              className="ml-2 flex items-center justify-center text-[#0A66C2] hover:opacity-80 transition-opacity"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
