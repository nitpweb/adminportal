import { Button, DialogContent, Dialog, DialogTitle } from "@material-ui/core";
import React, { useState } from "react";
import { getSession } from "next-auth/client";
import useRefreshData from "@/custom-hooks/refresh"


interface uploadResponse  {
	id:string;
	name:string;
	webViewLink:string;
}

export default  function PubPdf() {
	const [pubPdf, setPubPdf] = useState(null);
	const [modal, setModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const refreshData = useRefreshData(false)


	const handleChange = (e) => {
		setPubPdf(e.target.files[0]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
	const session = await getSession()

		setLoading(true);
		console.log(pubPdf);
		let file = new FormData();
		file.append("files", pubPdf);
	
		try {
			let res= await fetch("/api/gdrive/uploadfiles", { method: "POST", body: file });
			const fileData:uploadResponse  = (await res.json())[0];
			console.log(fileData);
			const webViewLink = fileData.webViewLink
			const data = {
				email:session.user.email,
				pdf:webViewLink
			}
			res = await fetch('/api/create/pub-pdf',{
				headers: {
				  Accept: "application/json",
				  "Content-Type": "application/json",
				},
				method: "POST",
				body: JSON.stringify(data),
			  })
			// window.location.reload();
			setLoading(false)
			setModal(false)
			refreshData()
		} catch (err) {
			console.log(err);
		}
	};
	const handleClose = () => {
		setModal(false);
	};

	return (
		<div >
			<Button
				variant="contained"
				color="primary"
				onClick={() => setModal(!modal)}
				style={{ marginTop: `1rem` }}
			>
				Upload Publications
			</Button>
			<Dialog open={modal} onClose={handleClose}>
				<DialogTitle id="alert-dialog-title">Upload Publication Pdf</DialogTitle>

				<DialogContent>
					<form onSubmit={handleSubmit}>
						<input
							name="pub-pdf"
							id="contained-button-file"
							onChange={handleChange}
							type="file"
                            accept=".pdf"
						/>

						<label>
							<Button
								variant="contained"
								color="primary"
								type="submit"
								disabled={loading}
							>
								Upload PDF
							</Button>
						</label>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
}
