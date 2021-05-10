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
        let result = await query(
          `REPLACE INTO users (name,email,role,department,designation,ext_no,research_interest) values (`+
            `'${params.name}','${params.email}','${params.role}','${params.department}','${params.designation}','${params.ext_no}','${params.research_interest}')`
        );
        res.json(result)
      } else if (type == "image") {
        await query(
          `insert into faculty_image (email,image) values (`+
            `'${params.email}',${params.image})`
        );
      } else if (type == "current-responsibility") {
        await query(
          `INSERT INTO curr_admin_responsibility (id,email,curr_responsibility) VALUES` + `(${params.id},'${params.email}','${params.curr_responsibility}')`
        );
      } else if (type == "memberships") {
        await query(
          `insert into memberships (id,email,membership_id,membership_society) values (`+
            `${params.id},'${params.email}','${params.membership_id}','${params.membership_society}')`
        );
      } else if (type == "past-responsibility") {
        await query(
          `INSERT INTO past_admin_responsibility (id,email,past_responsibility) VALUES` + `(${params.id},'${params.email}','${params.past_responsibility}')`
        );
      } else if (type == "workexperience") {
        await query(
          `INSERT INTO work_experience (id,email,work_experiences) VALUES` + `(${params.id},'${params.email}','${params.work_experiences}')`
        );
      } else if (type == "subjects") {
        let result=await query(
      `INSERT INTO subjects_teaching (id,email,subject) VALUES` + `(${params.id},'${params.email}','${params.subject}')`
        ).catch((e) => {
          console.log(e);
        });
        res.json(result);
      } else if (type == "publications") {
        await query(
          `INSERT INTO publications (id,email,publications) VALUES` + `(${params.id},'${params.email}','${params.publications}')`
        );
      } else if (type == "project") {
        await query(
          `INSERT INTO project (id,email,project) VALUES` + `(${params.id},'${params.email}','${params.project}')`
        );
      } else if (type == "professionalservice") {
        await query(
          `INSERT INTO professional_service (id,email,services) VALUES` + `(${params.id},'${params.email}','${params.services}')`
        );
      } else if (type == "education") {
        await query(
          `INSERT INTO education (id,email,certification,institution,passing_year) VALUES` + `(${params.id},'${params.email}','${params.certification}','${params.institution}','${params.passing_year}')`
        );
      } else if (type == "phdcandidates") {
        await query(
          `INSERT INTO phd_candidates (id,email,phd_student_name,thesis_topic,start_year,completion_year) VALUES` + `(${params.id},'${params.email}','${params.phd_student_name}','${params.thesis_topic}','${params.start_year}','${params.completion_year}')`
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
