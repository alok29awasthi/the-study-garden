import { Award, Heart, Target } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Award,
      title: "Experienced Teaching",
      description: "Years of proven success in helping students excel across all subjects"
    },
    {
      icon: Heart,
      title: "Personalized Care",
      description: "Individual attention tailored to each student's learning pace and style"
    },
    {
      icon: Target,
      title: "Clear Goals",
      description: "Structured approach ensuring students master concepts and build confidence"
    }
  ];

  return (
    <section className="py-16 px-4 md:py-24 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            About The Study Garden
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Where learning meets excellence and every student's potential is unlocked
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-hover transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 bg-gradient-hero rounded-xl flex items-center justify-center mb-6">
                  <Icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-card rounded-3xl p-8 md:p-12 shadow-soft animate-fade-in">
          <p className="text-lg text-foreground leading-relaxed text-center md:text-left">
            At <strong className="text-primary">The Study Garden</strong>, we believe that every child has the potential to excel. 
            With a passion for teaching and years of experience, I provide comprehensive tuition for students from 
            <strong className="text-secondary"> Classes 1 to 10</strong> across all subjects. My teaching approach combines 
            clarity, patience, and interactive methods to ensure students not only understand concepts but also develop 
            a genuine love for learning. Join our growing family of successful students and experience the difference 
            personalized education can make!
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
