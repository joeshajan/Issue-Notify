import { type NextPage } from "next";
import Head from "next/head";

// import { api } from "../utils/api";

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });
  // console.log(hello);

  return (
    <>
      <Head>
        <title>Issue Notify</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div>home page</div>
    </>
  );
};

export default Home;
