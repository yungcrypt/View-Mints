import { useEffect } from "react";
import Container from "@mui/material/Container"
import {candyStateAtom} from "../../state/atoms"
import {useRecoilValue} from "recoil"
import Countdown  from "react-countdown"
export const Price = () => {
  const candy = useRecoilValue(candyStateAtom)

  return(
    <div style={{padding:"20px"}}>
    <div style={{fontSize:"20px", marginBottom:"10px"}}>
      {/* <Countdown date={Date.now() + 10000000} />*/}
      Mint Price
    </div>
    <div style={{fontSize:"30px"}}>
      {candy.price}
    </div>
    </div>
    )
}
