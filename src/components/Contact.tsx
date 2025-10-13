import { Phone, MapPin, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  // Replace with actual contact details
  const whatsappNumber = "919999999999"; // Format: country code + number (no spaces or symbols)
  const phoneNumber = "+91 99999 99999";
  const email = "thestudygarden@gmail.com";
  const address = "123 Learning Street, Education City, State - 123456";
  
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hello! I'm interested in your tuition classes.`;

  return (
    <section id="contact" className="py-16 px-4 md:py-24 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Get in Touch
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to start your learning journey? Contact us today!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 shadow-soft hover:shadow-hover transition-all duration-300 animate-fade-in">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Phone</h3>
                  <a 
                    href={`tel:${phoneNumber.replace(/\s/g, '')}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {phoneNumber}
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl p-6 shadow-soft hover:shadow-hover transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Email</h3>
                  <a 
                    href={`mailto:${email}`}
                    className="text-muted-foreground hover:text-secondary transition-colors break-all"
                  >
                    {email}
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl p-6 shadow-soft hover:shadow-hover transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Location</h3>
                  <p className="text-muted-foreground">
                    {address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <div className="bg-gradient-hero rounded-3xl p-8 md:p-10 shadow-hover flex flex-col justify-center items-center text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="w-20 h-20 bg-primary-foreground/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 animate-float">
              <MessageCircle className="h-10 w-10 text-primary-foreground" />
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              Quick Inquiry
            </h3>
            
            <p className="text-primary-foreground/90 mb-8 text-lg">
              Have questions? Message us on WhatsApp for instant responses!
            </p>
            
            <Button
              size="lg"
              asChild
              className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-soft hover:shadow-hover transition-all duration-300 text-lg px-8 py-6 rounded-full"
            >
              <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <MessageCircle className="h-5 w-5" />
                Chat on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
