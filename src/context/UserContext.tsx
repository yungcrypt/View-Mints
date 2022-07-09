import React, {
  useEffect,
  useMemo,
  useState,
  createContext,
  useContext,
} from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Connection } from "@solana/web3.js";
import { Metaplex } from "@metaplex-foundation/js-next";
import { hasAtom } from "../components/selector/atoms";
import { atom, useRecoilState } from "recoil";
import axios from "axios";

type ContextResult = {
  result: MetaResult[];
};

type MetaResult = {
  image: string;
  animation: string;
  description: string;
  name: string;
  attributes: any[];
};
export const SteakContext = createContext<ContextResult>({
  result: [ {
    image: "",
    animation: "",
    description: "",
    name: "",
    attributes: [],
  },
  ]
});

export const UserProvider: React.FC<any> = ({ children }) => {
  const [result, setResult] = useState<MetaResult[]>([
    {
      image: "",
      animation: "",
      description: "",
      name: "",
      attributes: [],
    },
  ]);
  const [hasMinted, setHasMinted] = useRecoilState(hasAtom);
  const { connected, publicKey } = useWallet();
  const collectionFilter = "TERRITORY";
  useEffect(() => {
    const getInfo = async () => {
      if (publicKey) {
        const data = await Metaplex.make(
          new Connection(
            "https://sparkling-dark-shadow.solana-devnet.quiknode.pro/0e9964e4d70fe7f856e7d03bc7e41dc6a2b84452/"
          )
        )
          .nfts()
          .findAllByOwner(new PublicKey(publicKey.toBase58()))
          .then((value) => value);
        if (data) {
          data.map(async (nft) => {
            try {
              const meta = await axios.get(nft.uri);
              if (
                meta.data.image !== undefined &&
                meta.data.symbol === collectionFilter
              ) {
                console.log("RETURNED");

                setResult((result) => [
                  ...result,
                  {
                    image: meta.data.image,
                    animation: meta.data.animation_url
                      ? meta.data.animation_url
                      : "none",
                    description: meta.data.description,
                    name: meta.data.name,
                    attributes: meta.data.attributes,
                  },
                ]);
                /* setItems((items) => [
                ...items,
                {
                  image: meta.data.image,
                  animation: meta.data.animation_url
                    ? meta.data.animation_url
                    : "none",
                  description: meta.data.description,
                  name: meta.data.name,
                  attributes: meta.data.attributes,
                },
              ]);
              */
              }
            } catch (err) {
              console.log(err);
            }
          });
              setResult(result => result.slice(1));
        }
      }
    };
    getInfo();
  }, [connected]);

  useMemo(() => {
    if (connected && hasMinted) {
      const timer = setTimeout(() => {
        setResult([
          {
            image: "",
            animation: "",
            description: "",
            name: "",
            attributes: [],
          },
        ]);

        const getInfo = async () => {
          if (publicKey) {
            const data = await Metaplex.make(
              new Connection(
                "https://sparkling-dark-shadow.solana-devnet.quiknode.pro/0e9964e4d70fe7f856e7d03bc7e41dc6a2b84452/"
              )
            )
              .nfts()
              .findAllByOwner(new PublicKey(publicKey.toBase58()))
              .then((value) => value);
            if (data) {
              data.map(async (nft) => {
                try {
                  const meta = await axios.get(nft.uri);
                  if (
                    meta.data.image !== undefined &&
                    meta.data.symbol === collectionFilter
                  ) {
                    console.log("RETURNED");

                    setResult((result) => [
                      ...result,
                      {
                        image: meta.data.image,
                        animation: meta.data.animation_url
                          ? meta.data.animation_url
                          : "none",
                        description: meta.data.description,
                        name: meta.data.name,
                        attributes: meta.data.attributes,
                      },
                    ]);
                  }
                } catch (err) {
                  console.log(err);
                }
              });
              setResult(result => result.slice(1));
            }
          }
        };
        getInfo();
      }, 20000);
        setHasMinted(false);
      return () => clearTimeout(timer);
    }
  }, [hasMinted, connected]);

  return (
    <>
      <SteakContext.Provider value={{ result }}>
        {children}
      </SteakContext.Provider>
    </>
  );
};

export default UserProvider;

export const useUser = () => useContext(SteakContext);
