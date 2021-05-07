import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { useSession } from "next-auth/client";
import React, { useState } from "react";

export const AddForm = ({ handleClose, modal }) => {
	const [session, loading] = useSession();
	const [content, setContent] = useState({
		institution: "", 
		certification: "",
		passing_year: "",
	});

	const [submitting, setSubmitting] = useState(false);

	const handleChange = (e) => {
		if (e.target.name == "important" || e.target.name == "isVisible") {
			setContent({ ...content, [e.target.name]: e.target.checked });
		} else {
			setContent({ ...content, [e.target.name]: e.target.value });
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitting(true);
		let open = new Date(content.openDate);
		let close = new Date(content.closeDate);
		open = open.getTime();
		close = close.getTime();
		let now = Date.now();

		let data = {
			...content,
			id: now,
			institution: content.institution, 
			certification: content.certification,
			passing_year: content.passing_year,
			user_id: session.user.id,
			email: session.user.email,
		};
		let result = await fetch("/api/create/education", {
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
						Add Education
					</DialogTitle>
					<DialogContent>
						<TextField
							margin="dense"
							id="institution"
							label="Institution"
							name="institution"
							type="text"
							required
							fullWidth
							placeholder="Institution"
							onChange={(e) => handleChange(e)}
							value={content.institution}
						/>
						<TextField
							margin="dense"
							id="certification"
							label="Certification"
							name="certification"
							type="text"
							required
							fullWidth
							placeholder="Certification"
							onChange={(e) => handleChange(e)}
							value={content.certification}
						/>
						<TextField
							margin="dense"
							id="passing_year"
							label="Passing year"
							name="passing_year"
							type="text"
							required
							fullWidth
							placeholder="Passing year"
							onChange={(e) => handleChange(e)}
							value={content.passing_year}
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
