import type { CollectionConfig } from 'payload'

const ApiKeys: CollectionConfig = {
  slug: 'keys',
  auth: {
    useAPIKey: true,
    disableLocalStrategy: true,
  },
  access:{
    // read:() =>false
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label:"Nombre"
    },
    {
      name:"description",
      type:"textarea",
      required:true,
      label:"Descripción"
    }
  ],
}

export default ApiKeys;