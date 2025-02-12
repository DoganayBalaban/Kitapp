import { Book, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-background py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center">
          <nav className="mb-8 flex flex-wrap justify-center gap-6">
            <a href="#" className="hover:text-primary">
              Home
            </a>
            <a href="#" className="hover:text-primary">
              About
            </a>
            <a href="#" className="hover:text-primary">
              Services
            </a>
            <a href="#" className="hover:text-primary">
              Products
            </a>
            <a href="#" className="hover:text-primary">
              Contact
            </a>
          </nav>
          <div className="mb-8 flex space-x-4">
            <button variant="outline" size="icon" className="rounded-full">
              <Twitter className="h-6 w-6" />
              <span className="sr-only">Twitter</span>
            </button>
            <button variant="outline" size="icon" className="rounded-full">
              <Instagram className="h-6 w-6" />
              <span className="sr-only">Instagram</span>
            </button>
            <button variant="outline" size="icon" className="rounded-full">
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </button>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Doğanay Balaban</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
