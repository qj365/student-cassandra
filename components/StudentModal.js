import { useRef, useEffect } from 'react';

export default function StudentModal({ state, onCancel, onConfirm }) {
    const nameRef = useRef();
    const genderRef = useRef();
    const gpaRef = useRef();

    function submitHandler(e) {
        e.preventDefault();

        onConfirm(
            state.id ? state.id : -1,
            nameRef.current.value,
            genderRef.current.value,
            gpaRef.current.value
        );
    }

    const fetchStudentEdit = async () => {
        if (typeof state === 'object') {
            nameRef.current.value = state.name;
            genderRef.current.value = state.gender;
            gpaRef.current.value = state.gpa;
        }
    };

    useEffect(() => {
        fetchStudentEdit();
    }, []);

    return (
        <div
            id="authentication-modal"
            aria-hidden="true"
            className="w-[30rem] fixed top-[20vh] left-[calc(50%-15rem)] z-50"
        >
            <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button
                        type="button"
                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                        data-modal-toggle="authentication-modal"
                        onClick={onCancel}
                    >
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="py-6 px-6 lg:px-8">
                        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                            {state === -1
                                ? 'Thêm sinh viên'
                                : 'Cập nhật sinh viên'}
                        </h3>
                        <form className="space-y-6" onSubmit={submitHandler}>
                            <div>
                                <label
                                    htmlFor="name-input"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Tên sinh viên
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name-input"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    required
                                    ref={nameRef}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="gender-input"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Giới tính
                                </label>
                                <select
                                    id="gender-input"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full"
                                    ref={genderRef}
                                >
                                    <option value="false">Nam</option>
                                    <option value="true">Nữ</option>
                                </select>
                            </div>
                            <div>
                                <label
                                    htmlFor="gpa-input"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Điểm trung bình
                                </label>
                                <input
                                    type="number"
                                    name="gpa"
                                    id="gpa-input"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    min="0"
                                    max="4"
                                    step="0.01"
                                    required
                                    ref={gpaRef}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                {state === -1
                                    ? 'Thêm sinh viên'
                                    : 'Cập nhật sinh viên'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
