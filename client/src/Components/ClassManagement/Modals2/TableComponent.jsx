const TableComponent = ({ currentObjects, startIndex }) => {
  console.log(currentObjects);
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th className="p-4">Index</th>
          <th className="p-4">Content</th>
          <th className="p-4">Answers</th>
        </tr>
      </thead>
      <tbody>
        {currentObjects.map((item, index) => (
          <tr
            key={index}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <td className="p-4">{startIndex + index + 1}</td>
            <td className="p-4">{item.question}</td>
            <td className="p-4">
              <ul>
                {item.answers.map((answer, i) => (
                  <li key={i}>
                    {`${String.fromCharCode(65 + i)}. `}
                    {answer.A || answer.B || answer.C || answer.D}:
                    <strong>{answer.isCorrect}</strong>
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
