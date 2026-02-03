import { UniversalElement } from '../ui/UniversalElement';
import { ElementConfig } from '@/types/schema';

type HeroData = {
  container: ElementConfig;
  innerWrapper: ElementConfig;
  headline: ElementConfig;
  subtext: ElementConfig;
  buttonGroup: ElementConfig;
  primaryButton: ElementConfig;
  secondaryLink: ElementConfig;
};

export default function Hero({ data }: { data: HeroData }) {
  // We use data-path prefix based on parent knowledge
  const basePath = "sections.hero"; 

  return (
    // 1. The Outer Section Container
    <UniversalElement 
      as="section" 
      data={data.container} 
      dataPath={`${basePath}.container`}
    >
      {/* 2. The Inner Wrapper (Container) */}
      <UniversalElement 
        as="div" 
        data={data.innerWrapper} 
        dataPath={`${basePath}.innerWrapper`}
      >
        
        {/* 3. Headline (H1) */}
        <UniversalElement 
          as="h1" 
          data={data.headline} 
          dataPath={`${basePath}.headline`} 
        />

        {/* 4. Subtext (P) */}
        <UniversalElement 
          as="p" 
          data={data.subtext} 
          dataPath={`${basePath}.subtext`} 
        />

        {/* 5. Button Group (Div) */}
        <UniversalElement 
          as="div" 
          data={data.buttonGroup} 
          dataPath={`${basePath}.buttonGroup`}
        >
          {/* 6. Primary Button */}
          <UniversalElement 
            data={data.primaryButton} 
            dataPath={`${basePath}.primaryButton`} 
          />

          {/* 7. Secondary Link */}
          <UniversalElement 
            data={data.secondaryLink} 
            dataPath={`${basePath}.secondaryLink`} 
          />
        </UniversalElement>

      </UniversalElement>
    </UniversalElement>
  );
}