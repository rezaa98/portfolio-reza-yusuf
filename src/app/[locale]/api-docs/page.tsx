"use client";

import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";
import { Navbar } from "@/shared/ui/Navbar";
import { Footer } from "@/shared/ui/Footer";

// Dynamically import SwaggerUI to prevent SSR issues and reduce main bundle size
const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col font-sans selection:bg-accent-primary/30">
      <Navbar />
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white">
              API <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-blue">Documentation</span>
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
              Explore the available RESTful APIs for this portfolio project. You can test the endpoints directly using the "Try it out" feature.
            </p>
          </div>
          
          <div className="bg-bg-secondary rounded-2xl p-4 md:p-8 border border-border-subtle shadow-xl overflow-hidden">
            <div className="swagger-container custom-swagger-styles">
              <SwaggerUI url="/swagger.json" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
