import { EditFaculty } from "@/components/faculty-management-props/editfaculty";
import { Button, Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Edit } from "@material-ui/icons";
import React, { useState } from "react";
import { AddFaculty } from "@/components/faculty-management-props/addfaculty";

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		"&:nth-of-type(odd)": {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

const useStyles = makeStyles({
	table: {
		minWidth: 700,
	},
});

export const FacultyTable = ({ entries }) => {
	const classes = useStyles();
	const roles = [null, "Admin", "HOD", "Faculty"];

	const [addModal, setAddModal] = useState(false);
	const addModalOpen = () => {
		setAddModal(true);
	};
	const handleCloseAddModal = () => {
		setAddModal(false);
	};

	return (
		<>
			<div>
				<header style={{ display: `flex`, justifyContent: `space-between` }}>
					<Typography variant="h3" style={{ margin: "15px 0" }}>
						Faculty Details
					</Typography>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
						}}
					>
						<Button variant="contained" color="primary" onClick={addModalOpen}>
							ADD +
						</Button>
					</div>
				</header>

				<AddFaculty handleClose={handleCloseAddModal} modal={addModal} />
			</div>

			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell>Name</StyledTableCell>
							<StyledTableCell align="right">Email</StyledTableCell>
							<StyledTableCell align="right">Designation</StyledTableCell>
							<StyledTableCell align="right">Department</StyledTableCell>
							<StyledTableCell align="right">Role</StyledTableCell>
							<StyledTableCell align="right">Ext no.</StyledTableCell>
							<StyledTableCell align="right">Modify</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{entries.map((row) => {
							const [editModal, setEditModal] = useState(false);

							const editModalOpen = () => {
								setEditModal(true);
							};

							const handleCloseEditModal = () => {
								setEditModal(false);
							};

							return (
								<React.Fragment key={row.id}>
									<StyledTableRow>
										<StyledTableCell component="th" scope="row">
											{row.name}
										</StyledTableCell>
										<StyledTableCell align="right">{row.email}</StyledTableCell>
										<StyledTableCell align="right">
											{row.designation}
										</StyledTableCell>
										<StyledTableCell align="right">
											{row.department}
										</StyledTableCell>
										<StyledTableCell align="right">
											{roles[row.role]}
										</StyledTableCell>
										<StyledTableCell align="right">
											{row.ext_no}
										</StyledTableCell>
										<StyledTableCell
											align="right"
											onClick={editModalOpen}
											style={{ cursor: `pointer` }}
										>
											<Edit /> <span>Edit</span>
										</StyledTableCell>
									</StyledTableRow>
									<EditFaculty
										data={row}
										handleClose={handleCloseEditModal}
										modal={editModal}
									/>
								</React.Fragment>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};
