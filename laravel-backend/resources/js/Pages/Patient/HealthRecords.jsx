import DashboardLayout from "@/Layouts/DashboardLayout.jsx";
import PatientLayout from "@/Pages/Patient/Layout/PatientLayout.jsx";
import HealthRecordsComponent from "@/Pages/Patient/Components/HealthRecordsComponent.jsx";

export default function HealthRecords() {
    return (
        <PatientLayout title={"Health Records"}>
            <HealthRecordsComponent></HealthRecordsComponent>
        </PatientLayout>
    )
}
