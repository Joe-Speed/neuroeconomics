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
  | "Amygdala"
  | "Habenula"
  | "Putamen"
  | "Hippocampus";

export interface RegionPaperRef {
  /** Key into PAPERS in lib/papers.ts. */
  paperId: string;
  /** Why this paper matters for this specific region — the same paper often has a different angle per region. */
  relevance: string;
}

export interface Region {
  id: RegionId;
  name: string;
  role: string;
  /** Approximate MNI152 peak coordinate [x, y, z] in mm, for visualization only — not a registered atlas lookup. */
  mniCoords: readonly [number, number, number];
  papers: readonly RegionPaperRef[];
}

export const REGIONS: readonly Region[] = [
  {
    id: "vmPFC",
    name: "Ventromedial Prefrontal Cortex",
    role: 'The core "common currency" hub and arguably the most important area in neuroeconomics. The vmPFC integrates sensory, affective, and goal-related attributes into a single subjective value signal used for choice comparison. It flexibly incorporates attention and goals (e.g. "health" vs "taste") and is recruited across domains including consumption, intertemporal choice, and prosocial decisions. It also has roles in social behaviour, integrating social attributes (fairness, harm to others, cooperative context) into a common-currency signal, while weighing the costs of enforcing norms when punishment is costly.',
    mniCoords: [0, 45, -8],
    papers: [
      {
        paperId: "plassmann2007",
        relevance:
          "fMRI auction for foods: trial-by-trial vmPFC/OFC activity scaled with bids (WTP), establishing a continuous neural code for decision value.",
      },
      {
        paperId: "hare2011",
        relevance:
          'Instructed attention shifts made vmPFC incorporate "health" more; shows goal-dependent reweighting of attributes within vmPFC\'s value code.',
      },
      {
        paperId: "plassmann2008",
        relevance:
          "Price cues made the same wine taste better and boosted mOFC/vmPFC responses — beliefs/expectations directly alter experienced utility signals.",
      },
      {
        paperId: "kable2007",
        relevance:
          "vmPFC and ventral striatum encoded discounted value for delayed money, linking classical utility models with neural valuation mechanisms.",
      },
      {
        paperId: "hare2009",
        relevance:
          "Self-controllers recruited lateral PFC to bias vmPFC toward long-term goals (health), revealing top-down control over value construction.",
      },
      {
        paperId: "dequervain2004",
        relevance:
          "vmPFC/mOFC were more active when subjects had a strong desire to sanction but punishment was costly, consistent with integrating moral benefits and economic costs.",
      },
      {
        paperId: "rilling2002",
        relevance:
          "vmPFC/OFC co-activated with striatum during mutual cooperation, supporting a common-currency representation that includes social value.",
      },
    ],
  },
  {
    id: "OFC",
    name: "Orbitofrontal Cortex",
    role: "Computes experienced utility at consumption and integrates beliefs/expectations into value. Lateral OFC is recruited by risk/volatility; medial OFC tracks pleasantness and social reward. OFC also contributes to valuation under ambiguity and to cost-benefit integration when punishing norm violations.",
    mniCoords: [0, 40, -20],
    papers: [
      {
        paperId: "plassmann2008",
        relevance:
          "Price cues made identical wines taste better and selectively increased mOFC responses to consumption, demonstrating belief-dependent shifts in experienced utility signals.",
      },
      {
        paperId: "preuschoff2008",
        relevance:
          "While ventral striatum coded expected reward, risk-related signals appeared in insula and lateral OFC during a card task, linking OFC to variance-sensitive valuation.",
      },
      {
        paperId: "hsu2005",
        relevance:
          "Ambiguity (unknown probabilities) engaged anterior insula and OFC more than risk; ties OFC to evaluating options when probabilities are imprecise.",
      },
      {
        paperId: "rilling2002",
        relevance:
          "Mutual cooperation with a human partner activated vmPFC/OFC together with striatum, indicating OFC participation in social reward valuation.",
      },
    ],
  },
  {
    id: "DLPFC",
    name: "Dorsolateral Prefrontal Cortex",
    role: "Implements top-down control and goal maintenance, biasing valuation systems (e.g. vmPFC/striatum) toward long-term or rule-based objectives; supports norm compliance and self-control.",
    mniCoords: [44, 30, 24],
    papers: [
      {
        paperId: "mcclure2004",
        relevance:
          'Identified a "δ (delta) system" including lateral PFC that favoured patient choices over immediate gratification, aligning with controlled, planful valuation. Together with the beta coefficient, the paper suggests a dual-process model for choice valuation and decision-making.',
      },
      {
        paperId: "hare2009",
        relevance:
          "Dieters showing self-control engaged lateral PFC more and biased vmPFC to weight health attributes — demonstrating top-down control over valuation.",
      },
      {
        paperId: "knoch2008",
        relevance:
          "Modulating lateral PFC with tDCS altered acceptance of unfair offers, implying a causal role for DLPFC in norm enforcement/cognitive control.",
      },
    ],
  },
  {
    id: "TPJ",
    name: "Temporoparietal Junction",
    role: "Social inference / theory-of-mind node used to represent others' beliefs, intentions, and responsibility. In neuroeconomics, TPJ supports belief-based valuation and strategic reasoning (fairness expectations, trust).",
    mniCoords: [55, -55, 25],
    papers: [
      {
        paperId: "saxe2006",
        relevance:
          "Identified right TPJ selectivity for belief reasoning, providing the substrate for belief-dependent value adjustments in social decision tasks.",
      },
      {
        paperId: "rillingSanfey2011",
        relevance:
          "Review highlighting TPJ within a social decision network (TPJ/STS/mPFC) used in trust, fairness, and cooperation tasks.",
      },
    ],
  },
  {
    id: "SMA",
    name: "Pre-SMA / Supplementary Motor Complex",
    role: "In value-based choice, the pre-SMA doesn't compute how good options are; it helps decide when and whether to commit to an action policy. Two control roles matter for neuroeconomics: (1) adjusting the decision threshold under time pressure (speed–accuracy trade-off), and (2) switching from a default/automatic policy to a controlled alternative when context or incentives change. Through cortico-basal ganglia loops (pre-SMA ↔ striatum/STN), this shapes response caution, strategy switches, and the mapping from values to actions.",
    mniCoords: [0, 5, 55],
    papers: [
      {
        paperId: "forstmann2008",
        relevance:
          "Manipulating urgency in a perceptual decision task lowered decision thresholds (model-based) and increased activity in pre-SMA and striatum, linking this circuit to the speed–accuracy trade-off that governs how quickly values are turned into actions.",
      },
      {
        paperId: "isoda2007",
        relevance:
          "Single-unit recordings plus causal stimulation show pre-SMA neurons ramp for successful policy switches, suppressing habitual responses and enabling slower, correct alternatives — the kind of control needed when incentives or task rules change.",
      },
    ],
  },
  {
    id: "VTA",
    name: "Ventral Tegmental Area",
    role: "Midbrain dopaminergic hub projecting to ventral striatum and vmPFC/OFC. In neuroeconomics, VTA dopamine neurons provide a reward prediction error (RPE) teaching signal: brief bursts for better-than-expected outcomes and pauses for worse-than-expected ones. This RPE calibrates learned values and selection in cortico-striatal circuits, shaping preference learning, choice under uncertainty, and motivation.",
    mniCoords: [0, -16, -12],
    papers: [
      {
        paperId: "schultz1997",
        relevance:
          "Primate electrophysiology showed midbrain dopamine (incl. VTA/SNc) shifts phasic firing from reward delivery to its predictive cue, with bursts for outcomes better than expected and dips for worse — canonical evidence that dopamine implements a temporal-difference-like RPE, the core learning signal used in neuroeconomic models.",
      },
      {
        paperId: "dardenne2008",
        relevance:
          "High-resolution human fMRI targeting the brainstem showed VTA BOLD tracks positive RPEs and scales with reward probability, while ventral striatum encodes signed RPEs — direct human evidence that VTA carries the dopaminergic teaching signal used to update values during choice.",
      },
    ],
  },
  {
    id: "ACC",
    name: "Anterior Cingulate Cortex",
    role: "Salience/conflict monitor that tracks norm conflict and affective arousal. In value-based and social choices, ACC co-activates with anterior insula (AI) for unfairness/empathy and contributes to evaluating the costs of controlling and regulating actions to guide behaviour.",
    mniCoords: [0, 30, 20],
    papers: [
      {
        paperId: "sanfey2003",
        relevance:
          "ACC (with bilateral AI) responded to unfair human offers, consistent with conflict between monetary gain and fairness motives.",
      },
      {
        paperId: "singer2004",
        relevance:
          "Conjunction analysis showed overlapping ACC activation when feeling pain and seeing a partner in pain, indexing affective salience that can bias prosocial valuation.",
      },
    ],
  },
  {
    id: "PCC",
    name: "Posterior Cingulate Cortex",
    role: "Default-mode / valuation hub implicated in internal mentation and context-dependent value. In intertemporal choice, PCC appears with limbic regions that prioritise immediacy, aligning with present-biased valuation.",
    mniCoords: [0, -50, 30],
    papers: [
      {
        paperId: "mcclure2004",
        relevance:
          'Identified a limbic "β (beta) system" that included PCC alongside vmPFC and ventral striatum for immediate rewards — relevant to present bias in discounting.',
      },
    ],
  },
  {
    id: "NAcc",
    name: "Nucleus Accumbens (Ventral Striatum)",
    role: "Limbic–striatal hub that converts expected rewards and incentive cues into motivation and action. In neuroeconomics, NAcc activity scales with anticipated monetary gains and positive prediction errors, biases accept/reject choices in risky gambles, and reflects the appetitive side of valuation that competes with aversive/uncertainty signals from regions like the insula.",
    mniCoords: [10, 10, -8],
    papers: [
      {
        paperId: "knutson2001",
        relevance:
          "Event-related fMRI with graded incentives: anticipatory NAcc activity increased with expected monetary reward and preceded action, establishing NAcc as a key substrate for translating anticipated value into approach behaviour.",
      },
      {
        paperId: "tom2007",
        relevance:
          "In mixed gambles, NAcc activity scaled with potential gains (approach), while anterior insula scaled with potential losses (avoidance); behavioural loss aversion tracked differential slopes, tying NAcc gain sensitivity to risk-taking propensity.",
      },
    ],
  },
  {
    id: "Caudate",
    name: "Caudate Nucleus (Dorsal Striatum)",
    role: "Part of the dorsal striatum central to goal-directed (action–outcome) control. The caudate integrates cortical inputs, including lateral PFC, to compute and update action-specific values, biasing which action is selected in basal ganglia loops. In neuroeconomic tasks, single-unit and fMRI work show the caudate carries signals for action value, chosen value, and the learning/prediction required for flexible, cost-benefit decisions.",
    mniCoords: [14, 12, 10],
    papers: [
      {
        paperId: "samejima2005",
        relevance:
          'Single-unit recordings in primate dorsal striatum (including caudate) during a two-action choice task showed a large fraction of projection neurons encoded the values of specific actions during the decision period. These action-value signals predicted subsequent choice, providing direct neural evidence for an "actor" representation that guides selection among actions in economic choice.',
      },
      {
        paperId: "lau2008",
        relevance:
          "Recording caudate neurons while monkeys followed a reward-matching strategy, the study found distinct populations encoding action values and chosen values around the time of choice. Dynamics tracked learning-consistent adjustments in value, positioning the caudate as a key substrate for computing and updating the values that drive action selection.",
      },
    ],
  },
  {
    id: "Insula",
    name: "Anterior Insula",
    role: "Encodes risk/volatility and norm-violation-related affect; anticipates aversive outcomes and ambiguity. In social contexts, the anterior insula tracks empathic affect and unfairness, biasing choices toward norm enforcement or avoidance.",
    mniCoords: [38, 18, 2],
    papers: [
      {
        paperId: "preuschoff2008",
        relevance:
          "Insula showed a quadratic relation to probability during anticipation and signalled risk prediction errors, marking volatility-sensitive computation separate from expected value.",
      },
      {
        paperId: "sanfey2003",
        relevance:
          "Anterior insula responses were stronger for unfair (human) offers and predicted rejections — linking AI to norm-violation aversion in choice.",
      },
      {
        paperId: "singer2004",
        relevance:
          "Observing a loved one in pain activated AI (and ACC), indicating the insula's role in affect sharing that can shape prosocial choices.",
      },
      {
        paperId: "hsu2005",
        relevance:
          "Ambiguity elicited greater AI engagement than risk, consistent with the insula tracking uncertainty aversion that modulates valuation.",
      },
    ],
  },
  {
    id: "Amygdala",
    name: "Amygdala",
    role: "Tracks aversive value, salience, and learning signals that shape choice under loss, risk, and social threat. Contributes to ambiguity aversion and to negative affect that can bias economic decisions.",
    mniCoords: [22, -4, -18],
    papers: [
      {
        paperId: "basten2010",
        relevance:
          "Loss magnitude was encoded in the amygdala, reward magnitude in NAcc, and the cost-benefit difference in vmPFC — tying the amygdala to aversive components of value.",
      },
      {
        paperId: "hsu2005",
        relevance:
          "Ambiguity (vs risk) increased amygdala responses alongside AI/OFC, indicating a role in uncertainty aversion that feeds into valuation — evidence that we are inherently more inclined to avoid and dislike uncertainty in decisions.",
      },
      {
        paperId: "olsson2007",
        relevance:
          "Demonstrated amygdala involvement in socially acquired aversive values — mechanisms that can shape trust, risk, and norm-sensitive choices.",
      },
    ],
  },
  {
    id: "Habenula",
    name: "Habenula",
    role: "Small epithalamic structure that encodes the expected badness of an outcome and inhibits midbrain dopamine neurons in response — the mirror image of VTA's positive reward-prediction-error signal. In neuroeconomics, it provides the 'disappointment' half of the teaching signal that updates learned values: dopamine bursts for better-than-expected outcomes, habenula-driven dips for worse-than-expected ones.",
    mniCoords: [0, -24, 8],
    papers: [
      {
        paperId: "matsumoto2007",
        relevance:
          "Primate recordings showed lateral habenula neurons fire more for worse-than-expected outcomes, then inhibit VTA dopamine neurons — identifying the habenula as the source of the negative half of the dopaminergic reward-prediction-error signal.",
      },
      {
        paperId: "matsumoto2009",
        relevance:
          "Follow-up recordings showed habenula neurons encode the expected badness of an outcome directly, not just an error signal — evidence it computes negative value rather than merely relaying it.",
      },
      {
        paperId: "hikosaka2010",
        relevance:
          "Review framing the habenula explicitly as a value-based decision-making structure, tying its aversive-prediction role to choice behaviour more broadly.",
      },
    ],
  },
  {
    id: "Putamen",
    name: "Putamen (Dorsal Striatum)",
    role: "Part of the dorsal striatum, alongside the caudate, but specialised for habit-based rather than goal-directed value: it drives stimulus-response associations learned through repetition, competing with vmPFC/OFC's more flexible, outcome-sensitive valuation. In neuroeconomics, the putamen is the substrate for the 'habit' side of the classic habit-versus-goal-directed dual-system account of choice.",
    mniCoords: [28, 8, 4],
    papers: [
      {
        paperId: "odoherty2004",
        relevance:
          "Landmark dissociation showing ventral striatum (NAcc) tracks reward prediction error while dorsal striatum — caudate and putamen — tracks the action-contingent value that drives instrumental choice.",
      },
      {
        paperId: "balleine2007",
        relevance:
          "Review specifically framing the dorsal striatum's contribution to reward-based decision-making as distinct from the ventral striatum's, with the putamen implicated in the more automatic, action-value side of that split.",
      },
      {
        paperId: "tricomi2009",
        relevance:
          "Directly implicates the posterior dorsolateral striatum — anatomically the putamen — in human habit learning, the stimulus-response value system that competes with goal-directed valuation.",
      },
    ],
  },
  {
    id: "Hippocampus",
    name: "Hippocampus",
    role: "Best known for episodic memory, in neuroeconomics it supports the deliberative, model-based side of valuation: retrieving and recombining memories of past outcomes to simulate and compare options, rather than relying on cached, habit-like values. It also transfers value between associated items via memory, biasing preference even for options never directly rewarded.",
    mniCoords: [28, -20, -14],
    papers: [
      {
        paperId: "wimmer2012",
        relevance:
          "Shows hippocampal memory associations transfer value between items that were never directly rewarded — memory mechanisms directly biasing economic preference.",
      },
      {
        paperId: "bornstein2013",
        relevance:
          "Ties hippocampal activity to model-based (as opposed to habitual, model-free) valuation — the deliberative half of the dual-system decision-making framework.",
      },
      {
        paperId: "bakkour2019",
        relevance:
          "Tests a causal-style link between hippocampal function and deliberation time during value-based choice, using amnesic patients as a natural lesion comparison.",
      },
    ],
  },
];

export function getRegionById(regionId: RegionId | null): Region | undefined {
  return REGIONS.find((region) => region.id === regionId);
}

export const NEUROECONOMICS_INTRO =
  "Neuroeconomics is an interdisciplinary field that combines neuroscience, psychology, and economics to study decision-making. It explores brain regions involved in value computation, reward processing, and choice behaviour. Key areas include the vmPFC (valuation), dlPFC (cognitive control), and striatum (reward learning). Understanding the field helps explain irrational behaviour, biases, and preferences.";

interface RecommendedRead {
  title: string;
  author: string;
  year: number;
  category: "book" | "academic";
  /** Publisher, DOI resolver, or other stable catalogue page — null until verified. */
  url: string | null;
}

export const RECOMMENDED_READS: readonly RecommendedRead[] = [
  {
    title: "Decisions, Uncertainty, and the Brain",
    author: "Glimcher",
    year: 2004,
    category: "book",
    url: "https://mitpress.mit.edu/9780262572279/decisions-uncertainty-and-the-brain/",
  },
  {
    title: "Neuroeconomics: A Guide to the New Science of Decision Making",
    author: "Politser",
    year: 2008,
    category: "book",
    url: "https://global.oup.com/academic/product/neuroeconomics-9780195305821",
  },
  {
    // Actually a review article (Annual Review of Neuroscience, 30, 535–574), not a book.
    title: "The Neural Basis of Decision Making",
    author: "Gold & Shadlen",
    year: 2007,
    category: "academic",
    url: "https://doi.org/10.1146/annurev.neuro.29.051605.113038",
  },
  {
    title: "Neuroeconomics: Decision Making and the Brain",
    author: "Glimcher & Fehr",
    year: 2014,
    category: "academic",
    url: "https://www.sciencedirect.com/book/9780124160088/neuroeconomics",
  },
];

export const SOCIETY_FOR_NEUROECONOMICS_URL = "https://neuroeconomics.org/";
