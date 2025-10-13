import { BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-illustration.jpg";

const Hero = () => {
  const scrollToVideos = () => {
    document.getElementById('demo-videos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 px-4 md:py-32">
      <div className="container mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-2 md:gap-8 items-center">
          {/* Text Content */}
          <div className="text-center md:text-left animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-highlight/50 px-4 py-2 rounded-full mb-6">
              <Sparkles className="h-4 w-4 text-highlight-foreground" />
              <span className="text-sm font-medium text-highlight-foreground">
                Classes 1-10 | All Subjects
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              Didi's Tuition Classes
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-4 font-light">
              Learn with Joy, Learn with Didi!
            </p>
            
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-lg mx-auto md:mx-0">
              Personalized learning for Classes 1–10 with proven teaching methods that make every subject engaging and easy to understand.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button 
                size="lg" 
                onClick={scrollToVideos}
                className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-soft hover:shadow-hover transition-all duration-300 text-lg px-8 py-6 rounded-full"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Watch Demo Videos
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/20 text-lg px-8 py-6 rounded-full"
              >
                Get in Touch
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative rounded-3xl overflow-hidden shadow-hover">
              <img 
                src={heroImage} 
                alt="Colorful classroom illustration with books and learning materials" 
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Floating decoration */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-highlight rounded-full blur-2xl opacity-60 animate-float" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary rounded-full blur-2xl opacity-60 animate-float" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
