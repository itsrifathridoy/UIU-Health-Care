import AdminLayout from "@/Pages/Admin/Layout/AdminLayout.jsx";
import {Head, Link} from "@inertiajs/react";

export default function Doctors(){
    return (
        <AdminLayout>
            <Head title="Doctors"/>
            <div className={'flex flex-col  h-full'}>
                <div className={'flex h-[10%] w-full  items-center'}>
                    <div className={'w-[50%] h-full flex items-center pl-5'}>
                        <h1>Doctors</h1>
                        <Link className={"bg-red-300 rounded-lg text-white h-8 w-28 text-center justify-center"} href={'/admin/doctors/add'}>Add New</Link>
                    </div>
                    </div>
                </div>
        </AdminLayout>
);
}
