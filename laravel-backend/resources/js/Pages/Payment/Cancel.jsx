import {Link} from "@inertiajs/react";

export default function Cancel() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <h1 className="text-2xl font-bold">Payment Cancelled</h1>
            <Link href="/dashboard" className="mt-4 text-blue-500">Go back to dashboard</Link>
        </div>
    )
}
