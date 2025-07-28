import Button from '@mui/material/Button';
import { ContentContainer } from '../../../components/containers/ContentContainer';

const copyData = {
  title: 'Mars Travel Without Limits',
  description:
    'Choose your travel dates, check the Martian weather and asteroid outlook, and let us handle the rest.',
  cta: 'Ready to take off?',
};

export const Hero = () => {
  return (
    <ContentContainer>
      <section className="text-center my-32">
        <h1 className="title-lg">{copyData.title}</h1>

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
