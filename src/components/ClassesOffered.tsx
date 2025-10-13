import { useLocation, useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { useEffect, useRef } from "react";

const ClassesOffered = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (location.state?.scrollTo === "classes" && sectionRef.current) {
      // scroll smoothly to this section
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  const classes = [
    { class: "1", subjects: ["Math", "English", "EVS", "Hindi"] },
    { class: "2", subjects: ["Math", "English", "EVS", "Hindi"] },
    { class: "3", subjects: ["Math", "English", "EVS", "Hindi"] },
    { class: "4", subjects: ["Math", "English", "Science", "Social Studies", "Hindi"] },
    { class: "5", subjects: ["Math", "English", "Science", "Social Studies", "Hindi"] },
    { class: "6", subjects: ["Math", "English", "Science", "Social Studies", "Hindi"] },
    { class: "7", subjects: ["Math", "English", "Science", "Social Studies", "Hindi"] },
    { class: "8", subjects: ["Math", "English", "Science", "Social Studies", "Hindi"] },
    { class: "9", subjects: ["Math", "English", "Science", "Social Studies", "Hindi"] },
    { class: "10", subjects: ["Math", "English", "Science", "Social Studies", "Hindi"] },
  ];

  const gradientClasses = [
    "bg-gradient-to-br from-primary/20 to-primary/5",
    "bg-gradient-to-br from-secondary/20 to-secondary/5",
    "bg-gradient-to-br from-accent/20 to-accent/5",
    "bg-gradient-to-br from-highlight/30 to-highlight/10",
  ];

  return (
    <section ref={sectionRef} id="classes-offered" className="py-16 px-4 md:py-24 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 md:mb-16">
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
              className={`${gradientClasses[index % gradientClasses.length]} rounded-2xl p-6 shadow-soft hover:shadow-hover transition-all duration-300 hover:scale-105 border border-border/50`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Class {item.class}</h3>
              </div>
              <div className="space-y-2">
                {item.subjects.map((subject, subIndex) => (
                  <div
                    key={subIndex}
                    onClick={() => navigate(`/class/${item.class}/${subject}`)}
                    className="cursor-pointer bg-card/60 backdrop-blur-sm rounded-lg px-3 py-2 text-sm text-foreground font-medium hover:bg-primary/10 transition-colors"
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