import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";
import { query } from "../../../lib/db";

const handler = async (req, res) => {
  const session = await getSession({ req });
  // let session = true;
  
  if (session) {
    const { type } = req.query;
    try {
      let params = req.body;

      if (type == "notice") {
        params.attachments = JSON.stringify(params.attachments)
        let result = await query(
          `INSERT INTO notices (id,title,timestamp,openDate,closeDate,important,attachments,email,isVisible) VALUES ` +
          `('${params.id}','${params.title}','${params.timestamp}','${params.openDate}','${params.closeDate}','${params.important}','${params.attachments}','${params.email}','${params.isVisible}')`
         
        );
        res.json(result);
      } else if (type == "event") {
         params.attachments = JSON.stringify(params.attachments)
        let result = await query(
          `INSERT INTO events (id,title,timestamp,openDate,closeDate,venue,doclink,attachments,email) VALUES ` +
          `(${params.id},'${params.title}',${params.timestamp},${params.openDate},${params.closeDate},'${params.venue}','${params.doclink}','${params.attachments}','${params.email}')`
         
        );
        res.json(result)

      } else if (type == "innovation") {
         params.image = JSON.stringify(params.image)
        let result = await query(
          `INSERT INTO innovation (id,title,timestamp,openDate,closeDate,description,image,author,email) VALUES ` +
          `(${params.id},'${params.title}',${params.timestamp},${params.openDate},${params.closeDate},'${params.description}','${params.image}','${params.author}','${params.email}')`
        );
        res.json(result)
      
      } else if (type == "news") {
        params.image = JSON.stringify(params.image)
        let result = await query(
          `INSERT INTO news (id,title,timestamp,openDate,closeDate,description,image,author,email) VALUES ` +
          `(${params.id},'${params.title}',${params.timestamp},${params.openDate},${params.closeDate},'${params.description}','${params.image}','${params.author}','${params.email}')`
        );
        res.json(result)

      } else if (type == "user") {
        await query(
          `insert into users (id=${params.id},name,email,role,department,designation,ext_no,research_interest) values (
            ${params.id},${params.name},${params.email},${params.role},${params.department},${params.designation},${params.ext_no},${params.research_interest})`
        );
      } else if (type == "image") {
        await query(
          `insert into faculty_image (user_id,email,image) values (
            ${params.user_id},${params.email},${params.image})`
        );
      } else if (type == "current-responsibility") {
        await query(
          `insert into curr_admin_responsibility (id,user_id,email,curr_responsibility) values (
            ${params.id},${params.user_id},${params.email},${params.curr_responsibility},
          )`
        );
      } else if (type == "memberships") {
        await query(
          `insert into memberships (id,user_id,email,membership_id,membership_society) values (
            ${params.id},${params.user_id}, ${params.email},${params.membership_id},${params.membership_society},
        )`
        );
      } else if (type == "past-responsibility") {
        await query(
          `insert into past_admin_responsibility where (
		id=${params.id},
		user_id=${params.user_id},
		email=${params.email},
		past_responsibility=${params.past_responsibility},
		primary key (id))`
        );
      } else if (type == "workexperience") {
        await query(
          `insert into work_experience where (
		id=${params.id},
		user_id=${params.user_id},
		email=${params.email},
		work_experiences=${params.work_experiences},
		primary key (id))`
        );
      } else if (type == "subjects") {
        await query(
          `insert into subjects_teaching where (
		id=${params.id},
		user_id=${params.user_id},
		email=${params.email},
		subject=${params.subject},
		primary key (id)`
        );
      } else if (type == "publications") {
        await query(
          `insert into publications where (
		publication_id=${params.id},
		user_id=${params.user_id},
		email=${params.email},
		publication_id=${params.publication_id},
		publications=${params.publications},
		primary key (publication_id),
		unique key (email))`
        );
      } else if (type == "project") {
        await query(
          `insert into project where (
		id=${params.id},
		user_id=${params.user_id},
      email=${params.email},
      project=${params.project},
		primary key (id))`
        );
      } else if (type == "professionalservice") {
        await query(
          `insert into Professional_Service where (
		id=${params.id},
		user_id=${params.user_id},
		email=${params.email},
		services=${params.services},
		primary key (id)`
        );
      } else if (type == "education") {
        await query(
          `insert into education where (
                  id=${params.id},
                  user_id=${params.user_id},
                  email=${params.email},
                  institution=${params.institution},
                  certification=${params.certification},
                  passing_year=${params.passing_year},
                  primary key (id))`
        );
      } else if (type == "phdcandidates") {
        await query(
          `insert into phd_candidates where (
		id=${params.id},
		user_id=${params.user_id},
		email=${params.email},
		phd_student_name=${params.phd_student_name},
		thesis_topic=${params.thesis_topic},
		start_year=${params.start_year},
		completion_year=${params.completion_year},
		primary key (publication_id))`
        );
      } else {
        res.json({ message: "Could not find matching requests" });
      }
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  } else {
    res.status(403).json({ message: "You are not authorized" });
  }
};

export default handler;
