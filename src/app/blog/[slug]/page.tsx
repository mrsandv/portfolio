import Post from './Post';

export default async function BlogEntry({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	return <Post slug={slug} />;
}
