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
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchStatistic } from "../../redux/Action/ExamAction";
import { statistic } from "../../redux/Reducer/ExamSlice";
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
const StatisticComponent = ({ exam }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStatistic(exam?.id));
  }, []);
  const statisticData = useSelector(statistic);
  console.log("🚀 ~ StatisticComponent ~ statistic:", statisticData);
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

  return (
    <div className="flex flex-col my-5 mx-[120px]">
      <HeaderComponent text={`Phân bố điểm`} />
      <p className="uppercase">{` ${exam?.testName}`}</p>
      <div className="flex justify-between mt-3 ">
        <div className="w-[70%] ">
          <Bar options={options} data={data} />
        </div>
        <div className="flex-1 ml-4">
          <AvgComponent avgScore={statisticData?.average} />
          <StudentComponent student={statisticData?.topScorer} />
        </div>
      </div>
    </div>
  );
};

export default StatisticComponent;
