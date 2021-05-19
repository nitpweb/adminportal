import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Delete } from "@material-ui/icons";

export const AddAttachments = ({ attachments, setAttachments, limit }) => {
	// const [attachments, setAttachments] = useState([{ value: "", file: "" }]);

	function handleChange(i, event) {
		const values = [...attachments];
		values[i].caption = event.target.value;
		setAttachments(values);
	}
	function handleChangeFile(i, event) {
		const values = [...attachments];
		values[i].url = event.target.files[0];
		values[i].value = event.target.value;
		// console.log(event);
		setAttachments(values);
	}

	function handleAdd() {
		const values = [...attachments];
		values.push({ caption: "", url: "", value: "" });
		setAttachments(values);
	}

	function handleRemove(i) {
		const values = [...attachments];
		values.splice(i, 1);
		setAttachments(values);
	}

	return (
		<div style={{ marginTop: `8px` }}>
			<Button
				variant="contained"
				color="primary"
				type="button"
				onClick={() => handleAdd()}
				disabled={limit ? (attachments.length < limit ? false : true) : false}
			>
				+ Add Attachments
			</Button>
			{attachments.map((attachment, idx) => {
				return (
					<React.Fragment key={`${attachment}-${idx}`}>
						<TextField
							placeholder="SubTitle"
							fullWidth
							name="caption"
							value={attachment.caption}
							onChange={(e) => handleChange(idx, e)}
							style={{ margin: `8px` }}
						/>

						<TextField
							type="file"
							name="url"
							value={attachment.value}
							style={{ margin: `8px` }}
							onChange={(e) => {
								handleChangeFile(idx, e);
							}}
						/>

						<Button
							type="button"
							onClick={() => {
								handleRemove(idx);
							}}
							style={{ display: `inline-block`, fontSize: `1.5rem` }}
						>
							<Delete color="secondary" />{" "}
						</Button>
					</React.Fragment>
				);
			})}
			{/* <button type="button" onClick={() => console.log(attachments)}>
				Status
			</button> */}
		</div>
	);
};

export const handleNewAttachments = async (new_attach) => {
	for (let i = 0; i < new_attach.length; i++) {
		delete new_attach[i].value;

		console.log(new_attach[i]);

		if (new_attach[i].url) {
			let file = new FormData();
			file.append("files", new_attach[i].url);
			// console.log(file.get("files"));
			let viewLink = await fetch("/api/gdrive/uploadfiles", {
				method: "POST",
				body: file,
			});
			viewLink = await viewLink.json();
			// console.log("Client side link");
			// console.log(viewLink);
			new_attach[i].url = viewLink[0].webViewLink;
		} else {
			console.log("Request Not Sent");
		}
	}
	return new_attach;
};
