export default function TBody({ students, setIdStudent }) {
    return (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="dark text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="py-3 px-6">
                        STT
                    </th>
                    <th scope="col" className="py-3 px-6">
                        Tên sinh viên
                    </th>
                    <th scope="col" className="py-3 px-6">
                        Giới tính
                    </th>
                    <th scope="col" className="py-3 px-6">
                        Điểm trung bình
                    </th>
                    <th scope="col" className="py-3 px-6">
                        {' '}
                    </th>
                </tr>
            </thead>
            <tbody>
                {students.map((student, index) => (
                    <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        key={student.id}
                    >
                        <th
                            scope="row"
                            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                            {index + 1}
                        </th>
                        <td className="py-4 px-6">{student.name}</td>
                        <td className="py-4 px-6">
                            {student.gender ? 'Nữ' : 'Nam'}
                        </td>
                        <td className="py-4 px-6">{student.gpa}</td>
                        <td>
                            <i
                                className="bx bxs-edit text-lg cursor-pointer mr-3 "
                                onClick={() => setIdStudent('PUT', student)}
                            ></i>
                            <i
                                className="bx bxs-trash text-lg cursor-pointer"
                                onClick={() =>
                                    setIdStudent('DELETE', student.id)
                                }
                            ></i>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
