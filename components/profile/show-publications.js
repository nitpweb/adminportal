import React, { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";

const ShowPublications = ({ publications }) => {
	const [articles, setArticles] = useState([]);
	const [books, setBooks] = useState([]);
	const [conferences, setConferences] = useState([]);
	const [patents, setPatents] = useState([]);

	const columns = [
		{ field: "id", headerName: "ID", flex: 0.4 },
		{ field: "type", headerName: "Type" },
		{ field: "title", headerName: "Title", flex: 1 },
		{ field: "authors", headerName: "Authors", flex: 1 },
		{
			field: "journal_name",
			headerName: "Journal Name",
			sortable: false,
		},
		{ field: "year", headerName: "Year", type: "number" },
		{ field: "citation_key", headerName: "Citation Key" },
	];
	const rows = publications
		.filter((entry) => entry.type == "article")
		.map((entry, idx) => {
			entry.id = idx;
			return entry;
		});

	console.log(rows);
	return (
		<>
			<div
				style={{
					height: 400,
					width: "95%",
					marginTop: `50px`,
					marginBottom: `50px`,
				}}
			>
				<DataGrid
					rows={rows}
					columns={columns}
					checkboxSelection
					disableSelectionOnClick
				/>
			</div>
		</>
	);
};

export default ShowPublications;

{
	/* <table>
	{publications.map((item) => {
		return (
			<li>
				{item.title}{" "}
				<IconButton aria-label="delete" onClick={() => addModalOpen10d()}>
					<DeleteIcon />
				</IconButton>
				<ConfirmDelete
					handleClose={handleCloseAddModal10d}
					modal={addModal10d}
					id={item.id}
					del={"publications"}
				/>
			</li>
		);
	})}
</table>; */
}
