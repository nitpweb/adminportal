import { NextApiHandler } from "next";
import { query } from "../../../lib/db";

const handler = async (req, res) => {
  const { type } = req.query;
  if (type == "all") {
    let results = await query(`select * from users; `);
    let array = JSON.parse(JSON.stringify(results));
    // console.log(array);
    return res.json(array);
  }
  try {
    const fdept = {
      arch: "Architecture",
      che: "Chemistry",
      ce: "Civil Engineering",
      cse: "Computer Science and Engineering",
      ee: "Electrical Engineering",
      ece: "Electronics and Communication Engineering",
      hss: "Humanities & Social Sciences",
      maths: "Mathematics",
      me: "Mechanical Engineering",
      phy: "Physics",
    };
    let results;

    if (type in fdept) {
      results = await query(
        `
      select * from users where department=?`,
        [fdept[type]]
      );
    } else {
      results = {};
      let data = await query(`SELECT * FROM users WHERE email=?`, [String(type)]).catch(
        (e) => {
          console.log(e);
        }
      );
      let profile = JSON.parse(JSON.stringify(data))[0];
      results["profile"] = profile;
      let array = [
        "curr_admin_responsibility",
        "education",
        "memberships",
        "past_admin_responsibility",
        "phd_candidates",
        "professional_service",
        "project",
        "publications",
        "subjects_teaching",
        "work_experience",
      ];
      for (let i = 0; i < array.length; i++) {
        let element = array[i];
        let data = await query(`SELECT * FROM ${element} WHERE email=?`, [
          String(type),
        ]).catch((e) => {
          console.log(e);
        });
        let tmp = JSON.parse(JSON.stringify(data));
        // console.log(JSON.parse(JSON.stringify(tmp)));
        if (tmp[0] != undefined) {
          results[element] = tmp;
        }
      }
    }
    let array = JSON.parse(JSON.stringify(results));
    // console.log(array);
    return res.status(200).json(array);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
