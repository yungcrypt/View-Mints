import React, {useState} from "react";
import { atom, useRecoilState } from "recoil";
import { selectedAtom } from "./atoms";
import { Grid, Button } from "@material-ui/core";
import  Modal  from "@mui/material/Modal";
import Image from "next/image";
import VideoModal from "./videomodal";
import Zoom from "react-reveal/Zoom";
import { MetaResult, openAtom } from "./atoms";
export const SelectedBox = ({ children }) => {
  return (
    <>
      <div
        style={{
          backgroundColor: "none",
          height: "fit-content",
          padding: "70px",
          width:"80vw",
          maxWidth:"1000px",
          margin:"auto"
        }}
      >
        {children}
      </div>
    </>
  );
};
const SelectorScreen = (props) => {
  const [isOpen, setIsOpen] = useRecoilState(openAtom);
  const handleOpen = () => {
    if (isOpen === false) {
      setIsOpen(true);
    }
    if (isOpen === true) {
      setIsOpen(false);
    }
  };

  const [selection, setSelection] = useRecoilState<MetaResult>(selectedAtom);
  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{color:"white"}}
      >
        <SelectedBox>
          {selection.image !== "" && (
            <>
              <Zoom>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div
                    key={selection.image}
                    style={{ height: "300px", width: "300px" }}
                  >
                    <Image
                      src={selection.image}
                      key={selection.image}
                      alt="asd"
                      layout="responsive"
                      height="282px"
                      width="222px"
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      marginLeft: "45px",
                      color:"white !important"
                    }}
                  >
                    <div style={{color:"white !important", fontSize: "30px" }}>{selection.name}</div>
                    <div style={{ fontSize: "14px" }}>
                      {selection.description}
                    </div>
                    {selection.animation !== "none" && (
                      <>
                        <VideoModal video={selection.animation} />
                      </>
                    )}
                  </div>
                </div>
                <Grid
                  container
                  spacing={4}
                  style={{
                    paddingTop: "80px",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "40px",
                    marginBottom: "80px",
                  }}
                >
                  {selection.image !== "" &&
                    selection.attributes.map((nft) => {
                      return (
                        <>
                          <Grid item xs={4} style={{ textAlign: "center" }}>
                            <div style={{ fontSize: "12px", margin: "auto" }}>
                              {nft.trait_type}
                            </div>
                            <div style={{ fontSize: "16px" }}>{nft.value}</div>
                          </Grid>
                        </>
                      );
                    })}
                </Grid>
              </Zoom>
            </>
          )}
        </SelectedBox>
      </Modal>
    </>
  );
};

export default SelectorScreen;
