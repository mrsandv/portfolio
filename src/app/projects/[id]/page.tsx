import ClientView from './client-view';

type Params = Promise<{ id: string }>;

export default async function ProjectPage(props: { params: Params }) {
	const { id } = await props.params;

	return <ClientView id={id} />;
}
