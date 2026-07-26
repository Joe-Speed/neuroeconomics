interface Paper {
  citation: string;
  /** Digital Object Identifier, verified against Crossref. Link is derived, never stored separately. */
  doi: string | null;
}

export function paperUrl(paper: Paper): string | null {
  return paper.doi ? `https://doi.org/${paper.doi}` : null;
}

// Single source of truth for every cited paper's bibliographic data. Several
// papers are cited by more than one region (e.g. hsu2005 under OFC, Insula,
// and Amygdala) — each paper lives here exactly once; regions.ts references
// papers by id instead of repeating the citation text. Add a DOI here once
// and every region citing that paper gets the link.
export const PAPERS: Record<string, Paper> = {
  plassmann2007: {
    citation:
      "Plassmann, H., O'Doherty, J., & Rangel, A. (2007). Orbitofrontal cortex encodes willingness to pay in everyday economic transactions. Journal of Neuroscience, 27(37), 9984–9988.",
    doi: "10.1523/jneurosci.2131-07.2007",
  },
  hare2011: {
    // Crossref lists this as Journal of Neuroscience 31(30), 11077–11087 (2011) —
    // the source bibliography had it as PNAS 108(17); corrected here.
    citation:
      "Hare, T. A., Malmaud, J., & Rangel, A. (2011). Focusing attention on the health aspects of foods changes value signals in vmPFC and improves dietary choice. Journal of Neuroscience, 31(30), 11077–11087.",
    doi: "10.1523/jneurosci.6383-10.2011",
  },
  plassmann2008: {
    citation:
      "Plassmann, H., O'Doherty, J., Shiv, B., & Rangel, A. (2008). Marketing actions can modulate neural representations of experienced pleasantness. PNAS, 105(3), 1050–1054.",
    doi: "10.1073/pnas.0706929105",
  },
  kable2007: {
    citation:
      "Kable, J. W., & Glimcher, P. W. (2007). The neural correlates of subjective value during intertemporal choice. Nature Neuroscience, 10(12), 1625–1633.",
    doi: "10.1038/nn2007",
  },
  hare2009: {
    citation:
      "Hare, T. A., Camerer, C. F., & Rangel, A. (2009). Self-control in decision-making involves modulation of the vmPFC valuation system. Science, 324(5927), 646–648.",
    doi: "10.1126/science.1168450",
  },
  dequervain2004: {
    citation:
      "de Quervain, D. J.-F., Fischbacher, U., Treyer, V., et al. (2004). The neural basis of altruistic punishment. Science, 305(5688), 1254–1258.",
    doi: "10.1126/science.1100735",
  },
  rilling2002: {
    citation:
      "Rilling, J. K., Gutman, D. A., Zeh, T. R., Pagnoni, G., Berns, G. S., & Kilts, C. D. (2002). A neural basis for social cooperation. Neuron, 35(2), 395–405.",
    doi: "10.1016/s0896-6273(02)00755-9",
  },
  preuschoff2008: {
    // Crossref lists this as Journal of Neuroscience 28(11), 2745–2752 (2008) —
    // the source bibliography had it as vol 26(2), 2006; corrected here.
    citation:
      "Preuschoff, K., Quartz, S. R., & Bossaerts, P. (2008). Human insula activation reflects risk prediction errors as well as risk. Journal of Neuroscience, 28(11), 2745–2752.",
    doi: "10.1523/jneurosci.4286-07.2008",
  },
  hsu2005: {
    citation:
      "Hsu, M., Bhatt, M., Adolphs, R., Tranel, D., & Camerer, C. F. (2005). Neural systems responding to degrees of uncertainty in human decision-making. Science, 310(5754), 1680–1683.",
    doi: "10.1126/science.1115327",
  },
  mcclure2004: {
    citation:
      "McClure, S. M., Laibson, D., Loewenstein, G., & Cohen, J. D. (2004). Separate neural systems value immediate and delayed monetary rewards. Science, 306(5695), 503–507.",
    doi: "10.1126/science.1100907",
  },
  knoch2008: {
    citation:
      "Knoch, D., Nitsche, M. A., Fischbacher, U., et al. (2008). Studying the neurobiology of social interaction with transcranial direct current stimulation: the example of punishing unfairness. Cerebral Cortex, 18, 1987–1990.",
    doi: "10.1093/cercor/bhm237",
  },
  saxe2006: {
    citation:
      "Saxe, R., & Powell, L. J. (2006). It's the thought that counts: specific brain regions for one component of theory of mind. Psychological Science, 17(8), 692–699.",
    doi: "10.1111/j.1467-9280.2006.01768.x",
  },
  rillingSanfey2011: {
    citation:
      "Rilling, J., & Sanfey, A. G. (2011). The neuroscience of social decision-making. Annual Review of Psychology, 62, 23–48.",
    doi: "10.1146/annurev.psych.121208.131647",
  },
  forstmann2008: {
    citation:
      "Forstmann, B. U., Dutilh, G., Brown, S., Neumann, J., von Cramon, D. Y., Ridderinkhof, K. R., & Wagenmakers, E.-J. (2008). Striatum and pre-supplementary motor area facilitate decision-making under time pressure. PNAS, 105(45), 17538–17542.",
    doi: "10.1073/pnas.0805903105",
  },
  isoda2007: {
    citation:
      "Isoda, M., & Hikosaka, O. (2007). Switching from automatic to controlled action by monkey medial frontal cortex. Nature Neuroscience, 10(2), 240–248.",
    doi: "10.1038/nn1830",
  },
  schultz1997: {
    citation:
      "Schultz, W., Dayan, P., & Montague, P. R. (1997). A neural substrate of prediction and reward. Science, 275(5306), 1593–1599.",
    doi: "10.1126/science.275.5306.1593",
  },
  dardenne2008: {
    citation:
      "D'Ardenne, K., McClure, S. M., Nystrom, L. E., & Cohen, J. D. (2008). BOLD responses reflecting dopaminergic signals in the human ventral tegmental area. Science, 319(5867), 1264–1267.",
    doi: "10.1126/science.1150605",
  },
  sanfey2003: {
    citation:
      "Sanfey, A. G., Rilling, J. K., Aronson, J. A., Nystrom, L. E., & Cohen, J. D. (2003). The neural basis of economic decision-making in the Ultimatum Game. Science, 300(5626), 1755–1758.",
    doi: "10.1126/science.1082976",
  },
  singer2004: {
    citation:
      "Singer, T., Seymour, B., O'Doherty, J., et al. (2004). Empathy for pain involves the affective but not sensory components of pain. Science, 303(5661), 1157–1162.",
    doi: "10.1126/science.1093535",
  },
  knutson2001: {
    citation:
      "Knutson, B., Adams, C. M., Fong, G. W., & Hommer, D. (2001). Anticipation of increasing monetary reward selectively recruits nucleus accumbens. Journal of Neuroscience, 21(16), RC159.",
    doi: "10.1523/jneurosci.21-16-j0002.2001",
  },
  tom2007: {
    citation:
      "Tom, S. M., Fox, C. R., Trepel, C., & Poldrack, R. A. (2007). The neural basis of loss aversion in decision-making under risk. Science, 315(5811), 515–518.",
    doi: "10.1126/science.1134239",
  },
  samejima2005: {
    citation:
      "Samejima, K., Ueda, Y., Doya, K., & Kimura, M. (2005). Representation of action-specific reward values in the striatum. Science, 310(5752), 1337–1340.",
    doi: "10.1126/science.1115270",
  },
  lau2008: {
    citation:
      "Lau, B., & Glimcher, P. W. (2008). Value representations in the primate striatum during matching behaviour. Neuron, 58(3), 451–463.",
    doi: "10.1016/j.neuron.2008.02.021",
  },
  basten2010: {
    citation:
      "Basten, U., Biele, G., Heekeren, H. R., & Fiebach, C. J. (2010). How the brain integrates costs and benefits during decision making. PNAS, 107(50), 21767–21772.",
    doi: "10.1073/pnas.0908104107",
  },
  olsson2007: {
    citation: "Olsson, A., & Phelps, E. A. (2007). Social learning of fear. Nature Neuroscience, 10(9), 1095–1102.",
    doi: "10.1038/nn1968",
  },
  matsumoto2007: {
    citation:
      "Matsumoto, M., & Hikosaka, O. (2007). Lateral habenula as a source of negative reward signals in dopamine neurons. Nature, 447(7148), 1111–1115.",
    doi: "10.1038/nature05860",
  },
  matsumoto2009: {
    citation:
      "Matsumoto, M., & Hikosaka, O. (2009). Representation of negative motivational value in the primate lateral habenula. Nature Neuroscience, 12(1), 77–84.",
    doi: "10.1038/nn.2233",
  },
  hikosaka2010: {
    citation:
      "Hikosaka, O. (2010). The habenula: from stress evasion to value-based decision-making. Nature Reviews Neuroscience, 11(7), 503–513.",
    doi: "10.1038/nrn2866",
  },
  odoherty2004: {
    citation:
      "O'Doherty, J., Dayan, P., Schultz, J., Deichmann, R., Friston, K., & Dolan, R. J. (2004). Dissociable roles of ventral and dorsal striatum in instrumental conditioning. Science, 304(5669), 452–454.",
    doi: "10.1126/science.1094285",
  },
  balleine2007: {
    citation:
      "Balleine, B. W., Delgado, M. R., & Hikosaka, O. (2007). The role of the dorsal striatum in reward and decision-making. Journal of Neuroscience, 27(31), 8161–8165.",
    doi: "10.1523/jneurosci.1554-07.2007",
  },
  tricomi2009: {
    citation:
      "Tricomi, E., Balleine, B. W., & O'Doherty, J. P. (2009). A specific role for posterior dorsolateral striatum in human habit learning. European Journal of Neuroscience, 29(11), 2225–2232.",
    doi: "10.1111/j.1460-9568.2009.06796.x",
  },
  wimmer2012: {
    citation:
      "Wimmer, G. E., & Shohamy, D. (2012). Preference by association: how memory mechanisms in the hippocampus bias decisions. Science, 338(6104), 270–273.",
    doi: "10.1126/science.1223252",
  },
  bornstein2013: {
    citation:
      "Bornstein, A. M., & Daw, N. D. (2013). Cortical and hippocampal correlates of deliberation during model-based decisions for rewards in humans. PLOS Computational Biology, 9(12), e1003387.",
    doi: "10.1371/journal.pcbi.1003387",
  },
  bakkour2019: {
    citation:
      "Bakkour, A., Palombo, D. J., Zylberberg, A., Kang, Y. H., Reid, A., Verfaellie, M., Shadlen, M. N., & Shohamy, D. (2019). The hippocampus supports deliberation during value-based decisions. eLife, 8, e46080.",
    doi: "10.7554/elife.46080",
  },
};
