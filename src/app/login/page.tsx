'use client';
import { Button, Input } from 'components/ui';
import { useStore } from 'context';
import { useRouter } from 'next/navigation';
import { type ChangeEvent, type FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { fetchAPI } from 'utils/http';

export default function LoginPage() {
	const { login } = useStore();
	const [credentials, setCredentials] = useState<{
		email: string;
		password: string;
	}>({ email: '', password: '' });
	const router = useRouter();
	const signIn = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { email, password } = credentials;
		const { success, message, data, res } = await fetchAPI({
			endpoint: '/api/login',
			body: JSON.stringify({ email: email, password }),
			method: 'POST',
		});

		if (!res.ok || !success) {
			toast.error(message);
		}
		if (success) {
			login({ name: data.name, rol: data.rol });
			router.push('/sudo');
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		const { name, value } = e.target;
		setCredentials({ ...credentials, [name]: value });
	};

	return (
		<div className="flex justify-center items-center min-h-[75vh]">
			<form
				className="flex flex-col p-5 w-1/6 h-fit gap-2 bg-stone-100 border border-gray-200 rounded-lg shadow-sm shadow-stone-500/40 hover:shadow-rose-800/30 dark:bg-zinc-800 dark:border-gray-700"
				onSubmit={signIn}
				autoComplete="off"
			>
				<Input
					label="Email"
					autoComplete="email"
					type="text"
					name="email"
					value={credentials.email}
					placeholder="Email"
					onChange={handleChange}
				/>
				<Input
					label="Password"
					autoComplete="current-password"
					type="password"
					name="password"
					value={credentials.password}
					placeholder="Password"
					onChange={handleChange}
				/>
				<Button type="submit">Login</Button>
			</form>
		</div>
	);
}
