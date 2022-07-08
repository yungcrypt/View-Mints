import { FC } from "react";
import * as anc from "@project-serum/anchor";
import Mint from "../containers/Mint";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { Navbar } from "../components/navbar/navbar";
import { useWallet } from "@solana/wallet-adapter-react";
import SelectorScreen from "src/components/selector/showcase";
import { Show } from "../fetch/fetchNfts";
import { SelectorBox } from "src/components/selector/container";
import {atom, useRecoilState} from "recoil"
import {selectedAtom} from "../components/selector/atoms"
import {WalletMultiButton} from "@solana/wallet-adapter-material-ui"
import {CountDown} from "../components/countdown/counter"
import {Remain} from "../components/remain/Remain"
import {Price} from "../components/price/Price"

export const MintPage: FC = () => {
  const [selection, setSelection] = useRecoilState(selectedAtom)
  const { publicKey, connected } = useWallet();
  const network = "devnet" as WalletAdapterNetwork;
  const rpcHost = "https://api.devnet.solana.com";
  const connection = new anc.web3.Connection(
    rpcHost ? rpcHost : anc.web3.clusterApiUrl("mainnet-beta")
  );

  return (
    <>
      <Navbar/>
      <div className="App-header">
      {publicKey && (
          <Mint
            candyMachineId={
              new anc.web3.PublicKey(
                "D5BDMoZy2dQiS445w79XieWScjuvtXcmXATc83JmQqNq"
              )
            }
            connection={connection}
            rpcHost={rpcHost}
            network={network}
          />
      )}
        <div style={{
            display:"flex",
            textAlign:"center"

          }}>
        { connected && 
          <Remain />
          }
          </div>
        { connected && 
          <SelectorBox>
            <Show />
            <SelectorScreen/>
          </SelectorBox>
        }
        </div>
    </>
  );
};

export default MintPage;
