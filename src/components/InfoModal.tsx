import { createPortal } from "react-dom";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InfoModal({ isOpen, onClose }: InfoModalProps) {
  if (!isOpen) return null;

  return createPortal(
    <div className="info-modal-backdrop" onClick={onClose}>
      <div className="info-modal" onClick={(event) => event.stopPropagation()}>
        <h2 className="panel-heading">About this atlas</h2>
        <p>
          This atlas covers the brain regions most central to neuroeconomics — the study of
          value, reward, and choice in the brain. They&apos;re the regions that recur across the
          field&apos;s foundational papers on valuation (vmPFC, OFC), cognitive control (DLPFC,
          SMA), reward learning (VTA, NAcc, Caudate, Putamen, Habenula), memory-based valuation
          (Hippocampus), and social/risk-related choice (ACC, PCC, Insula, Amygdala, TPJ). More
          get added as the evidence for a region&apos;s role solidifies.
        </p>
        <p>
          It deliberately leaves out regions that show up in economics-adjacent research more
          broadly but aren&apos;t core to this specific circuit — general-purpose prefrontal or
          parietal association cortex, for instance. This keeps the atlas focused rather than an
          exhaustive map of every region a decision-making study has ever mentioned.
        </p>
        <p>
          See{" "}
          <a
            href="https://github.com/Joe-Speed/neuroeconomics/blob/main/ANATOMY.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            ANATOMY.md
          </a>{" "}
          in the repository for exactly which regions are real anatomical structures versus
          hand-verified approximations.
        </p>
        <button type="button" className="info-modal-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>,
    document.body,
  );
}
