import { Card } from "@/components"
import { projects } from "@/constants/"

const Projects = () => {
  return (
    <div>
      {
        projects.map(item => <Card key={item.id} title={item.title} description={item.description} href={item.href} media={item.media} />)
      }
    </div>
  )
}

export default Projects;