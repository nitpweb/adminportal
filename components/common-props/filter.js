import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const Filter = ({ type, setEntries }) => {
	const [open, setOpen] = React.useState(false);
	const [range, setRange] = useState({ start_date: "", end_date: "" });

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleChange = (e) => {
		setRange({ ...range, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(range);
		console.log(new Date(range.start_date).getTime());
		console.log(new Date(range.end_date).getTime());
		let data = {
			start_date: new Date(range.start_date).getTime(),
			end_date: new Date(range.end_date).getTime(),
		};

		let entries = await fetch(`/api/${type}/range`, {
			method: "post",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify(data),
		});
		entries = await entries.json();

		// console.log(entries);
		setEntries(entries);
		setOpen(false);
	};

	return (
		<div style={{ display: "inline", padding: `1rem` }}>
			<Button variant="outlined" color="primary" onClick={handleClickOpen}>
				Filter
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">Filter</DialogTitle>
				<form onSubmit={handleSubmit}>
					{" "}
					<DialogContent>
						<DialogContentText>Filter entries using date</DialogContentText>
						<TextField
							margin="dense"
							id="start_date"
							name="start_date"
							label="Starting date/Open Date"
							value={range.start_date}
							onChange={handleChange}
							type="date"
							InputLabelProps={{
								shrink: true,
							}}
							fullWidth
						/>
						<TextField
							margin="dense"
							id="end_date"
							name="end_date"
							label="End Date/Close Date"
							onChange={handleChange}
							value={range.end_date}
							InputLabelProps={{
								shrink: true,
							}}
							type="date"
							fullWidth
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							Cancel
						</Button>
						<Button type="submit" color="primary">
							Submit
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	);
};

export default Filter;
