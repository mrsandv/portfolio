export default async function BlogEntry({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	return (
		<div className="text-black">
			<h1>Blog Entry</h1>
			<p>Slug: {slug}</p>
		</div>
	);
}
