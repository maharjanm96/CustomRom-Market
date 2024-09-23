import { NextResponse } from "next/server";
import { DBSCAN } from "density-clustering";

export const GET = async () => {
  console.log("Running GET request: DBSCAN Algorithm");

  // Static ROM data
  const roms = [
    { name: "ROM1", sold: 10 },
    { name: "ROM2", sold: 20 },
    { name: "ROM3", sold: 15 },
    { name: "ROM4", sold: 5 },
    { name: "ROM5", sold: 25 },
    { name: "ROM6", sold: 30 },
    { name: "ROM7", sold: 12 },
  ];

  const data = roms.map((rom) => [rom.sold]);

  try {
    // Run DBSCAN clustering
    const dbscan = new DBSCAN();
    const clusters = dbscan.run(data, 10, 2); // eps=10, minPoints=2

    console.log(clusters);

    // Map clusters back to ROM names
    const clusteredRoms = clusters.map((cluster) =>
      cluster.map((index) => ({
        name: roms[index].name,
        sold: roms[index].sold,
      }))
    );

    

    return NextResponse.json({ message: "success", clusters: clusteredRoms });
  } catch (error) {
    console.error("Error in DBSCAN algorithm:", error);

    // Return an error response if something goes wrong
    return NextResponse.json(
      { error: "Failed to execute DBSCAN algorithm" },
      { status: 500 }
    );
  }
};
