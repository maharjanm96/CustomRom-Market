import React from "react";
import DashboardComponent from "./_components/DashboardComponent";
import Sentiment from "sentiment";

const analyzeFeedback = (feedback: string) => {
  const sentiment = new Sentiment();
  const result = sentiment.analyze(feedback);
  return result;
};

const userFeedback = "I loved the ROmM but the performance is super fast!";
const sentimentResult = analyzeFeedback(userFeedback);
console.log(sentimentResult); // Will show positive, neutral, or negative scores

const DashboardPage = () => {
  return (
    <div className="text-center">
      <DashboardComponent />
    </div>
  );
};

export default DashboardPage;
