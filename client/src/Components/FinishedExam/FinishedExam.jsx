import { useState } from "react"

const FinishedExam = (props) => {
    // const [className,setClassName] = useState("LTNC_GK1");
    // const [duration,setDuration] = useState("90m");
    // const [date,SetDate] = useState("20-8-2003");
    return (
        <>
            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-500" 
             style={{ backgroundColor: '#E1FDF9' }}>
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {props.className}
                    </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Date: {props.date}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Duration: {props.duration}
                </p>
               
            </div>

        </>
    )
}

export default FinishedExam