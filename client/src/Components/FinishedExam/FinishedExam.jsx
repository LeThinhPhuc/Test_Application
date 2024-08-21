const FinishedExam = ({ exam }) => {
  return (
    <>
      <div
        className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-500"
        style={{ backgroundColor: "#E1FDF9" }}
      >
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {exam.testName}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Date: {exam.testDay}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Duration: {exam.testTime}
        </p>
      </div>
    </>
  );
};

export default FinishedExam;
