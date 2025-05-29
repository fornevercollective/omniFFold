import json

def simulate_tracking():
    print("Simulating pedestrian tracking...")
    npc_data = [{"id": i, "x": i * 1.1, "y": i * 0.5} for i in range(10)]
    with open("npc_block_config.json", "w") as f:
        json.dump(npc_data, f, indent=2)

if __name__ == "__main__":
    simulate_tracking()
