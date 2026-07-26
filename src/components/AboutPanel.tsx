import { NEUROECONOMICS_INTRO, RECOMMENDED_READS, SOCIETY_FOR_NEUROECONOMICS_URL } from "../lib/regions";

export function AboutPanel() {
  const books = RECOMMENDED_READS.filter((read) => read.category === "book");
  const academic = RECOMMENDED_READS.filter((read) => read.category === "academic");

  return (
    <div className="about-panel">
      <h2 className="panel-heading">What is neuroeconomics?</h2>
      <p>{NEUROECONOMICS_INTRO}</p>
      <p className="about-hint">Select a region above, or click a highlighted part of the brain, to explore it.</p>

      <h3>Recommended reading</h3>
      <div className="recommended-reads">
        <div>
          <h4>Books</h4>
          <ul>
            {books.map((read) => (
              <li key={read.title}>
                {read.url ? (
                  <a href={read.url} target="_blank" rel="noopener noreferrer">
                    {read.title}
                  </a>
                ) : (
                  read.title
                )}{" "}
                — {read.author} ({read.year})
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Academic</h4>
          <ul>
            {academic.map((read) => (
              <li key={read.title}>
                {read.url ? (
                  <a href={read.url} target="_blank" rel="noopener noreferrer">
                    {read.title}
                  </a>
                ) : (
                  read.title
                )}{" "}
                — {read.author} ({read.year})
              </li>
            ))}
          </ul>
        </div>
      </div>

      <h3>Resources</h3>
      <ul className="resource-links">
        <li>
          <a href={SOCIETY_FOR_NEUROECONOMICS_URL} target="_blank" rel="noopener noreferrer">
            Society for Neuroeconomics ↗
          </a>
        </li>
      </ul>

      <h3>Associated sites</h3>
      <ul className="resource-links">
        <li>
          <a href="https://www.behaviouralatlas.com/" target="_blank" rel="noopener noreferrer">
            Behavioural Atlas ↗
          </a>
        </li>
        <li>
          <a href="https://www.behaviouralengines.com/" target="_blank" rel="noopener noreferrer">
            Behavioural Engines ↗
          </a>
        </li>
      </ul>
    </div>
  );
}
