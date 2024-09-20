import React, { useState } from "react";
import kmeans from "ml-kmeans";

interface DataPoint {
  [key: number]: number;
}

interface ClusteringResult {
  clusters: number[];
  centroids: {
    centroid: number[];
    error: number;
    size: number;
  }[];
  converged: boolean;
  iterations: number;
}

const KMeansClustering: React.FC = () => {
  const [result, setResult] = useState<ClusteringResult | null>(null);

  const performClustering = () => {
    // Example data and centers
    const data: DataPoint[] = [
      [1, 1, 1],
      [1, 2, 1],
      [-1, -1, -1],
      [-1, -1, -1.5],
    ];

    const centers: DataPoint[] = [
      [1, 2, 1],
      [-1, -1, -1],
    ];

    // Perform K-Means clustering
    let ans = kmeans(data, 2, { initialization: centers });

    setResult(ans);
  };

  return (
    <div>
      <button onClick={performClustering}>Run K-Means Clustering</button>
      {result && (
        <div>
          <h3>Cluster Results:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default KMeansClustering;
