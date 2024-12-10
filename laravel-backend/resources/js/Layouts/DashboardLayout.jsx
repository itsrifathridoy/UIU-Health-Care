import {Head} from "@inertiajs/react";
import SideBar from "@/Pages/Admin/Components/SideBar.jsx";
import TopBar from "@/Pages/Admin/Components/TopBar.jsx";
import CustomerVsRetention from "@/Pages/Admin/Components/CustomerVsRetention.jsx";

export default function DashboardLayout({children,menuItems,notifications,user, title}) {

    return (
        <div className="flex h-screen w-screen bg-gradient-to-r from-[#ffff]  to-[#CEA88E]">
            <SideBar menuItems={menuItems}/>
            <div className="flex flex-col h-full w-full pr-[50px] pb-5">
                <TopBar notifications={notifications} user={user} title={title}/>
                <div className={"flex flex-col gap-4 w-full h-full bg-white rounded-2xl shadow p-5"}>
                    {children}
                </div>
            </div>
        </div>
    )
}
