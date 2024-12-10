import DashboardLayout from "@/Layouts/DashboardLayout.jsx";

export default function PatientLayout({ children,title }) {
    const menuItems = [
        { href: "/patient", icon: "fa-solid fa-house", label: "Dashboard" },
        { href: "/patient/messages", icon: "fa-solid fa-envelope", label: "Messages" },
        { href: "/patient/appointments", icon: "fa-solid fa-calendar-check", label: "Appointments" },
        { href: "/patient/consultation", icon: "fa-solid fa-stethoscope", label: "Consultation" },
        { href: "/patient/health", icon: "fa-solid fa-heartbeat", label: "Health Records" },
        { href: "/patient/payments", icon: "fa-solid fa-wallet", label: "Payments" },
    ];

    const notifications = [
        { id: 1, message: "New user registered" },
        { id: 2, message: "New post published" },
    ];

    const user = {
        name: "Rifat Hridoy",
        userType: "Student",
        avatar: "https://placehold.co/40x40",

    }

    return (
        <DashboardLayout notifications={notifications} menuItems={menuItems} user={user} title={title}>
            {children}
        </DashboardLayout>
    )

}
