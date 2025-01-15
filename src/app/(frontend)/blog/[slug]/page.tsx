type TEntry = {
  params: Promise<{ slug: string }>
}

const Entry = async ({
  params,
}: TEntry) => {
  const slug = (await params).slug
  return <div>My Post: {slug}</div>
}

export default Entry;