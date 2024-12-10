import PatientLayout from "@/Pages/Patient/Layout/PatientLayout.jsx";
import ChatApp from "@/Pages/Patient/Components/ChatApp.jsx";
import {Head} from "@inertiajs/react";

export default function Messages() {
    return (
        <PatientLayout title={'Messages'}>
            <Head title="Messages"/>

            <ChatApp></ChatApp>
        </PatientLayout>
    );
}
