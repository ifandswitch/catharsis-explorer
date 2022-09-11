import type { NextPage } from "next";
import Head from "next/head";
import { DisplayToken } from "../components/DisplayToken";
import { Triptych } from "../components/Triptych";

// @ts-ignore
export const getServerSideProps = (req, res) => {
  const tokenId = (req.query.tokenId as string) || 124;
  return {
    props: {
      tokenId,
    },
  };
};

// @ts-ignore
const Home: NextPage = ({ tokenId }) => {
  const id = parseInt(tokenId as string, 10);

  return (
    <div className="font-medium tracking-tight w-full p-3 md:p-6 lg:p-12">
      <Head>
        <title>Catharsis by Dario Lanza image explorer</title>
      </Head>
      <h1 className="text-xl">Catharsis by Dario Lanza</h1>
      <h2 className="text-zinc-400">
        Explore the relationships in the first long-structure and evolutive art
        project on the blockchain.
      </h2>
      <p className="text-zinc-400">
        See more at{" "}
        <a className="underline text-white" href="https://www.gmstudio.art/">
          gmstudio.art
        </a>
      </p>

      <p className="text-zinc-400">
        Enter a token ID, then with &quot;+50 editions&quot; selected, click
        next through each of the 20 neighbours on each side.
      </p>
      <Triptych startingPoint={id} />
    </div>
  );
};

function renderRow(startingPoint: number) {
  return (
    <div className="grid grid-cols-3 grid-rows-1 gap-0xl max-w-[1920px]">
      <DisplayToken tokenId={startingPoint} />
      <DisplayToken tokenId={startingPoint + 1} />
      <DisplayToken tokenId={startingPoint + 2} />
    </div>
  );
}

function renderGrid() {
  return (
    <div className="grid mt-56 catharsis-grid gap-0">
      {Array.from(Array(500).keys()).map((id) => (
        <DisplayToken key={id} tokenId={id} />
      ))}
    </div>
  );
}

export default Home;
