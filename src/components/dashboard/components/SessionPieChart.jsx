import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const SessionPieChart = ({ approvedCount, deniedCount, waitingCount }) => {
  const data = {
    labels: ["Approved", "Denied", "Waiting"],
    datasets: [
      {
        data: [approvedCount, deniedCount, waitingCount],
        backgroundColor: ["#4CAF50", "#F44336", "blue"], // Green & Red colors
        hoverBackgroundColor: ["#45A049", "#D32F2F", "blue"], // Darker Green & Red colors
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md w-48">
      <h3 className="text-lg font-semibold mb-2 text-center">
        Approval Status
      </h3>
      <Pie data={data} />
    </div>
  );
};

export default SessionPieChart;
