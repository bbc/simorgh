import { Summary } from '#app/models/types/curationData';
import Heading from '../Heading';

interface UsefulLinksProps {
  id?: string;
  title: string;
  summaries: Summary[];
}

const UsefulLinks = ({
  title,
  summaries = [],
  id = 'useful-links-1',
}: UsefulLinksProps) => {
  if (summaries.length === 0) {
    return null;
  }

  const hasMultipleSummaries = summaries.length > 1;

  return (
    <section
      role="region"
      aria-labelledby={id}
      data-testid={id}
      className="mt-16 mb-12"
    >
      <Heading level={2} id={id} className="text-double-pica font-sans-bold mb-3">
        {title}
      </Heading>
      {hasMultipleSummaries ? (
        <ul 
          className="p-0 m-0 grid list-none gap-12 group-2:grid-cols-2" 
          role="list"
        >
          {summaries.map(summary => (
            <li 
              className="relative flex min-w-0 items-center gap-4"
              key={summary.title}
            >
              <a 
                href={summary.link} 
                className="text-grey-10 no-underline text-pica font-sans-bold py-3 w-full visited:text-grey-6 hover:underline focus:underline"
              >
                {summary.title}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div className="relative flex min-w-0 items-center gap-4">
          <a 
            href={summaries[0].link} 
            className="text-grey-10 no-underline text-pica font-sans-bold py-3 w-full visited:text-grey-6 hover:underline focus:underline"
          >
            {summaries[0].title}
          </a>
        </div>
      )}
    </section>
  );
};

export default UsefulLinks;
