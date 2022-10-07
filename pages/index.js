import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import Backdrop from '../components/Backdrop';
import DeleteModal from '../components/DeleteModal';
import Skeleton from '../components/Skeleton';
import StudentModal from '../components/StudentModal';
import TBody from '../components/TBody';

export default function Home() {
    const id = useRef();
    const name = useRef();
    const gender = useRef();
    const gpaFrom = useRef();
    const gpaTo = useRef();

    const [students, setStudents] = useState([]);

    const [showDeleteModal, setDeleteShowModal] = useState(0);

    const [showStudentModal, setStudentShowModal] = useState(0);

    const [isLoading, setIsLoading] = useState(false);

    const setIdStudent = (method, id) => {
        if (method === 'DELETE') setDeleteShowModal(id);
        else if (method === 'PUT') setStudentShowModal(id);
    };

    const onSubmitHandle = async e => {
        e.preventDefault();
        let fetchUrl;
        if (
            id.current.value ||
            name.current.value ||
            gender.current.value ||
            gpaFrom.current.value ||
            gpaTo.current.value
        ) {
            fetchUrl = `./api/students?id=${id.current.value}&name=${name.current.value}&gender=${gender.current.value}&gpaFrom=${gpaFrom.current.value}&gpaTo=${gpaTo.current.value}`;
        } else {
            fetchUrl = './api/students';
        }
        const res = await fetch(fetchUrl);
        const data = await res.json();
        setStudents(data);
    };

    const closeDeleteModalHandle = () => {
        setDeleteShowModal(0);
    };

    const confirmDeleteModalHandle = async () => {
        await fetch(`./api/student/${showDeleteModal}`, {
            method: 'DELETE',
        });

        setDeleteShowModal(0);

        fetchStudents();
    };

    const closeStudentModalHandle = () => {
        setStudentShowModal(0);
    };

    const confirmStudentModalHandle = async (id, name, gender, gpa) => {
        if (id === -1) {
            await fetch(`./api/student/`, {
                method: 'POST',
                body: JSON.stringify({ name, gender, gpa }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } else {
            await fetch(`./api/student/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ id, name, gender, gpa }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        setStudentShowModal(0);

        fetchStudents();
    };

    async function fetchStudents() {
        setIsLoading(true);
        const res = await fetch('./api/students');
        const data = await res.json();
        setStudents(data);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <main>
            <div className="container mx-auto max-w-[90%] mt-5">
                <div className=" flex-col justify-center">
                    <h1 className="text-3xl font-bold mb-4">
                        Danh sách sinh viên
                    </h1>

                    <div className="mx-auto">
                        <form
                            className="flex justify-between items-center"
                            onSubmit={onSubmitHandle}
                        >
                            <div className="mb-6">
                                <label
                                    htmlFor="id"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Mã sinh viên
                                </label>

                                <input
                                    type="text"
                                    id="id"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    ref={id}
                                />
                            </div>
                            <div className="mb-6">
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Tên sinh viên
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    ref={name}
                                />
                            </div>

                            <div className="mb-6">
                                <label
                                    htmlFor="gender"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                                >
                                    Giới tính
                                </label>
                                <select
                                    defaultValue={''}
                                    id="gender"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 min-w-[140%]"
                                    ref={gender}
                                >
                                    <option value="">Giới tính</option>
                                    <option value="false">Nam</option>
                                    <option value="true">Nữ</option>
                                </select>
                            </div>

                            <div className="mb-6">
                                <label
                                    htmlFor="gpa-from"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Điểm trung bình
                                </label>
                                <input
                                    type="number"
                                    id="gpa-from"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Từ"
                                    step="0.01"
                                    ref={gpaFrom}
                                />
                            </div>

                            <div className="mb-6">
                                <label
                                    htmlFor="gpa-to"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    <span className="text-black">.</span>
                                </label>
                                <input
                                    type="number"
                                    id="gpa-to"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Đến"
                                    step="0.01"
                                    ref={gpaTo}
                                />
                            </div>

                            <button
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Tìm kiếm
                            </button>
                        </form>
                    </div>

                    <button
                        type="button"
                        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        onClick={() => setStudentShowModal(-1)}
                    >
                        Thêm sinh viên
                    </button>

                    <div className="overflow-x-auto relative mt-2">
                        {isLoading ? (
                            <Skeleton />
                        ) : (
                            <TBody
                                students={students}
                                setIdStudent={setIdStudent}
                            />
                        )}
                    </div>
                </div>
            </div>
            {showDeleteModal ? (
                <DeleteModal
                    onCancel={closeDeleteModalHandle}
                    onConfirm={confirmDeleteModalHandle}
                />
            ) : null}
            {showDeleteModal ? <Backdrop /> : null}
            {showStudentModal ? (
                <StudentModal
                    onCancel={closeStudentModalHandle}
                    onConfirm={confirmStudentModalHandle}
                    state={showStudentModal}
                />
            ) : null}
            {showStudentModal ? <Backdrop /> : null}
        </main>
    );
}
