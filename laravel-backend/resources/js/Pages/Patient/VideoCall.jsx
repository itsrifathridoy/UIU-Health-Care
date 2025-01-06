import PatientLayout from "@/Pages/Patient/Layout/PatientLayout.jsx";
import Video from "@/Pages/Patient/Components/VIdeo.jsx";

export default function VideoCall({id,name}) {
    return (
        <PatientLayout title={'Video Consultation'}>
            <Video id={id} name={name}/>
        </PatientLayout>
    )
}
