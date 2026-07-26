# Anatomy reference

`public/brain.glb` is a single glTF file containing **76 separately named
mesh pieces**, built from the [BodyParts3D](http://lifesciencedb.jp/bp3d/)
dataset (CC BY-SA 2.1 Japan). Every piece can be exploded independently and
inspected by name — this file lists what they are and which ones the app's
12 neuroeconomics regions map to.

## The 12 neuroeconomics regions

Defined in [`src/lib/regions.ts`](src/lib/regions.ts), sourced from
[`neuroeconomics-research.md`](neuroeconomics-research.md).

| Region | Full name | Real anatomical mesh? | Mapped piece(s) |
|---|---|---|---|
| vmPFC | Ventromedial Prefrontal Cortex | No — approximated | **orbital gyri + straight gyrus** (`BP51`) — the medial/orbital surface it sits on |
| OFC | Orbitofrontal Cortex | No — approximated | **orbital gyri + straight gyrus** (`BP51`) — same piece as vmPFC, same territory |
| DLPFC | Dorsolateral Prefrontal Cortex | No — approximated | right/left **middle frontal gyrus** (established correspondence) |
| TPJ | Temporoparietal Junction | No — approximated | right/left **angular gyrus** + **supramarginal gyrus** + **posterior superior temporal gyrus** (the classic multi-gyrus TPJ complex) |
| SMA | Pre-SMA / Supplementary Motor Complex | No — approximated | right/left **superior frontal gyrus** (true SMA is on its medial surface; no separate piece for that exists here) |
| VTA | Ventral Tegmental Area | No — approximated | **midbrain + its peduncle** |
| NAcc | Nucleus Accumbens (Ventral Striatum) | No — not present in this atlas at all | right/left **putamen + caudate** (ventral striatum is continuous with both) |
| ACC | Anterior Cingulate Cortex | **Yes** | `FMA72717_ACC`, `FMA72718_ACC` (cingulate gyrus, split at its own anterior/posterior midpoint) |
| PCC | Posterior Cingulate Cortex | **Yes** | `FMA72717_PCC`, `FMA72718_PCC` |
| Caudate | Caudate Nucleus (Dorsal Striatum) | **Yes** | `FMA72826`, `FMA72827` |
| Insula | Anterior Insula | **Yes** | `FMA72977`, `FMA72978` |
| Amygdala | Amygdala | **Yes** | `FMA72832`, `FMA72833` |

These seven have no distinct physical boundary in any atlas — they're
defined by function or cytoarchitecture, not visible anatomy. The mapping
for each is a **hand-picked, explicit override**
(`FUNCTIONAL_REGION_PART_IDS` in [`src/lib/brainParts.ts`](src/lib/brainParts.ts)),
not an automated guess, and several are deliberately **multiple real pieces
highlighted together** where the literature actually describes a multi-gyrus
complex (TPJ, NAcc) rather than one structure — the architecture already
treats "a region" as "one or more mesh nodes," which is exactly how bilateral
pairs like Amygdala worked from the start.

An earlier version picked the "nearest" piece by raw 3D distance from the
region's MNI coordinate — it matched the VTA to the cerebellum, because
distance alone has no notion of which structures are actually related. vmPFC
and OFC were briefly left unmapped for the same reason (no piece existed in
the initially-downloaded set), until `BP51` — orbital gyri and the straight
gyrus (gyrus rectus), present in BodyParts3D's full dataset but not a child
of the "brain" composite the rest of these pieces came from — was found and
added specifically to cover that territory.

## All 76 mesh pieces

Every piece below can be exploded and is a real, separately selectable
`THREE.Mesh` node in `brain.glb`. Names come straight from the FMA
(Foundational Model of Anatomy) ontology via BodyParts3D's parts list.

**Cerebral cortex — frontal**
right/left superior frontal gyrus, right/left middle frontal gyrus,
right/left precentral gyrus

**Cerebral cortex — parietal**
right/left postcentral gyrus, right/left supramarginal gyrus,
right/left angular gyrus, left/right superior parietal lobule + precuneus

**Cerebral cortex — temporal**
right/left middle temporal gyrus, right/left inferior temporal gyrus,
right/left fusiform gyrus, right/left parahippocampal gyrus,
anterior/posterior part of right/left superior temporal gyrus

**Cerebral cortex — occipital**
right/left occipital lobe

**Cerebral cortex — insula**
right/left insula → **Insula**

**Cerebral cortex — cingulate**
right/left cingulate gyrus, each split into an anterior half (→ **ACC**) and
posterior half (→ **PCC**)

**Cerebral cortex — orbital/medial frontal**
orbital gyri + straight gyrus → **vmPFC** and **OFC**

**Cerebral cortex — other**
right/left accessory short gyrus (insula-adjacent)

**Limbic / medial temporal**
right/left amygdala → **Amygdala**, right/left hippocampus,
right/left parahippocampal gyrus (listed above), septum pellucidum

**Basal ganglia**
right/left caudate nucleus → **Caudate**, right/left putamen,
right/left globus pallidus

*(Putamen is now part of the NAcc mapping above. Globus pallidus is still
unmapped — it's a real, separate, exploded piece, but the research notes
don't cover it individually; if you want a "basal ganglia loop" region
added, it's ready to map in.)*

**Diencephalon**
right/left thalamus, hypothalamus, tuber cinereum, habenula, pineal body,
right/left lateral geniculate body, right/left medial geniculate body

**Brainstem**
midbrain, peduncle of midbrain, pons, medulla oblongata,
right/left superior colliculus + brachium, right/left inferior colliculus +
brachium

**Cerebellum**
cerebellum

**Ventricular system**
right/left lateral ventricle, third ventricle, fourth ventricle,
cerebral aqueduct

## How the code works

### Data flow

1. **`neuroeconomics-research.md`** — the original research notes (regions,
   roles, cited papers). This is the source of truth for content; it isn't
   parsed at runtime, it was transcribed once into:
2. **`src/lib/regions.ts`** — typed data: `REGIONS` (id, name, role text,
   approximate MNI coordinate, papers), plus the intro text, recommended
   reading list, and the Society for Neuroeconomics link.
3. **`assets/source/build_segmented_brain.py`** — a one-time build script,
   not part of the running app. It:
   - loads the 74 raw BodyParts3D OBJ files (already downloaded into
     `assets/source/brain_parts/`),
   - splits the two cingulate gyrus pieces into anterior/posterior halves,
   - centers and scales everything into one shared coordinate frame,
   - runs `trimesh.repair.fix_normals` (this is what makes the surface read
     as a real folded brain instead of a flat blob — normals must be
     exported explicitly or every piece renders featureless),
   - looks up each piece's plain-English name from BodyParts3D's parts list,
   - exports one glTF (`assets/source/brain-segmented.glb`) with all 76
     pieces as separately named nodes, plus
     **`src/lib/brainParts.generated.json`** — one entry per piece
     (`nodeName`, `englishName`, `regionId` if it's one of the 5 true
     anatomical regions, and its `centroid` in scene units).
   - `gltf-transform draco` then Draco-compresses the result into
     `public/brain.glb` (this step only compresses — it does not merge
     nodes back together, which would break per-piece explode/highlight).
4. **`src/lib/brainParts.ts`** — loads that generated JSON. `regionId` on a
   part covers the 5 true anatomical regions; `FUNCTIONAL_REGION_PART_IDS`
   is the hand-curated table covering the other 7. `nodeNamesForRegion(id)`
   is the single lookup both highlighting and the camera use — it doesn't
   care whether the region is "real" anatomy or a curated approximation, it
   just returns which mesh node name(s) belong to that region.
   `regionIdForNode(name)` is the reverse lookup, used so clicking or
   hovering a mapped piece directly in 3D also selects its region.

### Component tree

```
App                          — owns selectedRegionId + theme state
├─ AppHeader                 — title, Society for Neuroeconomics link, ThemeToggle
└─ app-layout
   ├─ BrainScene             — <Canvas>, camera, lights, Bloom postprocessing
   │  └─ BrainMesh           — loads brain.glb, drives highlight + explode per frame
   │  └─ ExplodeThreads      — the connecting lines during explode
   │  └─ CameraFlyTo         — pans/zooms to the selected region, then lets go
   └─ RegionPanel            — region pill list
      └─ RegionDetail | AboutPanel  — full role + papers, or intro + reading list
         └─ PaperList
```

### Highlighting

`BrainMesh` builds a `Map<nodeName, THREE.Mesh>` once when the model loads,
gives every mesh its own cloned material (critical — sharing one material
across pieces means highlighting one piece would flip the emissive color for
literally all of them, which was a real bug earlier in this project), and
adds a slightly larger, `BackSide`, dark child mesh to each piece for the
visible outline between regions. On every frame, it looks up
`nodeNamesForRegion(selectedRegionId)` and `nodeNamesForRegion(hoveredRegionId)`
and sets `material.emissiveIntensity` accordingly — selected pieces glow
brighter than hovered ones. Clicking or hovering any mapped piece directly
in 3D — anatomical or curated — selects its region via `regionIdForNode`,
and a floating label (`Html` from drei) shows its name at the region's
centroid.

### Explode view

`useExplodeProgress(isExploded)` is a hook that owns a single `ref` and
nudges it toward 0 or 1 every frame (`useFrame`), rather than storing it in
React state — it changes 60 times a second, and React re-renders are for UI,
not per-frame transforms. `BrainMesh` reads that ref and sets each piece's
position to `centroid * (EXPLODE_SCALE - 1) * progress` — every piece moves
radially outward from the brain's center, proportional to how far out it
already sits. `ExplodeThreads` draws one line per piece, from its true
position to its current exploded position, faded in as `progress` increases.

### Camera fly-to

`CameraFlyTo` animates the camera to the selected region's centroid (or, for
vmPFC/OFC, its approximate MNI-derived location) over a **fixed duration**
(1.2s), not until some "close enough" distance threshold — a threshold
doesn't work here, since an exponential lerp closes part of the remaining
gap every frame and can stay visually-but-not-numerically "arrived"
indefinitely, which would mean the animation never truly stops and keeps
overriding the camera every frame, fighting manual orbit/zoom forever (a
real bug this project hit once already). The viewing angle is always the
same fixed elevated direction the default camera uses — deriving it from
the target broke down for bilateral/central regions, whose averaged
centroid sits near the origin with no meaningful "outward from the brain"
direction.

### Theme

`useTheme` persists `light`/`dark` to `localStorage` and sets
`data-theme` on `<html>`; a small inline script in `index.html` sets it
*before* React mounts, so there's no flash of the wrong theme on load. CSS
variables (`--bg`, `--surface`, `--fg`, `--border`) in `src/index.css` do the
rest for the 2D UI. The 3D canvas background isn't a CSS element, so
`src/lib/sceneColors.ts` holds a matching `CANVAS_BACKGROUND` lookup that
`BrainScene` applies directly to the `three.js` scene background color.
