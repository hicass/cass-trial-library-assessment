import type { ElementType } from 'react';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import HandshakeIcon from '@mui/icons-material/Handshake';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { ContentContainer } from '../../../components/containers/ContentContainer';

// Sections describing the company's mission and approach
const companyIntroSections = [
  {
    id: 'plan-smart',
    title: 'Plan Smart',
    icon: RocketLaunchIcon,
    body: `Before you book, explore our 7-day Mars weather outlook and real-time near-Earth asteroid data. These tools help you select the best possible launch window — safer, smoother, and better informed.`,
  },
  {
    id: 'travel-affordably',
    title: 'Travel Affordably',
    icon: HandshakeIcon,
    body: `We partner with agencies, sponsors, and community programs to offer flexible pricing, scholarships, and payment plans. Whether you're booking solo or with a family, we'll help make your dream trip achievable.`,
  },
  {
    id: 'access-for-all',
    title: 'Access for All',
    icon: FavoriteIcon,
    body: `Traveling to Mars should be possible for everyone. If you need any mobility, medical, hearing, or other accommodations during your journey, we're here to support you every step of the way. Please fill out our accommodations request form at the bottom of the page so we can tailor your trip to your needs.`,
  },
];

// Main content for the company intro section
const copyData = {
  title: 'We Are Mars On My Mind',
  description:
    "At Mars On My Mind, we believe space is for everyone. We're redefining what it means to explore Mars by removing the barriers that keep people grounded — cost, complexity, and accessibility.",
  sections: companyIntroSections,
};

// Renders a single info section with a title and body
const InfoSection = ({
  title,
  body,
  icon,
  id,
}: {
  title: string;
  body: string;
  icon: ElementType;
  id: string;
}) => {
  const IconComponent = icon;

  return (
    <div id={id}>
      <div className="flex gap-2">
        <IconComponent aria-hidden="true" />
        <h3 className="body-lg body-bold">{title}</h3>
      </div>
      <p className="body-md mt-1">{body}</p>
    </div>
  );
};

// Main company introduction section for the homepage
export const CompanyIntro = () => {
  const infoSectionElements = copyData.sections.map((section) => (
    <InfoSection
      key={section.id}
      id={section.id}
      title={section.title}
      icon={section.icon}
      body={section.body}
    />
  ));

  return (
    <ContentContainer>
      <section className="flex flex-col lg:flex-row justify-start gap-6">
        <div>
          <header>
            <h2 className="title-md">{copyData.title}</h2>

            <p className="mt-6 body-md">{copyData.description}</p>
          </header>

          <div className="mt-6 flex flex-col gap-6">{infoSectionElements}</div>
        </div>

        <img
          src="/mars-image.png"
          alt="A view of Mars from orbit, showing its red surface and atmospheric glow"
          width={945}
          height={1191.4}
          loading="lazy"
          className="w-1/2 md:w-1/3 object-cover rounded-lg self-center"
        />
      </section>
    </ContentContainer>
  );
};
