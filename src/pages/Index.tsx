import Hero from "@/components/Hero";
import About from "@/components/About";
import ClassesOffered from "@/components/ClassesOffered";
import DemoVideos from "@/components/DemoVideos";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <ClassesOffered />
      <DemoVideos />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
