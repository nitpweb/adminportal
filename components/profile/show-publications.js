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
			{articles.length && (
				<div style={{ marginTop: `50px`, marginBottom: `50px` }}>
					<Articles articles={articles} />
				</div>
			)}
			{books.length && (
				<div style={{ marginTop: `50px`, marginBottom: `50px` }}>
					<Books books={books} />
				</div>
			)}
			{conferences.length && (
				<div style={{ marginTop: `50px`, marginBottom: `50px` }}>
					<Conferences conferences={conferences} />
				</div>
			)}
			{patents.length && (
				<div style={{ marginTop: `50px`, marginBottom: `50px` }}>
					<Patents patents={patents} />
				</div>
			)}
		</>
	);
};

const Articles = ({ articles }) => {
	const columns = [
		{ field: "id", headerName: "ID", width: 80 },

		{ field: "title", headerName: "Title", width: 300 },
		{ field: "authors", headerName: "Authors", width: 300 },
		{
			field: "journal_name",
			headerName: "Journal Name",
			sortable: false,
			width: 250,
		},
		{ field: "year", headerName: "Year", type: "number", width: 130 },
		{ field: "citation_key", headerName: "Citation Key", width: 150 },
	];

	const rows = articles;

	return (
		<>
			<h1>Articles</h1>
			<div
				style={{
					width: "95%",
				}}
			>
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
		{ field: "id", headerName: "ID", width: 80 },
		{ field: "title", headerName: "Title", width: 300 },
		{ field: "authors", headerName: "Authors", width: 300 },
		{
			field: "editors",
			headerName: "Editors",
			sortable: false,
			width: 200,
		},
		{
			field: "publisher",
			headerName: "Publisher",
			sortable: false,
			width: 200,
		},
		{ field: "year", headerName: "Year", type: "number", width: 130 },
		{ field: "citation_key", headerName: "Citation Key", width: 150 },
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

const Conferences = ({ conferences }) => {
	const columns = [
		{ field: "id", headerName: "ID", width: 80 },
		{ field: "title", headerName: "Title", width: 300 },
		{ field: "authors", headerName: "Authors", width: 300 },
		{
			field: "booktitle",
			headerName: "BookTitle",
			sortable: false,
			width: 250,
		},
		{ field: "year", headerName: "Year", type: "number", width: 130 },
		{ field: "citation_key", headerName: "Citation Key", width: 150 },
	];
	const rows = conferences;

	return (
		<>
			<h1>Conferences</h1>
			<div
				style={{
					width: "95%",
				}}
			>
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

const Patents = ({ patents }) => {
	const columns = [
		{ field: "id", headerName: "ID", width: 80 },
		{ field: "year", headerName: "Year", type: "number", width: 130 },
		{
			field: "yearfiled",
			headerName: "Year Filed",
			type: "number",
			width: 180,
		},
		{ field: "nationality", headerName: "Nationality", width: 200 },
		{ field: "number", headerName: "Number", width: 130 },
		{ field: "citation_key", headerName: "Citation Key", width: 150 },
	];
	const rows = patents;

	return (
		<>
			<h1>Patents</h1>
			<div
				style={{
					width: "95%",
				}}
			>
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
