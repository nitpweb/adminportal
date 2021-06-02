import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { useSession } from "next-auth/client";
import React, { useState } from "react";
import { AddAttachments } from "./../common-props/add-attachment";

export const AddWork = ({ handleClose, modal }) => {
  const [session, loading] = useSession();
  const [content, setContent] = useState({
    work_experiences: "",
    institute:"",
    start:"",
    end:"",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setContent({ ...content, [e.target.name]: e.target.value });
    //console.log(content)
  };

  const handleSubmit = async (e) => {
    setSubmitting(true);
    e.preventDefault();

    let start = new Date(content.start);
		let end = new Date(content.end);
		start = start.getTime();
		end = end.getTime();

    let data = {
      ...content,
      start:start,
      end:end,
      id: Date.now(),
      email: session.user.email,
    };
    // data.attachments = JSON.stringify(data.attachments);

    let result = await fetch("/api/create/workexperience", {
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
            Add Work Experience
          </DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              id="label"
              label="Designation"
              name="work_experiences"
              type="text"
              required
              fullWidth
              onChange={(e) => handleChange(e)}
              value={content.work_experiences}
            />
            <TextField
              margin="dense"
              id="label"
              label="Institute/Company"
              name="institute"
              type="text"
              required
              fullWidth
              onChange={(e) => handleChange(e)}
              value={content.institute}
            />
             <TextField
              margin="dense"
              id="workStart"
              label="Start Date"
              name="start"
              type="date"
              required
              fullWidth
              onChange={(e) => handleChange(e)}
              value={content.start}
              InputLabelProps={{
								shrink: true,
							}}
            />
            <TextField
              margin="dense"
              id="workEnd"
              label="End Date"
              name="end"
              type="date"
              required
              fullWidth
              onChange={(e) => handleChange(e)}
              value={content.end}
              InputLabelProps={{
								shrink: true,
							}}
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
