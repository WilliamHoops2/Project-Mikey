import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    });
    
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="gradient-dark min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            Contact <span className="text-electric-yellow">Us</span>
          </h1>
          <p className="text-xl text-gray-300">Get in touch with our team</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-charcoal border-electric-yellow/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-electric-yellow">Get In Touch</h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <i className="fas fa-phone text-electric-yellow text-xl"></i>
                    <div>
                      <div className="font-semibold">Phone</div>
                      <div className="text-gray-400" data-testid="contact-phone-number">+62 821-xxxx-xxxx</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <i className="fas fa-envelope text-electric-yellow text-xl"></i>
                    <div>
                      <div className="font-semibold">Email</div>
                      <div className="text-gray-400" data-testid="contact-email-address">hello@mikeyapplestuff.com</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <i className="fas fa-map-marker-alt text-electric-yellow text-xl"></i>
                    <div>
                      <div className="font-semibold">Locations</div>
                      <div className="text-gray-400">Jakarta, Surabaya, Bandung, Malang</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-charcoal border-electric-yellow/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-electric-yellow">Follow Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://www.instagram.com/mikeys_applestuff"
                    target="_blank"
                    className="bg-electric-yellow text-black p-3 rounded-lg hover:glow-yellow-strong transition-all duration-300"
                    data-testid="social-instagram-contact"
                  >
                    <i className="fab fa-instagram text-xl"></i>
                  </a>
                  <a
                    href="#"
                    className="bg-electric-yellow text-black p-3 rounded-lg hover:glow-yellow-strong transition-all duration-300"
                    data-testid="social-whatsapp-contact"
                  >
                    <i className="fab fa-whatsapp text-xl"></i>
                  </a>
                  <a
                    href="#"
                    className="bg-electric-yellow text-black p-3 rounded-lg hover:glow-yellow-strong transition-all duration-300"
                    data-testid="social-telegram-contact"
                  >
                    <i className="fab fa-telegram text-xl"></i>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="bg-charcoal border-electric-yellow/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-electric-yellow">Send Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="bg-dark-gray border-electric-yellow/20 text-white focus:border-electric-yellow"
                    required
                    data-testid="input-name"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="bg-dark-gray border-electric-yellow/20 text-white focus:border-electric-yellow"
                    required
                    data-testid="input-email"
                  />
                </div>
                <div>
                  <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                    <SelectTrigger className="bg-dark-gray border-electric-yellow/20 text-white focus:border-electric-yellow" data-testid="select-subject">
                      <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="buy">Buy Inquiry</SelectItem>
                      <SelectItem value="sell">Sell Inquiry</SelectItem>
                      <SelectItem value="general">General Question</SelectItem>
                      <SelectItem value="support">Technical Support</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Textarea
                    rows={5}
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    className="bg-dark-gray border-electric-yellow/20 text-white focus:border-electric-yellow resize-none"
                    required
                    data-testid="textarea-message"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-electric-yellow text-black hover:glow-yellow-strong transition-all duration-300"
                  disabled={!formData.name || !formData.email || !formData.subject || !formData.message}
                  data-testid="button-send-message"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
