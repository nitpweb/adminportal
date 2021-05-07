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
import { AddForm } from "./membership-props/add-form";
import { EditForm } from "./membership-props/edit-form";

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
const Profile = styled.div`
  font-family: "Source Sans Pro";
  margin-top: 10vw;
  display: flex;
  justify-content: space-evenly;
  .faculty-img-row {
    margin-top: 5vh;
    justify-content: center;
    text-align: center;
    .facmail {
      position: absolute;
      margin-top: -70px;
      margin-left: 60px;
    }
    h3 {
      color: #4e4e4e;
    }
    font-family: "Source Sans Pro";
    .faculty-img-wrap {
      overflow: hidden;
      width: 250px;
      height: 250px;
      min-width: 250px;
      border-radius: 50%;

      img {
        width: 100%;
        height: auto;
        align-self: center;
      }
    }
  }
  .faculty-details-row {
    width: 80%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    #dir {
      line-height: 1.5;
      letter-spacing: 1px;
      padding-right: 3vw;
      padding-top: 50px;
    }
    .fac-card {
      width: 90%;
      margin-top: 3vh;
      margin-bottom: 3vh;
      background: #ffffff;
      box-shadow: 0px 0px 18px rgba(156, 156, 156, 0.38);
      border-radius: 5px;
      padding-left: 5%;
      padding-bottom: 15px;
      font-family: "Source Sans Pro";
      list-style: disc;
      h3 {
        color: #2f2f2f;
      }
      .factable {
        overflow: hidden;
        max-width: 90%;
        overflow-x: scroll;
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      .factable:-webkit-scrollbar {
        width: 0px;
        background: transparent;
      }
      table {
        min-width: 90%;
        width: 90%;
      }
    }
  }
`;
const MembershipDisplay = (props) => {
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
					Memberships
				</Typography>
				<Button variant="contained" color="primary" onClick={addModalOpen}>
					ADD +
				</Button>
			</header>

			<AddForm handleClose={handleCloseAddModal} modal={addModal} />

			<Grid container spacing={3} className={classes.root}>
            <div className="faculty-details-row">
            <div className="fac-card" data-aos="fade-up">
            <div className="factable">
            <table>
                  <tr>
                    <td>
                      <h4>Membership</h4>
                    </td>
                    <td>
                      <h4>Membership Society</h4>
                    </td>
                    <td></td>
                        
                  </tr>
				{details.memberships && details.memberships.map((detail) => {
					const [editModal, setEditModal] = useState(false);

					const editModalOpen = () => {
						setEditModal(true);
					};

					const handleCloseEditModal = () => {
						setEditModal(false);
					};

					return (
						<React.Fragment key={detail.id}>
                            <tr>
                                <td>{detail.membership_id}</td>
                                <td>{detail.membership_society}</td>
                                <td><Paper
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
								/></td>
                            </tr>
							
						</React.Fragment>
					);
				})}
                </table>
                </div>
                </div>
                </div>
			</Grid>
		</div>
	);
};

export default MembershipDisplay;
