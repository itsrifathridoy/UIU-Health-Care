import PatientLayout from "@/Pages/Patient/Layout/PatientLayout.jsx";

export default function AddHealthRecord() {
    return (
        <PatientLayout title={"Add Health Record"}>
            <section id="measurements" className="section">
                <div className="bg-gray-50 min-h-screen p-6">


                    <form className="mt-8 space-y-6 bg-white p-6 rounded-lg shadow-md">
                        <div className="flex justify-center mb-6">
                            <div className="text-orange-500 text-xl">
                                <img src="../images/patient/medical-record_10531098.png" height="50" width="60" alt="records"/>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <i className="fas fa-weight"></i> Weight (kg)
                                </label>
                                <input
                                    type="text"
                                    placeholder="Weight"
                                    className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-orange-200 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <i className="fas fa-heartbeat"></i> Heart Rate (bpm)
                                </label>
                                <input
                                    type="text"
                                    placeholder="Heart Rate"
                                    className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-orange-200 focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Blood Pressure</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <i className="fas fa-tachometer-alt"></i> Systolic (mmHg)
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Systolic"
                                        className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-orange-200 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <i className="fas fa-tachometer-alt"></i> Diastolic (mmHg)
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Diastolic"
                                        className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-orange-200 focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Body Measurements</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <i className="fas fa-ruler"></i> Chest (In)
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Chest"
                                        className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-orange-200 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <i className="fas fa-ruler-combined"></i> Waist (In)
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Waist"
                                        className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-orange-200 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <i className="fas fa-ruler"></i> Hip (In)
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Hip"
                                        className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-orange-200 focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center mt-6">
                            <button
                                type="submit"
                                className="bg-orange-500 text-white px-6 py-2 rounded-lg shadow hover:bg-orange-600 mt-10"
                            >
                                Add Record
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </PatientLayout>
    )
}
