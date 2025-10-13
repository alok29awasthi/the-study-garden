import { GraduationCap } from "lucide-react";

const ClassesOffered = () => {
  const classes = [
    { class: "Class 1", subjects: ["Math", "English", "EVS", "Hindi"] },
    { class: "Class 2", subjects: ["Math", "English", "EVS", "Hindi"] },
    { class: "Class 3", subjects: ["Math", "English", "EVS", "Hindi"] },
    { class: "Class 4", subjects: ["Math", "English", "Science", "Social Studies", "Hindi"] },
    { class: "Class 5", subjects: ["Math", "English", "Science", "Social Studies", "Hindi"] },
    { class: "Class 6", subjects: ["Math", "English", "Science", "Social Studies", "Hindi"] },
    { class: "Class 7", subjects: ["Math", "English", "Science", "Social Studies", "Hindi"] },
    { class: "Class 8", subjects: ["Math", "English", "Science", "Social Studies", "Hindi"] },
    { class: "Class 9", subjects: ["Math", "English", "Science", "Social Studies", "Hindi"] },
    { class: "Class 10", subjects: ["Math", "English", "Science", "Social Studies", "Hindi"] },
  ];

  const gradientClasses = [
    "bg-gradient-to-br from-primary/20 to-primary/5",
    "bg-gradient-to-br from-secondary/20 to-secondary/5",
    "bg-gradient-to-br from-accent/20 to-accent/5",
    "bg-gradient-to-br from-highlight/30 to-highlight/10",
  ];

  return (
    <section className="py-16 px-4 md:py-24 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Interactive Tuition for Classes 1–10
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive coverage of all subjects with engaging teaching methods
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {classes.map((item, index) => (
            <div
              key={index}
              className={`${gradientClasses[index % gradientClasses.length]} rounded-2xl p-6 shadow-soft hover:shadow-hover transition-all duration-300 hover:scale-105 animate-fade-in border border-border/50`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{item.class}</h3>
              </div>
              
              <div className="space-y-2">
                {item.subjects.map((subject, subIndex) => (
                  <div
                    key={subIndex}
                    className="bg-card/60 backdrop-blur-sm rounded-lg px-3 py-2 text-sm text-foreground font-medium"
                  >
                    {subject}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClassesOffered;
