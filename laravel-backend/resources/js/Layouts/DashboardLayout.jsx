import { Head, usePage } from "@inertiajs/react";
import SideBar from "@/Pages/Admin/Components/SideBar.jsx";
import TopBar from "@/Pages/Admin/Components/TopBar.jsx";
import CustomerVsRetention from "@/Pages/Admin/Components/CustomerVsRetention.jsx";
import { useEffect, useState } from "react";
import CallingModal from "@/Components/CallingModal.jsx";

export default function DashboardLayout({ children, menuItems, notifications, user, title }) {

    const { auth } = usePage().props;
    console.log(auth.user);

    // State for the modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [consultationID, setConsultationID] = useState(null); // State to store the consultation ID

    // Calling tone audio

    useEffect(() => {
        Echo.private(`calling.${auth.user.id}`)
            .listen('.CallingNotificationEvent', (e) => {
                setConsultationID(e.consultationID); // Set the consultation ID
                console.log('Calling notification received:', e);
                setIsModalOpen(true); // Show the modal
            })
            .error((error) => {
                console.error('Channel subscription error:', error);
            });
    }, [auth.user.id]);

    // Close the modal
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="flex h-screen w-screen bg-gradient-to-r from-[#ffff] to-[#CEA88E]">
            <SideBar menuItems={menuItems} />
            <div className="flex flex-col h-full w-full pr-[50px] pb-5">
                <TopBar notifications={notifications} user={user} title={title} />
                <div className={"flex flex-col gap-4 w-full h-full bg-white rounded-2xl shadow p-5"}>
                    {children}
                </div>
            </div>

            {/* Calling Modal */}
            <CallingModal isOpen={isModalOpen} onClose={closeModal} consultationID={consultationID} />
        </div>
    );
}
