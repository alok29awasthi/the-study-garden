import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-hero py-8 px-4">
      <div className="container mx-auto max-w-6xl text-center">
        <p className="text-primary-foreground/90 flex items-center justify-center gap-2">
          Made with <Heart className="h-4 w-4 fill-accent text-accent" /> by The Study Garden
        </p>
        <p className="text-primary-foreground/70 text-sm mt-2">
          © {new Date().getFullYear()} All rights reserved. Empowering students, one lesson at a time.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
