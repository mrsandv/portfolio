export default function Loader() {
	return (
		<div className="flex h-[80vh] w-full items-center justify-center">
			<div className="relative flex h-16 w-16">
				<div className="absolute inset-0 rounded-full border-4 border-gray-300" />
				<div className="absolute inset-0 animate-spin rounded-full border-4 border-t-rose-800" />
			</div>
		</div>
	);
}
