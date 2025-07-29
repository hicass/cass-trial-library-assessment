import { AccommodationRequestFormSection } from '../../features/accommodationRequest/components/AccommodationRequestFormSection';
import { WeekOutlookSection } from '../../features/weekOutlook/components/WeekOutlookSection';
import { CompanyIntro } from './components/CompanyIntro';
import { Hero } from './components/Hero';

// Main homepage layout: renders the Hero, CompanyIntro, WeekOutlookSection, 
// and AccommodationRequestFormSection in order.
export const HomePageContent = () => {
  return (
    <main className="h-screen w-screen flex flex-col items-center overflow-y-visible gap-36 overflow-hidden relative">
      <Hero />
      <CompanyIntro />
      <WeekOutlookSection />
      <AccommodationRequestFormSection />
    </main>
  );
};
