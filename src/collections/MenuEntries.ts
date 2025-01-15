import type { CollectionConfig } from 'payload'

const MenuEntries: CollectionConfig = {
  slug: 'menu',
  versions:{
drafts:{
  autosave:true
}
  },
  fields: [{
    type:"text",
    label:"Nombre",
    name:"name",
  localized:true
  },
  {
    label:"Ruta",
    type:"text",
    name:"path"
  },
  ]
}

export default MenuEntries;