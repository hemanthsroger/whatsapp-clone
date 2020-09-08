import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import "./AddUserDialog.css";

const AddUserDialog = (props) => {
  const { onClose, open } = props;
  const [userEmail, setUserEmail] = useState("");

  const handleClose = () => {
    onClose(userEmail);
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="confirm-dialog">
      <div className="addUser">
        <DialogTitle id="confirm-dialog">
          Add User to this chat room
        </DialogTitle>
        <DialogContent>
          <div className="addUser_inputContainer">
            <input
              value={userEmail}
              onChange={(e) => {
                setUserEmail(e.target.value);
              }}
              type="email"
              placeholder="Enter the Gmail Id to be added"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <div className="addUser_button_container">
            <Button variant="contained" onClick={handleClose} color="default">
              Add User
            </Button>
          </div>
        </DialogActions>
      </div>
    </Dialog>
  );
};
export default AddUserDialog;
