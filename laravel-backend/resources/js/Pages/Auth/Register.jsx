import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/AuthLayout.jsx';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthLayout from "@/Layouts/AuthLayout.jsx";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout>
            <Head title="Register"/>

            <h1 className="text-[1.8em] font-bold">Create Your Account</h1>
            <p className="text-gray-500 text-[0.8em]">
                Join UIU Healthcare and access all healthcare services at your fingertips.
            </p>

            <form onSubmit={submit} className="w-[70%] mt-10 flex flex-col items-center gap-4">
                {/* Name Field */}
                <div className="w-full">
                    <InputLabel htmlFor="name" value="Full Name"/>
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-2"/>
                </div>

                {/* Email Field */}
                <div className="w-full">
                    <InputLabel htmlFor="email" value="Email"/>
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2"/>
                </div>

                {/* Password Field */}
                <div className="w-full">
                    <InputLabel htmlFor="password" value="Password"/>
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData("password", e.target.value)}
                        required
                    />
                    <InputError message={errors.password} className="mt-2"/>
                </div>

                {/* Confirm Password Field */}
                <div className="w-full">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password"/>
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData("password_confirmation", e.target.value)}
                        required
                    />
                    <InputError message={errors.password_confirmation} className="mt-2"/>
                </div>

                {/* Actions */}
                <div className="w-full mt-4 flex items-center justify-between">
                    <Link
                        href="/login"
                        className="text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Already registered?
                    </Link>
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>

            {/*<form onSubmit={submit}>*/}
            {/*    <div>*/}
            {/*        <InputLabel htmlFor="name" value="Name" />*/}

            {/*        <TextInput*/}
            {/*            id="name"*/}
            {/*            name="name"*/}
            {/*            value={data.name}*/}
            {/*            className="mt-1 block w-full"*/}
            {/*            autoComplete="name"*/}
            {/*            isFocused={true}*/}
            {/*            onChange={(e) => setData('name', e.target.value)}*/}
            {/*            required*/}
            {/*        />*/}

            {/*        <InputError message={errors.name} className="mt-2" />*/}
            {/*    </div>*/}

            {/*    <div className="mt-4">*/}
            {/*        <InputLabel htmlFor="email" value="Email" />*/}

            {/*        <TextInput*/}
            {/*            id="email"*/}
            {/*            type="email"*/}
            {/*            name="email"*/}
            {/*            value={data.email}*/}
            {/*            className="mt-1 block w-full"*/}
            {/*            autoComplete="username"*/}
            {/*            onChange={(e) => setData('email', e.target.value)}*/}
            {/*            required*/}
            {/*        />*/}

            {/*        <InputError message={errors.email} className="mt-2" />*/}
            {/*    </div>*/}

            {/*    <div className="mt-4">*/}
            {/*        <InputLabel htmlFor="password" value="Password" />*/}

            {/*        <TextInput*/}
            {/*            id="password"*/}
            {/*            type="password"*/}
            {/*            name="password"*/}
            {/*            value={data.password}*/}
            {/*            className="mt-1 block w-full"*/}
            {/*            autoComplete="new-password"*/}
            {/*            onChange={(e) => setData('password', e.target.value)}*/}
            {/*            required*/}
            {/*        />*/}

            {/*        <InputError message={errors.password} className="mt-2" />*/}
            {/*    </div>*/}

            {/*    <div className="mt-4">*/}
            {/*        <InputLabel*/}
            {/*            htmlFor="password_confirmation"*/}
            {/*            value="Confirm Password"*/}
            {/*        />*/}

            {/*        <TextInput*/}
            {/*            id="password_confirmation"*/}
            {/*            type="password"*/}
            {/*            name="password_confirmation"*/}
            {/*            value={data.password_confirmation}*/}
            {/*            className="mt-1 block w-full"*/}
            {/*            autoComplete="new-password"*/}
            {/*            onChange={(e) =>*/}
            {/*                setData('password_confirmation', e.target.value)*/}
            {/*            }*/}
            {/*            required*/}
            {/*        />*/}

            {/*        <InputError*/}
            {/*            message={errors.password_confirmation}*/}
            {/*            className="mt-2"*/}
            {/*        />*/}
            {/*    </div>*/}

            {/*    <div className="mt-4 flex items-center justify-end">*/}
            {/*        <Link*/}
            {/*            href={route('login')}*/}
            {/*            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"*/}
            {/*        >*/}
            {/*            Already registered?*/}
            {/*        </Link>*/}

            {/*        <PrimaryButton className="ms-4" disabled={processing}>*/}
            {/*            Register*/}
            {/*        </PrimaryButton>*/}
            {/*    </div>*/}
            {/*</form>*/}
        </AuthLayout>
    );
}