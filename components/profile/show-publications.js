import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";

const ShowPublications = ({ publications }) => {
	const [articles, setArticles] = useState([]);
	const [books, setBooks] = useState([]);
	const [conferences, setConferences] = useState([]);
	const [patents, setPatents] = useState([]);

	useEffect(() => {
		let _articles = [],
			_books = [],
			_conferences = [],
			_patents = [];

		publications.forEach((entry, idx) => {
			entry.id = idx;
			if (entry.type == "article") _articles.push(entry);
			else if (entry.type == "book") _books.push(entry);
			else if (entry.type == "conference") _conferences.push(entry);
			else if (entry.type == "patent") _patents.push(entry);
		});

		setArticles(_articles);
		setConferences(_conferences);
		setBooks(_books);
		setPatents(_patents);
	}, [publications]);

	return (
		<>
			<div style={{ marginTop: `50px`, marginBottom: `50px` }}>
				{articles.length && <Articles articles={articles} />}
			</div>
			<div style={{ marginTop: `50px`, marginBottom: `50px` }}>
				{books.length && <Books books={books} />}
			</div>
		</>
	);
};

const Articles = ({ articles }) => {
	const columns = [
		{ field: "id", headerName: "ID", flex: 0.4 },

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
	const rows = articles;

	let style = {
		width: "95%",
	};

	return (
		<>
			<h1>Articles</h1>
			<div style={style}>
				<DataGrid
					rows={rows}
					columns={columns}
					pageSize={5}
					pagination
					autoHeight
					rowsPerPageOptions={false}
					checkboxSelection
					disableSelectionOnClick
				/>
			</div>
		</>
	);
};

const Books = ({ books }) => {
	const columns = [
		{ field: "id", headerName: "ID", flex: 0.4 },
		{ field: "title", headerName: "Title", flex: 1 },
		{ field: "authors", headerName: "Authors", flex: 1 },
		{
			field: "editors",
			headerName: "Editors",
			sortable: false,
		},
		{
			field: "publisher",
			headerName: "Publisher",
			sortable: false,
		},
		{ field: "year", headerName: "Year", type: "number" },
		{ field: "citation_key", headerName: "Citation Key" },
	];
	const rows = books;

	return (
		<>
			<div
				style={{
					width: "95%",
				}}
			>
				<h1>Books</h1>
				<DataGrid
					rows={rows}
					columns={columns}
					pageSize={5}
					pagination
					autoHeight
					rowsPerPageOptions={false}
					checkboxSelection
					disableSelectionOnClick
				/>
			</div>
		</>
	);
};

export default ShowPublications;
