import { useState } from "react";
import "./ExamManagement.css";

const ExamManagement = () => {
    const examData = [
        { code: '00080423', name: 'LẬP TRÌNH NÂNG CAO - GIỮA KỲ 1', date: '2024-08-08', startTime: '08:00', endTime: '08:00' },
        { code: '00081024', name: 'LẬP TRÌNH NÂNG CAO - GIỮA KỲ 2', date: '2024-09-09', startTime: '', endTime: '' },
        { code: '00087825', name: 'LẬP TRÌNH NÂNG CAO - GIỮA KỲ 1', date: '2024-08-10', startTime: '', endTime: '' },
        { code: '00087826', name: 'LẬP TRÌNH NÂNG CAO - GIỮA KỲ 1', date: '2024-08-11', startTime: '', endTime: '' },
        { code: '00087833', name: 'LẬP TRÌNH NÂNG CAO - CUỐI KÌ 1', date: '2024-08-12', startTime: '', endTime: '' },
        { code: '00087834', name: 'LẬP TRÌNH NÂNG CAO - CUỐI KÌ 1', date: '2024-08-13', startTime: '', endTime: '' },
        { code: '00087835', name: 'LẬP TRÌNH NÂNG CAO - CUỐI KÌ 2', date: '2024-09-14', startTime: '', endTime: '' },
    ];

    const [date, setDate] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    
    const filteredExams = examData.filter(exam => {
        const matchesType = selectedType === '' || exam.name.includes(selectedType);
        const matchesSearch = searchTerm === '' || exam.name.toLowerCase().includes(searchTerm.toLowerCase())||exam.code.includes(searchTerm);
        const matchesDate = date === '' || exam.date === date;
        return matchesType && matchesSearch && matchesDate;
    });
 
    return (
        <div className="flex-1">
            <div className="max-w-2xl mx-auto flex items-center">
                <form className="flex-grow items-center">
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input 
                            type="search" 
                            id="default-search" 
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="Search Name or ID of Exam" 
                            required 
                        />
                    </div>
                </form>
                <input 
                    type="date" 
                    value={date}
                    onChange={handleDateChange}
                    className="ml-4"
                />
                <select className="ml-4" value={selectedType} onChange={handleTypeChange}>
                    <option value="">All Types</option>
                    <option value="GIỮA KỲ 1">GIỮA KÌ 1</option>
                    <option value="GIỮA KỲ 2">GIỮA KÌ 2</option>
                    <option value="CUỐI KÌ 1">CUỐI KÌ 1</option>
                    <option value="CUỐI KÌ 2">CUỐI KÌ 2</option>
                </select>
            </div>

            <div className="table-wrapper">
                <table className="table">
                    <thead className="thead">
                        <tr>
                            <th className="th">Mã kỳ thi</th>
                            <th className="th">Tên kỳ thi</th>
                            <th className="th">Ngày thi</th>
                            <th className="th">Giờ bắt đầu</th>
                            <th className="th">Giờ kết thúc</th>
                        </tr>
                    </thead>
                    <tbody className="tbody">
                        {filteredExams.map((exam, index) => (
                            <tr key={index}>
                                <td className="td">{exam.code}</td>
                                <td className="td">{exam.name}</td>
                                <td className="td">{exam.date}</td>
                                <td className="td">{exam.startTime}</td>
                                <td className="td">{exam.endTime}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ExamManagement;
