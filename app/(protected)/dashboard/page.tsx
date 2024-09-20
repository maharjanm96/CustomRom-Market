import React from "react";
import DashboardComponent from "./_components/DashboardComponent";
import Sentiment from "sentiment";

const analyzeFeedback = (feedback: string) => {
  const sentiment = new Sentiment();
  const result = sentiment.analyze(feedback);
  return result;
};

const userFeedback =
  "I loved the ROM but the performance is worst !> its super fast";
const sentimentResult = analyzeFeedback(userFeedback);
console.log(sentimentResult.score);

const DashboardPage = () => {
  return (
    <div className="text-center">
      <DashboardComponent />
    </div>
  );
};

export default DashboardPage;
