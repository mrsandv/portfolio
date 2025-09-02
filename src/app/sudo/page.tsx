"use client"
import { ReactNode, useState } from "react";

const tabs: Array<{ id: number, label: string, component: ReactNode }> = [
  { id: 0, label: "Projects", component: <p>Acá una muestra de que ya me logee</p> },
  { id: 1, label: "Blog post", component: <p>Acá una muestra de mis proyectos</p> },
  { id: 2, label: "Subscribers", component: <p>Acá una muestra de mis subscribers</p> },
];

export default function SudoPage() {
  const [activeTab, setActiveTab] = useState<number>(0);

  return <div >
    <div className="w-full h-10">
      {tabs.map(({ id, label }) => <a className={`${activeTab === id ? 'border-slate-800' : 'border-slate-300'} cursor-pointer border-b-2 pb-0.5 mx-5 text-black`} key={id} onClick={() => { setActiveTab(id) }}>{label}</a>)}
    </div>
    <div className="flex text-black min-h-[75vh] p-5">
      {tabs[activeTab].component}
    </div>
  </div>
}