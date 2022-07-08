import { useEffect, useState, useCallback, useMemo } from "react";
import { Metaplex } from "@metaplex-foundation/js-next";
import axios from "axios";
import { atom, useRecoilState } from "recoil";
import Image from "next/image";
import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import { Container, Button, Grid } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Connection } from "@solana/web3.js";
import { selectedAtom, mintedAtom, hasAtom, openAtom } from "../components/selector/atoms";
import Zoom from "react-reveal/Zoom"
import TransitionGroup from "react-transition-group/TransitionGroup"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      overflow: "hidden",
      backgroundColor: "rgb(0,0,0,0)",
      height: "250px",
      width: "90vw",
      background: "none",
      margin: "auto",
    },
    imageList: {
      flexWrap: "nowrap",
      transform: "translateZ(0)",
      width: "90vw",
      background: "none",
      backgroundColor: "rgb(0,0,0,0)",
      height: "250px",
      overflowY: "hidden",
      overflowX: "auto",
    },
    title: {},
    titleBar: {
      margin: 0,
      padding: 0,
    },
  })
);
const nftsGet = async (props: PublicKey) => {
  if (props) {
    return await Metaplex.make(
      new Connection(
        "https://sparkling-dark-shadow.solana-devnet.quiknode.pro/0e9964e4d70fe7f856e7d03bc7e41dc6a2b84452/"
      )
    )
      .nfts()
      .findAllByOwner(new PublicKey(props.toBase58()))
      .then((value) => value);
  }
};
const ShowContainer = ({ children }) => {
  const { connected, publicKey } = useWallet();
  const classes = useStyles();
  return (
    <>
      {connected &&
      <Button>refresh</Button>
      }
      <div style={{ margin: "auto" }}>
          {children}
      </div>
    </>
  );
};

export const Show = () => {
  const [selection, setSelection] = useRecoilState(selectedAtom);
  const [isOpen, setIsOpen] = useRecoilState(openAtom);
  const [minted, setMinted] = useRecoilState(mintedAtom);
  const [hasMinted, setHasMinted] = useRecoilState(hasAtom);
  const [key, setKey] = useState<PublicKey>();
  const { connected, publicKey } = useWallet();
  console.log(publicKey);
  const connection = new Connection("https://api.devnet.solana.com");
  const [items, setItems] = useState([]);
  console.log(items);
  const imagesGet = async (pubkey: PublicKey) => {
    setItems([]);
    if (key !== null) {
      const data = await nftsGet(pubkey).then((value) => value);
      if (data) {
        data.map(async (nft) => {
          try {
            const meta = await axios.get(nft.uri);
            console.log(meta);
            if (
              meta.data.image !== undefined &&
              meta.data.symbol === "TERRITORY"
            ) {
              setItems((items) => [
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
            }
          } catch (err) {
            console.log(err);
          }
        });
        setHasMinted(false)
        return;
      }
    }
  };
  useEffect(() => {
    if (connected) {
      setKey(publicKey);
      setItems([])
      imagesGet(publicKey);
    }
  }, [connected]);
  useEffect(() => {
    if (connected && hasMinted) {
      const timer = setTimeout(() => {
      setKey(publicKey);
      imagesGet(publicKey);
              }, 20000);
                return () => clearTimeout(timer);

    }
  }, [hasMinted]);

  const classes = useStyles();


  return (
    <>
      {connected &&
      <Button onClick={()=>imagesGet(publicKey)}>refresh</Button>
      }
      <Grid container spacing={2}
        sx={{maxWidth:"1000px"}}
        >
          {items.length &&
            items.map((nft: any, i: number) => {
              return (
                <>
                    <Grid item 
                      key={i + "li"}
                      style={{ margin: "15px", background: "none" }}
                    >
                  <Zoom key={nft.image+"zoom"}>
                      <div
                        key={nft.image}
                        style={{ height: "200px", width: "152px" }}
              >
                        <Image
                          src={nft.image}
                          key={nft.image}
                          alt="asd"
                          layout="responsive"
                          height="281px"
                          width="222px"

                        />
                      <Button
                        variant="text"
                        style={{
                          color: "white",
                          position: "absolute",
                        }}
                        onClick={() => {
                          setSelection(nft);
                          setIsOpen(true)
                          console.log(selection);
                        }}
                      >
                        VIEW
                      </Button>
                      </div>
    </Zoom>
                    </Grid>
                </>
              );
            })}
        </Grid>
    </>
  );
};
