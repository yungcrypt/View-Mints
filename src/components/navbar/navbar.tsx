import * as React from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import styled from "styled-components";
import Theme from "../../utils/theme/theme";
import Image from "next/image";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import { Grid } from "@mui/material";

const TopBar = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100vw;
`;

export const Navbar = () => {
  return (
    <TopBar id="topbar">
      <Grid container sx={{ width: "100vw", justifyContent:"center" }}>

        <Grid
          item
          style={{
            display: "flex",
            justifyContent: "center",
            
            width:"100vw",
            paddingRight: "1%",
          }}
        >
          <WalletMultiButton />
        </Grid>
      </Grid>
    </TopBar>
  );
};
export default Navbar;
