import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { signIn, signout, useSession } from "next-auth/client";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SubjectDisplay from "@/components/display-subjects";
import MembershipDisplay from "@/components/display-memberships";
import EducationDisplay from "@/components/display-education";
import PastResponsibilityDisplay from "@/components/display-pastresponsibilty";
import CurrResponsibilityDisplay from "@/components/display-curresponsibilty";
import WorkExperiencedisplay from "@/components/display-workexperience";
import ServicesDisplay from "@/components/display-professionalservice";
import Projectdisplay from "@/components/display-project";
import CandidateDisplay from "@/components/display-phdcandidate";
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
  const [submitting, setSubmitting] = useState(false);
  const [content, setContent] = useState({
		id: detail.profile.id,
		name: detail.profile.name,
		email: detail.profile.email,
		role: detail.profile.role,
		department:detail.profile.department,
		designation: detail.profile.designation,
    ext_no:detail.profile.ext_no,
    research_interest:detail.profile.research_interest,
	});
  const handleChange = (e) => {
		if (e.target.name == "important" || e.target.name == "isVisible") {
			setContent({ ...content, [e.target.name]: e.target.checked });
		} else {
			setContent({ ...content, [e.target.name]: e.target.value });
		}
		// console.log(content);
	};
  const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		let finaldata = {
			...content,

      id: content.id,
      name: content.name,
      email: content.email,
      role: content.role,
      department:content.department,
      designation: content.designation,
      ext_no:content.ext_no,
      research_interest:content.research_interest,
		};

		console.log(finaldata);
		let result = await fetch("/api/update/user", {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(finaldata),
		});
		result = await result.json();
		if (result instanceof Error) {
			console.log("Error Occured");
			console.log(result);
		}
    setSubmitting(true);
    setdisable(!disabled);
		console.log(result);
	};
  const [disabled, setdisable]= useState(true);
  function handledisable(){
    setdisable(!disabled);
  }
  return (
    <>
      {session && (
        <div>
        <Profile>
          <div className="faculty-details-row">
            <h1>Profile</h1>
            <div className="fac-card" data-aos="fade-up">
              
            <TextField
							margin="dense"
							id="name"
							label="Name"
							name="name"
							type="text"
							required
							fullWidth
              disabled={disabled}
							placeholder="name"
							onChange={(e) => handleChange(e)}
							value={content.name}
						/>
             <TextField
							margin="dense"
							id="designation"
							label="Designation"
							name="designation"
							type="text"
							required
							fullWidth
              disabled={disabled}
							placeholder="designation"
							onChange={(e) => handleChange(e)}
							value={content.designation}
						/>
              <TextField
							margin="dense"
							id="research_interest"
							label="Research interest"
							name="research_interest"
							type="text"
							required
							fullWidth
              disabled={disabled}
							placeholder="research_interest"
							onChange={(e) => handleChange(e)}
							value={content.research_interest}
						/>
                <TextField
							margin="dense"
							id="email"
							label="Email"
							name="email"
							type="text"
							required
							fullWidth
              disabled={disabled}
							placeholder="email"
							onChange={(e) => handleChange(e)}
							value={content.email}
						/>
                 <TextField
							margin="dense"
							id="ext_no"
							label="Ext_no"
							name="ext_no"
							type="text"
							required
							fullWidth
              disabled={disabled}
							placeholder="ext_no"
							onChange={(e) => handleChange(e)}
							value={content.ext_no}
						/>
            {disabled ? (
							<Button color="primary" onClick={handledisable}>
								Edit
							</Button>
						) : (
              
                <Button type="submit" color="primary" onClick={handleSubmit}>
                 {submitting ? "Submitting": "Submit"} 
                </Button>
            
						)}
              
            </div>

            <SubjectDisplay data={detail} />
            <br></br>
            <MembershipDisplay data={detail} />
            <br></br>
            <EducationDisplay data={detail} />
            <br/>
            <CurrResponsibilityDisplay data={detail} />
            <br/>
            <PastResponsibilityDisplay data={detail} />
            <br/>
            <WorkExperiencedisplay data={detail} />
            <br/>
            <ServicesDisplay data={detail} />
            <br/>
            <Projectdisplay  data={detail} />
            <br/>
            <CandidateDisplay data={detail} />
            <br/>
            
          </div>
         
        </Profile>
        
        </div>
      )}
    </>
  );
}
