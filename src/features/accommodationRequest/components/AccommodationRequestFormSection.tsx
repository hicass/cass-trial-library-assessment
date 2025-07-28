import { ContentContainer } from '../../../components/containers/ContentContainer';
import { AccommodationRequestForm } from './AccommodationRequestForm/AccommodationRequestForm';

const sectionData = {
  title: 'Need Assistance?',
  description:
    "At Mars On My Mind, we believe everyone deserves the chance to explore Mars. If you have a disability or require any special accommodations during your travel experience, please fill out this form. We'll work closely with you to ensure your trip is safe, enjoyable, and tailored to your needs.",
};

// Component to render the whole Accommodation Request Form section of the page
export const AccommodationRequestFormSection = () => {
  return (
    <ContentContainer>
      <section className="flex flex-col items-center justify-between lg:gap-8 lg:flex-row lg:items-start">
        <header className="w-full lg:max-w-lg mt-[4rem]">
          <h2 className="title-md text-center lg:text-left">
            {sectionData.title}
          </h2>
          <p className="body-md mt-6">{sectionData.description}</p>
        </header>

        <AccommodationRequestForm />
      </section>
    </ContentContainer>
  );
};
