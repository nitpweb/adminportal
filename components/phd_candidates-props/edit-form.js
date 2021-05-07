import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { Delete, Link } from "@material-ui/icons";
import { useSession } from "next-auth/client";
import React, { useState } from "react";
import { ConfirmDelete } from "./confirm-delete";

export const EditForm = ({ data, handleClose, modal }) => {
	const [session, loading] = useSession();
	const [content, setContent] = useState({
		id: data.id,
		phd_student_name: data.phd_student_name, 
		thesis_topic: data.thesis_topic,
		start_year: data.start_year,
		completion_year: data.completion_year,
	});

	const [verifyDelete, setVerifyDelete] = useState(false);
	const handleDelete = () => {
		setVerifyDelete(false);
	};
	const handleChange = (e) => {
		if (e.target.name == "important" || e.target.name == "isVisible") {
			setContent({ ...content, [e.target.name]: e.target.checked });
		} else {
			setContent({ ...content, [e.target.name]: e.target.value });
		}
		// console.log(content);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitting(true);
		let open = new Date(content.openDate);
		let close = new Date(content.closeDate);
		open = open.getTime();
		close = close.getTime();
		let now = Date.now();

		let finaldata = {
			...content,
			id: now,
			phd_student_name: content.phd_student_name, 
			thesis_topic: content.thesis_topic,
			start_year: content.start_year,
			completion_year: content.completion_year,
			user_id: session.user.id,
			email: session.user.email,
		};

		console.log(finaldata);
		let result = await fetch("/api/update/phdcandidates", {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(finaldata),
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
					<DialogTitle
						disableTypography
						style={{ fontSize: `2rem`, position: "relative" }}
					>
						Edit PHD Candidates						<i
							style={{ position: `absolute`, right: `15px`, cursor: `pointer` }}
						>
							<Delete
								type="button"
								onClick={() => setVerifyDelete(true)}
								style={{ height: `2rem`, width: `auto` }}
								color="secondary"
							/>
						</i>
					</DialogTitle>
					<ConfirmDelete
						modal={verifyDelete}
						handleClose={handleDelete}
						id={content.id}
					/>
					<DialogContent>
					<TextField
							margin="dense"
							id="phd_student_name"
							label="Name"
							name="phd_student_name"
							type="text"
							required
							fullWidth
							placeholder="Name"
							onChange={(e) => handleChange(e)}
							value={content.phd_student_name}
						/>
						<TextField
							margin="dense"
							id="thesis_topic"
							label="Thesis Topic"
							name="thesis_topic"
							type="text"
							required
							fullWidth
							placeholder="Thesis Topic"
							onChange={(e) => handleChange(e)}
							value={content.thesis_topic}
						/>
						<TextField
							margin="dense"
							id="start_year"
							label="Start Year"
							name="start_year"
							type="text"
							required
							fullWidth
							placeholder="Start Year"
							onChange={(e) => handleChange(e)}
							value={content.start_year}
						/>
						<TextField
							margin="dense"
							id="completion_year"
							label="Completion Year"
							name="completion_year"
							type="text"
							required
							fullWidth
							placeholder="Completion Year"
							onChange={(e) => handleChange(e)}
							value={content.completion_year}
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
