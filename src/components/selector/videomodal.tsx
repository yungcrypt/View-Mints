import { useState } from "react";
import {
  Modal,
  Typography,
  Button,
  Box,
  Container,
  Grid,
  ImageList,
  ImageListItem,
} from "@material-ui/core";
import { Player } from "video-react";
import "node_modules/video-react/dist/video-react.css"
const VideoModal = ({ video }) => {
  console.log(video);
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    if (isOpen === false) {
      setIsOpen(true);
    }
    if (isOpen === true) {
      setIsOpen(false);
    }
  };
  return (
    <>
      <Button
        variant={"outlined"}
        onClick={() => handleOpen()}
        style={{
          fontSize: "12px",
          border: "1px solid white",
          color: "white",
          width: "50px",
          marginTop: "20px",
        }}
      >
        video
      </Button>
      {
        //@ts-ignore
        <Modal
          open={isOpen}
          onClose={handleOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div
            className="video"
            style={{
              position: "relative",
              paddingBottom: "56.25%" /* 16:9 */,
              paddingTop: 25,
              height: 0,
            }}
          >
          <div
            style={{
              margin: "auto",
              marginTop: "5%",
              width: "60%",
              maxWidth: "1000px",
            }}
          >
      <Button
        variant={"text"}
        onClick={() => handleOpen()}
        style={{
          fontSize: "12px",
          border: "1px solid white",
          color: "white",
          width: "50px",
          marginTop: "20px",
        }}
      >
        close
      </Button>
            <Player style={{ width: "50%", maxWidth: "1000px" }}>
              <source src={video} style={{ maxWidth: "1000px" }} />
            </Player>
          </div>
          </div>
        </Modal>
      }
    </>
  );
};
export default VideoModal;
