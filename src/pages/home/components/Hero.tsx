import Button from '@mui/material/Button';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import NightlightIcon from '@mui/icons-material/Nightlight';
import { ContentContainer } from '../../../components/containers/ContentContainer';

const copyData = {
  title: 'Mars Travel Without Limits',
  description:
    'Choose your travel dates, check the Martian weather and asteroid outlook, and let us handle the rest.',
  cta: 'Ready to take off?',
};

// Displays the main headline, decorative icons, description, and a call-to-action button.
export const Hero = () => {
  return (
    <ContentContainer>
      <section className="text-center my-32" aria-labelledby="hero-title">
        <div className="flex w-full items-center justify-center md:gap-2">
          {/* Icons on the left */}
          <div className='flex items-center md:gap-2'>
            <NightlightIcon fontSize="large" aria-hidden="true" />
            <StarIcon aria-hidden="true" />
            <StarBorderIcon fontSize="small" aria-hidden="true" />
          </div>

          {/* Heading */}
          <h1 id="hero-title" className="title-lg">
            {copyData.title}
          </h1>
          
          {/* Icons on the right */}
          <div className='flex items-center md:gap-2'>
            <StarBorderIcon fontSize="small" aria-hidden="true" />
            <StarIcon aria-hidden="true" />
            <ModeNightIcon fontSize="large" aria-hidden="true" />
          </div>
        </div>

        <p className="body-lg mt-2">{copyData.description}</p>

        <div className="mt-6">
          <Button variant="contained" component="a" href="#week-outlook">
            {copyData.cta}
          </Button>
        </div>
      </section>
    </ContentContainer>
  );
};
