import { NextApiHandler } from "next";
import { query } from "../../../lib/db";
import { getSession } from "next-auth/client";

const handler = async (req, res) => {
  const session = await getSession({ req });

  if (session) {
    const { type } = req.query;
    try {
      const params = req.body;
      if (session.user.role == 1 || session.user.role == 2) {
        if (type == "user" && session.user.role == 1) {
          let result = await query(`delete from users WHERE id = ${params}`);
          res.json(result);
        } else if (type == "notice") {
          let result = await query(`DELETE from notices WHERE id = ${params}`);
          res.json(result);
        } else if (type == "event") {
          // console.log(params);
          let result = await query(`DELETE from events WHERE id = ${params}`);
          res.json(result);
        } else if (type == "innovation") {
          let result = await query(
            `delete from innovation WHERE id = ${params}`
          );
          res.json(result);
        } else if (type == "news") {
          let result = await query(`delete from news WHERE id = ${params}`);
          res.json(result);
        }
      } else if (type == "memberships") {
        let result = await query(
          `delete from memberships WHERE id = ${params}`
        );
        res.json(result);
      } else if (type == "image") {
        let result = await query(
          `delete from faculty_image WHERE email = "${params}"`
        );
        res.json(result);
      } else if (type == "current-responsibility") {
        let result = await query(
          `delete from curr_admin_responsibility WHERE id = ${params}`
        );
        res.json(result);
      } else if (type == "past-responsibility") {
        let result = await query(
          `delete from past_admin_responsibility WHERE id = ${params}`
        );
        res.json(result);
      } else if (type == "workexperience") {
        let result = await query(
          `delete from work_experience WHERE id = ${params}`
        );
        res.json(result);
      } else if (type == "subjects") {
        let result = await query(
          `delete from subjects_teaching WHERE id = ${params}`
        );
        res.json(result);
      } else if (type == "publications") {
        let result = await query(
          `delete from publications WHERE id = ${params}`
        );
        res.json(result);
      } else if (type == "project") {
        let result = await query(`delete from project WHERE id = ${params}`);
        res.json(result);
      } else if (type == "professionalservice") {
        let result = await query(
          `delete from Professional_Service WHERE id = ${params}`
        );
        res.json(result);
      } else if (type == "education") {
        let result = await query(`delete from education WHERE id = ${params}`);
        res.json(result);
      } else if (type == "phdcandidates") {
        let result = await query(
          `delete from phd_candidates WHERE id = ${params}`
        );
        res.json(result);
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
