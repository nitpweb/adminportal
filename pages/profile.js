import React from "react"

class profile extends React.Component {
  constructor(props) {
    super(props)
    console.log(this.props.url)
    this.state = {
      profile: [],
      subjects: [],
      memberships: [],
      qualification: [],
      currResponsibility: [],
      pastreponsibility: [],
      books: [],
      journals: [],
      conferences: [],
      projects: [],
      services: [],
      workExperience: [],
      phdCandidates: [],
    }
  }
  render() {
    return (
      <>
        <div className="facultypage row">
          <div className="faculty-img-row">
            <div className="faculty-img-wrap">
              <img
                className="facultypic"
              />
            </div>
            <h2>{this.state.profile.email}</h2>
            <h2>{this.state.profile.name}</h2>
            <h3>{this.state.profile.designation}</h3>
          </div>

          <div className="faculty-details-row">
            <h1>Profile</h1>
            <div className="fac-card" >
              <h3>Research Interest:-</h3>
              <p>{this.state.profile.research_interest}</p>
              <h3>Email:-</h3>
              <p>{this.state.profile.email}</p>
              <h3>Phone:-</h3>
              <p>{this.state.profile.ext_no}</p>
            </div>
            {this.state.subjects.length != 0 ? (
              <div className="fac-card" >
                <h3>Subjects</h3>
                {this.state.subjects.map(item => {
                  return <li>{item}</li>
                })}
              </div>
            ) : null}
            {this.state.memberships.length != 0 ? (
              <div className="fac-card" >
                <h3>Memberships & Society</h3>
                <div className="factable">
                  <table>
                    <tr>
                      <td>
                        <h4>Membership</h4>
                      </td>
                      <td>
                        <h4>Membership Society</h4>
                      </td>
                    </tr>
                    {this.state.memberships.map(item => {
                      return (
                        <tr>
                          <td>
                            <li>{item.membership_id}</li>
                          </td>
                          <td>
                            <li>{item.membership_society}</li>
                          </td>
                        </tr>
                      )
                    })}
                  </table>
                </div>
              </div>
            ) : null}
            {this.state.qualification.length != 0 ? (
              <div className="fac-card">
                <h3>Educational Qualification</h3>
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
                    {this.state.qualification.map(item => {
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
                        </tr>
                      )
                    })}
                  </table>
                </div>
              </div>
            ) : null}
            {this.state.currResponsibility.length != 0 ? (
              <div className="fac-card">
                <h3>Current Administrative Responsibility</h3>
                {this.state.currResponsibility.map(item => {
                  return <li>{item}</li>
                })}
              </div>
            ) : null}
            {this.state.pastreponsibility.length != 0 ? (
              <div className="fac-card" >
                <h3>Past Administrative Responsibility</h3>
                {this.state.pastreponsibility.map(item => {
                  return <li>{item}</li>
                })}
              </div>
            ) : null}
            {this.state.workExperience.length != 0 ? (
              <div className="fac-card" >
                <h3>Work Experiences</h3>
                {this.state.workExperience.map(item => {
                  return <li>{item}</li>
                })}
              </div>
            ) : null}
            {this.state.services.length != 0 ? (
              <div className="fac-card" >
                <h3>Professional Services</h3>
                {this.state.services.map(item => {
                  return <li>{item}</li>
                })}
              </div>
            ) : null}
            {this.state.projects.length != 0 ? (
              <div className="fac-card">
                <h3>Projects</h3>
                {this.state.projects.map(item => {
                  return <li>{item}</li>
                })}
              </div>
            ) : null}
            {this.state.phdCandidates.length != 0 ? (
              <div className="fac-card" >
                <h3>Phd Candidates</h3>
                {this.state.phdCandidates.map(item => {
                  return <li>{item}</li>
                })}
              </div>
            ) : null}
          </div>
        </div>
      </>
    )
  }
}

export default profile