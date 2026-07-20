export type RegionId =
  | "vmPFC"
  | "OFC"
  | "DLPFC"
  | "TPJ"
  | "SMA"
  | "VTA"
  | "ACC"
  | "PCC"
  | "NAcc"
  | "Caudate"
  | "Insula"
  | "Amygdala";

export interface Region {
  id: RegionId;
  name: string;
  role: string;
  /** Approximate MNI152 peak coordinate [x, y, z] in mm, for visualization only — not a registered atlas lookup. */
  mniCoords: readonly [number, number, number];
}

export const REGIONS: readonly Region[] = [
  {
    id: "vmPFC",
    name: "Ventromedial Prefrontal Cortex",
    role: "Integrates sensory, affective, and goal-related attributes into a single subjective-value signal used to compare options across choice domains.",
    mniCoords: [0, 45, -8],
  },
  {
    id: "OFC",
    name: "Orbitofrontal Cortex",
    role: "Computes experienced utility at consumption; lateral OFC tracks risk and ambiguity, medial OFC tracks pleasantness and social reward.",
    mniCoords: [0, 40, -20],
  },
  {
    id: "DLPFC",
    name: "Dorsolateral Prefrontal Cortex",
    role: "Implements top-down control, biasing valuation systems like vmPFC and striatum toward long-term or rule-based goals.",
    mniCoords: [44, 30, 24],
  },
  {
    id: "TPJ",
    name: "Temporoparietal Junction",
    role: "Supports theory-of-mind — representing others' beliefs and intentions — underpinning belief-based and fairness-sensitive valuation.",
    mniCoords: [55, -55, 25],
  },
  {
    id: "SMA",
    name: "Pre-SMA / Supplementary Motor Complex",
    role: "Governs when and whether to commit to an action policy: adjusting decision thresholds and switching from habitual to controlled behaviour.",
    mniCoords: [0, 5, 55],
  },
  {
    id: "VTA",
    name: "Ventral Tegmental Area",
    role: "Midbrain dopamine source broadcasting a reward-prediction-error teaching signal to striatum and prefrontal cortex.",
    mniCoords: [0, -16, -12],
  },
  {
    id: "ACC",
    name: "Anterior Cingulate Cortex",
    role: "Monitors conflict and salience, co-activating with insula during unfairness or the cost of self-control.",
    mniCoords: [0, 30, 20],
  },
  {
    id: "PCC",
    name: "Posterior Cingulate Cortex",
    role: "Default-mode / valuation hub linked to context-dependent value and present-biased discounting.",
    mniCoords: [0, -50, 30],
  },
  {
    id: "NAcc",
    name: "Nucleus Accumbens (Ventral Striatum)",
    role: "Converts anticipated reward and incentive cues into motivation and approach behaviour.",
    mniCoords: [10, 10, -8],
  },
  {
    id: "Caudate",
    name: "Caudate Nucleus (Dorsal Striatum)",
    role: "Computes and updates action-specific values that bias which action is selected.",
    mniCoords: [14, 12, 10],
  },
  {
    id: "Insula",
    name: "Anterior Insula",
    role: "Encodes risk, ambiguity, and norm-violation affect; anticipates aversive outcomes.",
    mniCoords: [38, 18, 2],
  },
  {
    id: "Amygdala",
    name: "Amygdala",
    role: "Tracks aversive value, salience, and threat-related learning that bias choice under loss and risk.",
    mniCoords: [22, -4, -18],
  },
];
