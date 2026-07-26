import { PAPERS, paperUrl } from "../lib/papers";
import type { RegionPaperRef } from "../lib/regions";

interface PaperListProps {
  papers: readonly RegionPaperRef[];
}

export function PaperList({ papers }: PaperListProps) {
  return (
    <ul className="paper-list">
      {papers.map((ref) => {
        const paper = PAPERS[ref.paperId];
        if (!paper) return null;
        const url = paperUrl(paper);

        return (
          <li key={ref.paperId}>
            <p className="paper-citation">
              {url ? (
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {paper.citation}
                </a>
              ) : (
                paper.citation
              )}
            </p>
            <p className="paper-summary">{ref.relevance}</p>
          </li>
        );
      })}
    </ul>
  );
}
