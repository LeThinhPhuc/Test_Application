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
const StatisticComponent = ({ examData }) => {
  const scoreData = [
    { score: 2, total: 3 },
    { score: 3, total: 1 },
    { score: 3.5, total: 1 },
    { score: 4, total: 3 },
    { score: 5, total: 1 },
    { score: 5, total: 1 },
    { score: 6, total: 2 },
    { score: 7.5, total: 2 },
    { score: 10, total: 1 },
  ];
  const data = {
    labels: scoreData.map((s) => s.score),
    datasets: [
      { label: "Số lượng", data: scoreData.map((s) => Math.round(s.total)) },
    ],
  };

  const avgScore = 7.5;
  const student = { name: "Võ Thị Thu Hòa", point: 10.0 };
  return (
    <div className="flex flex-col my-5 mx-[120px]">
      <HeaderComponent text={`Phân bố điểm`} />
      {`KỲ THI ${examData.name}`}
      <div className="flex justify-between mt-3 gap-10">
        <div className="w-[60%] ">
          <Bar options={options} data={data} />
        </div>
        <div className="flex-1">
          <AvgComponent avgScore={avgScore} />
          <StudentComponent student={student} />
        </div>
      </div>
    </div>
  );
};

export default StatisticComponent;
