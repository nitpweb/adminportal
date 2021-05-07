import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import {
	Edit,
} from "@material-ui/icons";
import styled from "styled-components";
import React, { useState } from "react";
import { AddForm } from "./past_admin_responsibility-props/add-form";
import { EditForm } from "./past_admin_responsibility-props/edit-form";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		margin: `${theme.spacing(1)} auto`,
		padding: theme.spacing(2),
		lineHeight: 1.5,
	},
	truncate: {
		display: `block`,
		overflow: "hidden",
		textOverflow: "ellipsis",
		whiteSpace: `nowrap`,
	},
}));

const PastResponsibilityDisplay = (props) => {
	const classes = useStyles();
	const [details, setDetails] = useState(props.data);

	const [addModal, setAddModal] = useState(false);
	const addModalOpen = () => {
		setAddModal(true);
	};
	const handleCloseAddModal = () => {
		setAddModal(false);
	};

	return (
		<div>
			<header>
				<Typography variant="h4" style={{ margin: `15px 0` }}>
					Past Responsibilities
				</Typography>
				<Button variant="contained" color="primary" onClick={addModalOpen}>
					ADD +
				</Button>
			</header>

			<AddForm handleClose={handleCloseAddModal} modal={addModal} />

			<Grid container spacing={3} className={classes.root}>
				{details.past_admin_responsibility && details.past_responsibility.map((detail) => {
					const [editModal, setEditModal] = useState(false);

					const editModalOpen = () => {
						setEditModal(true);
					};

					const handleCloseEditModal = () => {
						setEditModal(false);
					};

					return (
						<React.Fragment key={detail.id}>
							<Grid item xs={12} sm={10} lg={11}>
								<Paper
									className={classes.paper}
									style={{ minHeight: `50px`, position: `relative` }}
								>
									<span className={classes.truncate}>{detail.past_responsibility}</span>
								</Paper>
							</Grid>
							<Grid item xs={4} sm={2} lg={1}>
								<Paper
									className={classes.paper}
									style={{ textAlign: `center`, cursor: `pointer` }}
									onClick={editModalOpen}
								>
									<Edit className={classes.icon} /> <span>Edit</span>
								</Paper>{" "}
								<EditForm
									data={detail}
									modal={editModal}
									handleClose={handleCloseEditModal}
								/>
							</Grid>
						</React.Fragment>
					);
				})}
			</Grid>
		</div>
	);
};

export default PastResponsibilityDisplay;
