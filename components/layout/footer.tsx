import { Heart } from "lucide-react"

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="py-6 md:px-8 md:py-0 border-t">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row mx-auto">
        <div className="flex items-center gap-1 text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {year} Makoto. All rights reserved. | Made with <Heart className="h-4 w-4" /> by{" "}
          <a
            href="https://github.com/gawstxn"
            target="_blank"
            rel="noopener noreferrer"
            className="inline hover:text-primary underline underline-offset-4"
          >
            gawstxn
          </a>
        </div>
      </div>
    </footer>
  )
}
