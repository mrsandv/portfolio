// import { Button } from "@/components";
// import { menu } from "@/constants/";
// import Link from "next/link";

// const response = await fetch(`${process.env.CMS_SERVICES}/api/menu${process.env.NODE_ENV !== "production" ? "?draft=true" : ""}`, {
//   headers: {
//     "Authorization": `keys API-Key ${process.env.CMS_API_KEY}`
//   }
// });

// type TMenu = {
//   id: string;
//   name: string;
//   path: string;
// }

// const { docs: menu }: { docs: TMenu[] } = await response.json()

const Home = async () => {
  return (
    <div>
      <h1>About</h1>
      Hello, i&apos;m Marco
      <br />
      <br />
      JS | TS | React | GO | Fullstack developer
      <br />
      <br />
      <div>
        {/* {menu.map(item => <Link key={item.id} href={item.path}><Button>{item.text}</Button></Link>)} */}
      </div>
    </div>
  );
}

export default Home;