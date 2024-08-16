import { useNavigate } from "react-router-dom";

const TableComponent = ({
    label,
    classData,
    objects,
    headers = [],
    getColumns,
}) => {

    console.log(objects)

    const navigate = useNavigate();
    return (
        <div className="flex flex-col">
            <div className="text-[18px] pb-5 flex justify-between">
                {label !== "" && <p className="text-[18px] pb-5 ml-6">{label}</p>}
                {label === "Danh sách kỳ thi" && (
                    <button
                        onClick={() =>
                            navigate(`/teacher/createExam/${classData.ma}`, {
                                state: classData,
                            })
                        }
                        className="mr-6 drop-shadow-lg bg-white rounded-xl text-[16px] text-[#01008A] px-6 py-2 hover:text-white hover:bg-[#01008A]/80"
                    >
                        Create Exam
                    </button>
                )}
            </div>
            <table className="w-full border-collapse border-1 border-black/50 text-[12px]">
                <thead className="bg-[#01008A] text-white text-center">
                    <tr>
                        {headers.map((header, i) => (
                            <td key={i} className="border border-white/50 p-2">
                                {header}
                            </td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {objects.map((value, index) => (

                        <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            {Object.keys(value).map(key => (
                                <td className="border border-black/50 p-2" key={key}>{value[key]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableComponent;
