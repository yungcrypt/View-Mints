import { useEffect, useState, useCallback, useMemo } from "react";
import { Metaplex } from "@metaplex-foundation/js-next";
import axios from "axios";
import { atom, useRecoilState } from "recoil";
import Image from "next/image";
import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import { Container, Button, Grid } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Connection } from "@solana/web3.js";
import {
  selectedAtom,
  mintedAtom,
  hasAtom,
  openAtom,
} from "../components/selector/atoms";
import Zoom from "react-reveal/Zoom";
import { useUser } from "src/context/UserContext";
import { MetaResult } from "../components/selector/atoms";
import zIndex from "@material-ui/core/styles/zIndex";
export const Show = () => {
  const [selection, setSelection] = useRecoilState(selectedAtom);
  const [isOpen, setIsOpen] = useRecoilState(openAtom);
  const [hasMinted, setHasMinted] = useRecoilState(hasAtom);
  const [display, setDisplay] = useState<boolean>(false);
  const { connected, publicKey } = useWallet();
  console.log(publicKey);
  const [items, setItems] = useState<MetaResult[]>([]);
  const getItems = useUser();
  console.log(getItems);

  useMemo(() => {
    if (connected) {
      console.log(getItems);

      setItems(getItems.result);
      setDisplay(true);
    }
  }, [connected, getItems]);

  return (
    <>
      {connected && (
        <Button onClick={() => console.log("refresh")}>refresh</Button>
      )}
      <div 
        style={{
          overflow:"hidden" ,
          height:"50vh", 
          margin: "auto",
          border: "8px solid rgb(30,30,30)",
          backgroundColor:"rgb(20,20,20)",
          borderRadius: "1.2em"
        }}
      >
      <div style={{overflow:"scroll" ,height:"52vh", margin: "auto"}}>
        <Grid container spacing={2} sx={{ maxWidth: "1000px", padding:"40px", justifyContent:"center" }}>
        {display &&
          items.length > 0 &&
          items[0].image !== "" &&
          items.map((nft: any, i: number) => {
            return (
              <>
                <Grid
                  item
                  key={i + "li"}
                  style={{ margin: "15px", background: "none" }}
                >
                  <Zoom key={nft.image + "zoom"}>
                    <div key={i+"wrapp"}>
                      <Button
                        variant="text"
                        key={nft.image+"button"}
                        style={{
                          color: "white",
                          position:"relative",
                          transform:"translateY(40px)",
                          zIndex:"999"
                        }}
                        onClick={() => {
                          setSelection(nft);
                          setIsOpen(true);
                          console.log(selection);
                        }}
                      >
                        VIEW
                      </Button>
                    <div
                      key={nft.image}
                      style={{ 
                        height: "200px", 
                        width: "152px", 
                        boxShadow: "3px 3px 3px 0px black" ,
                        backgroundColor:"black",
                        
                        
                      }}
                    >
                      <Image
                        src={nft.image}
                        key={nft.image}
                        alt="asd"
                        layout="responsive"
                        height="281px"
                        width="222px"
                        style={{

                        }}
                      />
                    </div>
                      </div>
                  </Zoom>
                </Grid>
              </>
            );
          })}
      </Grid>
        </div>
        </div>
    </>
  );
};
