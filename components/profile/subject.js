import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { useSession } from "next-auth/client";
import React, { useState } from "react";
import { AddAttachments } from "./../common-props/add-attachment";

export const AddForm = ({ handleClose, modal }) => {
  const [session, loading] = useSession();
  const [content, setContent] = useState({
    subject_teaching: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setContent({ ...content, [e.target.name]: e.target.value });
    //console.log(content)
  };

  const handleSubmit = async (e) => {
    setSubmitting(true);
    e.preventDefault();
    let data = {
      ...content,
      id: Date.now(),
      email: session.user.email,
    };
    // data.attachments = JSON.stringify(data.attachments);

    let result = await fetch("/api/create/subjects", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
    result = await result.json();
    if (result instanceof Error) {
      console.log("Error Occured");
      console.log(result);
    }
    console.log(result);
    window.location.reload();
  };

  return (
    <>
      <Dialog open={modal} onClose={handleClose}>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <DialogTitle disableTypography style={{ fontSize: `2rem` }}>
            Add Subjects
          </DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              id="label"
              label="Subjects"
              name="subject_teaching"
              type="text"
              required
              fullWidth
              onChange={(e) => handleChange(e)}
              value={content.subject_teaching}
            />
          </DialogContent>
          <DialogActions>
            {submitting ? (
              <Button type="submit" color="primary" disabled>
                Submitting
              </Button>
            ) : (
              <Button type="submit" color="primary">
                Submit
              </Button>
            )}
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
