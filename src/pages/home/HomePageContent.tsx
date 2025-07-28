import { AccommodationRequestFormSection } from '../../features/accommodationRequest/components/AccommodationRequestFormSection';
import { WeekOutlookSection } from '../../features/weekOutlook/components/WeekOutlookSection';
import { CompanyIntro } from './components/CompanyIntro';
import { Hero } from './components/Hero';

export const HomePageContent = () => {
  return (
    <main className="h-screen w-screen flex flex-col items-center overflow-y-visible gap-36 p-6 overflow-hidden relative">
      <Hero />
      <CompanyIntro />
      <WeekOutlookSection />
      <AccommodationRequestFormSection />
    </main>
  );
};
