import { useEffect } from "react";
import Container from "@mui/material/Container"
import {candyStateAtom} from "../../state/atoms"
import {useRecoilValue} from "recoil"
import AnimatedNumber from "animated-number-react";
import Countdown  from "react-countdown"
export const Remain = () => {
  const candy = useRecoilValue(candyStateAtom)

  return(<> 
    <div style={{padding:"20px"}}>
    <div style={{fontSize:"20px", marginBottom:"10px"}}>
      {/* <Countdown date={Date.now() + 10000000} />*/}
      nfts remaining
    </div>
    <div style={{fontSize:"30px"}}>
      <AnimatedNumber value={candy.remain} formatValue={(value: number)=>value.toFixed(0)}/>
    </div>
      </div>
    </>
    )
}
