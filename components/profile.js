import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { signIn, signout, useSession } from "next-auth/client";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { AddForm } from "./profile/subject";
import { AddSociety } from "./profile/society";
import { AddProf } from "./profile/prof_service";
import { AddEdu } from "./profile/education";
import { AddCurrent } from "./profile/curr_admin";
import { AddPast } from "./profile/past_admin";
import { AddWork } from "./profile/work";
import { Addproject } from "./profile/project";
import { Addphd } from "./profile/phd";
import { AddResearch } from "./profile/research";

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

export default function Profilepage(props) {
  const [detail, useDetail] = useState(JSON.parse(props.details));
  console.log(props.details);
  const [session, loading] = useSession();
  const [addModal, setAddModal] = useState(false);
  const addModalOpen = () => {
    setAddModal(true);
  };
  const handleCloseAddModal = () => {
    setAddModal(false);
  };

  const [addModal1, setAddModal1] = useState(false);
  const addModalOpen1 = () => {
    setAddModal1(true);
  };
  const handleCloseAddModal1 = () => {
    setAddModal1(false);
  };

  const [addModal2, setAddModal2] = useState(false);
  const addModalOpen2 = () => {
    setAddModal2(true);
  };
  const handleCloseAddModal2 = () => {
    setAddModal2(false);
  };

  const [addModal3, setAddModal3] = useState(false);
  const addModalOpen3 = () => {
    setAddModal3(true);
  };
  const handleCloseAddModal3 = () => {
    setAddModal3(false);
  };

  const [addModal4, setAddModal4] = useState(false);
  const addModalOpen4 = () => {
    setAddModal4(true);
  };
  const handleCloseAddModal4 = () => {
    setAddModal4(false);
  };

  const [addModal5, setAddModal5] = useState(false);
  const addModalOpen5 = () => {
    setAddModal5(true);
  };
  const handleCloseAddModal5 = () => {
    setAddModal5(false);
  };

  const [addModal6, setAddModal6] = useState(false);
  const addModalOpen6 = () => {
    setAddModal6(true);
  };
  const handleCloseAddModal6 = () => {
    setAddModal6(false);
  };

  const [addModal7, setAddModal7] = useState(false);
  const addModalOpen7 = () => {
    setAddModal7(true);
  };
  const handleCloseAddModal7 = () => {
    setAddModal7(false);
  };

  const [addModal8, setAddModal8] = useState(false);
  const addModalOpen8 = () => {
    setAddModal8(true);
  };
  const handleCloseAddModal8 = () => {
    setAddModal8(false);
  };

  const [addModal9, setAddModal9] = useState(false);
  const addModalOpen9 = () => {
    setAddModal9(true);
  };
  const handleCloseAddModal9 = () => {
    setAddModal9(false);
  };


  return (
    <>
      {session && (
        <Profile>
          <div className="faculty-img-row">
            <div className="faculty-img-wrap">
              <img src="/faculty.png" alt="faculty" />
              {/* <img
                src={`${process.env.GATSBY_API_URL}/profile/image?id=${detail.profile.id}`}
                className="facultypic"
              /> */}
            </div>
            <a href={`mailto:${detail.profile.email}`} target="blank">
              {/* <img src={mail} className="img-fluid facmail" /> */}
            </a>
            <h2>{detail.profile.name}</h2>
            <h3>{detail.profile.designation}</h3>
          </div>

          <div className="faculty-details-row">
            <h1>Profile</h1>
            <div
              className="fac-card"
              data-aos="fade-up"
              style={{ position: `relative` }}
            >
              <h3>Research Interest:-</h3>
              <p>{detail.profile.research_interest}</p>
              <h3>Email:-</h3>
              <p>{detail.profile.email}</p>
              <h3>Phone:-</h3>
              <p>{detail.profile.ext_no}</p>
              <Button
                color="primary"
                variant="contained"
                onClick={() => addModalOpen9()}
                style={{ position: `absolute`, top: `5px`, right: `5px` }}
              >
                Add
              </Button>
              <AddResearch handleClose={handleCloseAddModal9} modal={addModal9} />
            </div>

            <div
              className="fac-card"
              data-aos="fade-up"
              style={{ position: `relative` }}
            >
              <h3>Subjects</h3>
              <Button
                color="primary"
                variant="contained"
                onClick={() => addModalOpen()}
                style={{ position: `absolute`, top: `5px`, right: `5px` }}
              >
                Add
              </Button>
              <AddForm handleClose={handleCloseAddModal} modal={addModal} />

              {detail.subjects_teaching &&
                detail.subjects.map((item) => {
                  return (
                    <li>
                      {item}{" "}
                      <IconButton aria-label="delete" onClick={() => {}}>
                        <DeleteIcon />
                      </IconButton>
                    </li>
                  );
                })}
            </div>

            <div
              className="fac-card"
              data-aos="fade-up"
              style={{ position: `relative` }}
            >
              <h3>Memberships & Society</h3>
              <Button
                color="primary"
                variant="contained"
                onClick={() => addModalOpen1()}
                style={{ position: `absolute`, top: `5px`, right: `5px` }}
              >
                Add
              </Button>
              <AddSociety
                handleClose={handleCloseAddModal1}
                modal={addModal1}
              />
              <div className="factable">
                <table>
                  <tr>
                    <td>
                      <h4>Membership Id</h4>
                    </td>
                    <td>
                      <h4>Membership Society</h4>
                    </td>
                  </tr>
                  {detail.memberships &&
                    detail.memberships.map((item) => {
                      return (
                        <tr>
                          <td>
                            <li>{item.membership_id}</li>
                          </td>
                          <td>
                            <li>{item.membership_society}</li>
                          </td>
                          <IconButton aria-label="delete" onClick={() => {}}>
                            <DeleteIcon />
                          </IconButton>
                        </tr>
                      );
                    })}
                </table>
              </div>
            </div>

            <div
              className="fac-card"
              data-aos="fade-up"
              style={{ position: `relative` }}
            >
              <h3>Educational Qualification</h3>
              <Button
                color="primary"
                variant="contained"
                onClick={() => addModalOpen3()}
                style={{ position: `absolute`, top: `5px`, right: `5px` }}
              >
                Add
              </Button>
              <AddEdu handleClose={handleCloseAddModal3} modal={addModal3} />
              <div className="factable">
                <table>
                  <tr>
                    <td>
                      <h4>Certification</h4>
                    </td>
                    <td>
                      <h4>Institute Name</h4>
                    </td>
                    <td>
                      <h4>Passing Year</h4>
                    </td>
                  </tr>
                  {detail.education &&
                    detail.qualification.map((item) => {
                      return (
                        <tr>
                          <td>
                            <li>{item.certification}</li>
                          </td>
                          <td>
                            <li>{item.institution}</li>
                          </td>
                          <td>
                            <li>{item.passing_year}</li>
                          </td>
                          <IconButton aria-label="delete" onClick={() => {}}>
                            <DeleteIcon />
                          </IconButton>
                        </tr>
                      );
                    })}
                </table>
              </div>
            </div>

            <div
              className="fac-card"
              data-aos="fade-up"
              style={{ position: `relative` }}
            >
              <h3>Current Administrative Responsibility</h3>
              <Button
                color="primary"
                variant="contained"
                onClick={() => addModalOpen4()}
                style={{ position: `absolute`, top: `5px`, right: `5px` }}
              >
                Add
              </Button>
              <AddCurrent
                handleClose={handleCloseAddModal4}
                modal={addModal4}
              />
              {detail.curr_admin_responsibility &&
                detail.currResponsibility.map((item) => {
                  return (
                    <li>
                      {item}{" "}
                      <IconButton aria-label="delete" onClick={() => {}}>
                        <DeleteIcon />
                      </IconButton>
                    </li>
                  );
                })}
            </div>

            <div
              className="fac-card"
              data-aos="fade-up"
              style={{ position: `relative` }}
            >
              <h3>Past Administrative Responsibility</h3>
              <Button
                color="primary"
                variant="contained"
                onClick={() => addModalOpen5()}
                style={{ position: `absolute`, top: `5px`, right: `5px` }}
              >
                Add
              </Button>
              <AddPast handleClose={handleCloseAddModal5} modal={addModal5} />
              {detail.past_admin_reponsibility &&
                detail.pastreponsibility.map((item) => {
                  return (
                    <li>
                      {item}{" "}
                      <IconButton aria-label="delete" onClick={() => {}}>
                        <DeleteIcon />
                      </IconButton>
                    </li>
                  );
                })}
            </div>

            <div
              className="fac-card"
              data-aos="fade-up"
              style={{ position: `relative` }}
            >
              <h3>Work Experiences</h3>
              <Button
                color="primary"
                variant="contained"
                onClick={() => addModalOpen6()}
                style={{ position: `absolute`, top: `5px`, right: `5px` }}
              >
                Add
              </Button>
              <AddWork handleClose={handleCloseAddModal6} modal={addModal6} />
              {detail.work_experience &&
                detail.workExperience.map((item) => {
                  return (
                    <li>
                      {item}{" "}
                      <IconButton aria-label="delete" onClick={() => {}}>
                        <DeleteIcon />
                      </IconButton>
                    </li>
                  );
                })}
            </div>

            <div
              className="fac-card"
              data-aos="fade-up"
              style={{ position: `relative` }}
            >
              <h3>Professional Services</h3>
              <Button
                color="primary"
                variant="contained"
                onClick={() => addModalOpen2()}
                style={{ position: `absolute`, top: `5px`, right: `5px` }}
              >
                Add
              </Button>
              <AddProf handleClose={handleCloseAddModal2} modal={addModal2} />
              {detail.professional_service &&
                detail.services.map((item) => {
                  return (
                    <li>
                      {item}{" "}
                      <IconButton aria-label="delete" onClick={() => {}}>
                        <DeleteIcon />
                      </IconButton>
                    </li>
                  );
                })}
            </div>

            <div
              className="fac-card"
              data-aos="fade-up"
              style={{ position: `relative` }}
            >
              <h3>Projects</h3>
              <Button
                color="primary"
                variant="contained"
                onClick={() => addModalOpen7()}
                style={{ position: `absolute`, top: `5px`, right: `5px` }}
              >
                Add
              </Button>
              <Addproject
                handleClose={handleCloseAddModal7}
                modal={addModal7}
              />
              {detail.project &&
                detail.projects.map((item) => {
                  return (
                    <li>
                      {item}{" "}
                      <IconButton aria-label="delete" onClick={() => {}}>
                        <DeleteIcon />
                      </IconButton>
                    </li>
                  );
                })}
            </div>

            <div
              className="fac-card"
              data-aos="fade-up"
              style={{ position: `relative` }}
            >
              <h3>Phd Candidates</h3>
              <Button
                color="primary"
                variant="contained"
                onClick={() => addModalOpen8()}
                style={{ position: `absolute`, top: `5px`, right: `5px` }}
              >
                Add
              </Button>
              <Addphd handleClose={handleCloseAddModal8} modal={addModal8} />
              {detail.phd_candidates &&
                detail.phdCandidates.map((item) => {
                  return (
                    <li>
                      {item}{" "}
                      <IconButton aria-label="delete" onClick={() => {}}>
                        <DeleteIcon />
                      </IconButton>
                    </li>
                  );
                })}
            </div>
          </div>
        </Profile>
      )}
    </>
  );
}
