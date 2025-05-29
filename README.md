# omniFFold - city_block_combined_prototype

This prototype includes:
- Python pipeline for pedestrian detection and contrail tracking
- Edge and object detection overlays
- Point cloud and Gaussian splat generation
- Viewer setups for Unity, Blender, and Three.js

## Setup Instructions
1. Install Python dependencies in `pipeline/requirements.txt`
2. Run the pipeline on sample data in `data/`
3. Open visualizers in `viewers/` to explore outputs

Compatible with MOTChallenge and PETS2009 datasets.

>
city_block_combined_prototype/
└── data/
    └── npc_block_config.json   ← make sure this file exists
/omniFFold/
│
├── index.html                          ← Main landing page with iframe embed
│
├── city_block_combined_prototype/
│   ├── index.html                      ← Standalone city block viewer
│   ├── viewer.js                       ← Three.js interactive viewer
│   ├── style.css                       ← Viewer-specific styles
│   ├── npc_block_config.json           ← NPC pedestrian layout
│   ├── gaussian_splats/                ← Splat point cloud data (.ply/.pcd/.bin)
│   ├── contrails/                      ← JSON or line coordinates of paths
│   ├── edge_maps/                      ← Optional edge detection overlays
│   ├── viewers/
│   │   ├── unity/                      ← Unity export files / WebGL build
│   │   └── blender/                    ← Blender scenes or preview renders
│   └── assets/
│       ├── textures/                   ← Sidewalks, cars, buildings, etc.
│       └── environment_map.hdr         ← Lighting/IBL for 3D
>
