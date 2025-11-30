import {  Modal, Box, Typography, Button } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { useEffect } from "react";

const MyModal = (props) => {

    useEffect(() => {
        if (props.open && props.type !== "warning") {
            const timer = setTimeout(() => {
                props.onClose();
            }, 3000);
            return () => {
                clearTimeout(timer);
            }
        }

    }, [props.open, props.onClose])

  return (
    <>
      
      <Modal
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box className="my-modal-box">
          <Typography id="modal-title" variant="h6" component="h2" sx={{fontWeight: "bold", fontSize: "20px"}}>
            Thông báo
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            {props.message}
          </Typography>
          {
            props.type === "success" && <CheckCircleIcon className="icon-success"/> 
          }
          {
            props.type === "error" &&  <ErrorIcon className="icon-error"/> 
          }
          {
            props.type === "warning" && <button onClick={props.onClose} className="modal-btn">Ok</button>
          }

        </Box>
      </Modal>
    </>
  );
};

export default MyModal;
