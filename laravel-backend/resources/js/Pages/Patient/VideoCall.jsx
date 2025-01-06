import PatientLayout from "@/Pages/Patient/Layout/PatientLayout.jsx";
import Video from "@/Pages/Patient/Components/VIdeo.jsx";

export default function VideoCall({id}) {
    return (
        <PatientLayout>
            <Video id={id}/>
        </PatientLayout>
    )
}
