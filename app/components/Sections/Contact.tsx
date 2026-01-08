import { Mail, Instagram, Linkedin } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="min-h-screen px-6 py-24 flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-16">
          <p className="text-muted-foreground mb-2">[04]</p>
          <h2 className="text-3xl md:text-5xl tracking-tight">GET IN TOUCH</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <p className="text-lg">
              Available for commissioned work, collaborations, and inquiries.
              Let's create something meaningful together.
            </p>
            
            <div className="space-y-4">
              <a 
                href="mailto:hello@alexmorgan.design"
                className="flex items-center gap-3 hover:opacity-70 transition-opacity group"
              >
                <Mail size={20} className="text-muted-foreground" />
                <span>HELLO@ALEXMORGAN.DESIGN</span>
              </a>
              
              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="w-5" />
                <span>NEW YORK, NY</span>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <p className="text-muted-foreground mb-4">[SOCIAL]</p>
              <div className="space-y-3">
                <a 
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:opacity-70 transition-opacity"
                >
                  <Instagram size={20} className="text-muted-foreground" />
                  <span>INSTAGRAM</span>
                </a>
                <a 
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:opacity-70 transition-opacity"
                >
                  <Linkedin size={20} className="text-muted-foreground" />
                  <span>LINKEDIN</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-border">
          <p className="text-muted-foreground">© 2025 ALEX MORGAN. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </section>
  );
}
