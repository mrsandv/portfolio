// import { Button } from "@/components";
// import { menu } from "@/constants/";
// import Link from "next/link";

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