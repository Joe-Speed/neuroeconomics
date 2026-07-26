import glob
import json
import os
from pathlib import Path

import numpy as np
import trimesh

SCRIPT_DIR = Path(__file__).resolve().parent
REPO_ROOT = SCRIPT_DIR.parent.parent

PART_DIR = SCRIPT_DIR / "brain_parts"
PARTS_LIST_PATH = SCRIPT_DIR / "bodyparts3d_parts_list_e.txt"
OUT_GLB = SCRIPT_DIR / "brain-segmented.glb"
OUT_METADATA = REPO_ROOT / "src" / "lib" / "brainParts.generated.json"
SCALE = 0.02


def load_english_names():
    names = {}
    with open(PARTS_LIST_PATH, encoding="utf-8") as f:
        for line in f:
            parts = line.rstrip("\n").split("\t")
            if len(parts) >= 2:
                names[parts[0]] = parts[1]
    return names

# FMA id -> regionId, for the structures that are real, separate anatomical
# parts in this dataset (bilateral pairs share one regionId).
REGION_BY_PART_ID = {
    "FMA72832": "Amygdala",
    "FMA72833": "Amygdala",
    "FMA72977": "Insula",
    "FMA72978": "Insula",
    "FMA72826": "Caudate",
    "FMA72827": "Caudate",
    "FMA62032": "Habenula",
    "FMA72828": "Putamen",
    "FMA72829": "Putamen",
    "FMA72713": "Hippocampus",
    "FMA72714": "Hippocampus",
}

# Cingulate gyrus (FMA72717 right, FMA72718 left) has no separate ACC/PCC
# parts in this dataset, so each is split at its own anterior-posterior
# midpoint. In this dataset's raw coordinate frame, more negative Y is
# anterior (confirmed against orbital-gyri vs precuneus reference parts).
CINGULATE_IDS = ["FMA72717", "FMA72718"]


def load_raw_parts():
    parts = {}
    for path in sorted(glob.glob(os.path.join(PART_DIR, "*.obj"))):
        part_id = os.path.splitext(os.path.basename(path))[0]
        parts[part_id] = trimesh.load(path, force="mesh")
    return parts


def split_cingulate(mesh):
    y_min, y_max = mesh.bounds[0][1], mesh.bounds[1][1]
    midpoint = (y_min + y_max) / 2
    anterior = mesh.slice_plane(plane_origin=[0, midpoint, 0], plane_normal=[0, 1, 0])
    posterior = mesh.slice_plane(plane_origin=[0, midpoint, 0], plane_normal=[0, -1, 0])
    return anterior, posterior


def main():
    raw_parts = load_raw_parts()
    english_names = load_english_names()

    pieces = {}
    for part_id, mesh in raw_parts.items():
        if part_id in CINGULATE_IDS:
            anterior, posterior = split_cingulate(mesh)
            pieces[f"{part_id}_ACC"] = anterior
            pieces[f"{part_id}_PCC"] = posterior
        else:
            pieces[part_id] = mesh

    all_vertices = np.concatenate([m.vertices for m in pieces.values()], axis=0)
    global_center = all_vertices.mean(axis=0)

    scene = trimesh.Scene()
    node_metadata = []
    for node_name, mesh in sorted(pieces.items()):
        mesh = mesh.copy()
        mesh.apply_translation(-global_center)
        mesh.apply_scale(SCALE)
        trimesh.repair.fix_normals(mesh)
        scene.add_geometry(mesh, node_name=node_name, geom_name=node_name)

        region_id = None
        base_id = node_name.split("_")[0]
        if node_name.endswith("_ACC"):
            region_id = "ACC"
        elif node_name.endswith("_PCC"):
            region_id = "PCC"
        else:
            region_id = REGION_BY_PART_ID.get(base_id)

        base_english = english_names.get(base_id, base_id)
        if node_name.endswith("_ACC"):
            english_name = f"{base_english} (anterior half)"
        elif node_name.endswith("_PCC"):
            english_name = f"{base_english} (posterior half)"
        else:
            english_name = base_english

        centroid = mesh.vertices.mean(axis=0)
        node_metadata.append(
            {
                "nodeName": node_name,
                "englishName": english_name,
                "regionId": region_id,
                "centroid": [round(float(v), 5) for v in centroid],
            }
        )

    scene.export(OUT_GLB, include_normals=True)
    with open(OUT_METADATA, "w") as f:
        json.dump(node_metadata, f, indent=2)

    print(f"wrote {len(pieces)} nodes to {OUT_GLB}")
    print(f"wrote metadata to {OUT_METADATA}")
    region_counts = {}
    for entry in node_metadata:
        if entry["regionId"]:
            region_counts[entry["regionId"]] = region_counts.get(entry["regionId"], 0) + 1
    print("region node counts:", region_counts)


if __name__ == "__main__":
    main()
