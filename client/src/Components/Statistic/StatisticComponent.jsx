import HeaderComponent from "../ClassManagement/HeaderComponent";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import AvgComponent from "./AvgComponent";
import StudentComponent from "./StudentComponent";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: top,
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
      },
    },
  },
};
const StatisticComponent = ({ exam, statistic }) => {
  console.log("🚀 ~ StatisticComponent ~ statistic:", statistic);
  const scoreData = statistic.scoreDistribution;
  const data = {
    labels: scoreData.map((s) => parseFloat(s.score).toFixed(2)),
    datasets: [
      { label: "Số lượng", data: scoreData.map((s) => Math.round(s.total)) },
    ],
  };

  return (
    <div className="flex flex-col my-5 mx-[120px]">
      <HeaderComponent text={`Phân bố điểm`} />
      <p className="uppercase">{` ${exam?.testName}`}</p>
      <div className="flex justify-between mt-3 ">
        <div className="w-[70%] ">
          <Bar options={options} data={data} />
        </div>
        <div className="flex-1 ml-4">
          <AvgComponent avgScore={statistic?.average} />
          <StudentComponent student={statistic?.topScorer} />
        </div>
      </div>
    </div>
  );
};

export default StatisticComponent;
