import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { Meta } from "../pages/api/token";

async function getTokenMeta(id: number) {
  const res = await fetch("/api/token?id=" + id);
  return await res.json();
}

function renderImage(data: Meta) {
  return (
    <Image
      src={data.image}
      width={640}
      height={768}
      alt={"Catharsis #" + data.id}
    />
  );
}

interface DisplayTokenProps {
  tokenId: number;
}

export function DisplayToken({ tokenId }: DisplayTokenProps) {
  const { data } = useQuery<Meta>(["tokens" + tokenId], () =>
    getTokenMeta(tokenId)
  );

  return (
    <div className="flex flex-col relative max-w-[640px] space-y-3">
      <Link
        href={`https://opensea.io/assets/ethereum/0x66293a9b1339ca99623e82bc71f88d767f60ad21/${
          data?.id || 0
        }`}
      >
        <a className="flex flex-col space-y-3 hover:underline">
          {data ? renderImage(data) : <p>no data</p>}
          <div className="bottom-6 left-6 opacity-80 text-sm md:text-lg lg:text-xl font-bold leading-tight mt-2">
            <span className="leading-tight">
              {data?.name.replace("Catharsis", "")}
            </span>
          </div>
        </a>
      </Link>
      <ul className="font-medium text-xs text-zinc-400 ">
        {data?.attributes
          ? Object.keys(data?.attributes)
              ?.sort()
              .map((attr) => {
                const url = `https://opensea.io/collection/catharsis-by-dario-lanza?search[stringTraits][0][name]=${attr}&search[stringTraits][0][values][0]=${data.attributes[attr]}&search[sortAscending]=true&search[sortBy]=UNIT_PRICE`;
                return (
                  <li key={attr} className="flex w-full">
                    <span className="w-1/3 hover:underline">
                      <Link href={url}>
                        <a>{attr}</a>
                      </Link>
                    </span>
                    <span className="text-zinc-500 dark:text-white hover:underline">
                      <Link href={url}>
                        <a>{data.attributes[attr]}</a>
                      </Link>
                    </span>
                  </li>
                );
              })
          : null}
      </ul>
    </div>
  );
}
