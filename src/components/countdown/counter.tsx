import { useEffect } from "react";
import Container from "@mui/material/Container"
import {candyStateAtom} from "../../state/atoms"
import {useRecoilValue} from "recoil"
import Countdown  from "react-countdown"
export const CountDown = () => {
  const candy = useRecoilValue(candyStateAtom)

  return(<> 
    <div>
      {/* <Countdown date={Date.now() + 10000000} />*/}
    </div>
    </>
    )
}
