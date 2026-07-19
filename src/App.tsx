import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ScrollProgressBar } from "@/components/ui/scroll-progress";
import { Preloader } from "@/components/ui/Preloader";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { About } from "@/components/sections/About";
import { Products } from "@/components/sections/Products";
import { Industries } from "@/components/sections/Industries";
import { Manufacturing } from "@/components/sections/Manufacturing";
import { ProcessPortfolio } from "@/components/sections/ProcessPortfolio";
import { Quality } from "@/components/sections/Quality";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Resources } from "@/components/sections/Resources";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { ValveConfigurator } from "@/components/sections/ValveConfigurator";

function App() {
  const [loading, setLoading] = useState(true);
  const [selectedValveId, setSelectedValveId] = useState<string>("");

  return (
    <div className="min-h-screen bg-white">
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div className="animate-fade-up">
          <ScrollProgressBar />
          <Navbar />
          <main>
            <Hero />
            <TrustedBy />
            <Products onConfigureValve={setSelectedValveId} />
            <ValveConfigurator
              selectedValveId={selectedValveId}
              setSelectedValveId={setSelectedValveId}
            />
            <Manufacturing />
            <ProcessPortfolio />
            <Quality />
            <Industries />
            <WhyChooseUs />
            <Resources />
            <FAQ />
            <About />
            <Contact />
          </main>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
