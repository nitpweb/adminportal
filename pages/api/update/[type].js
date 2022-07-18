import { NextApiHandler } from "next"
import { query } from "../../../lib/db"
import { getSession } from "next-auth/client"

const handler = async (req, res) => {
  const session = await getSession({ req })

  if (session) {
    const { type } = req.query
    try {
      const params = req.body

      if (
        session.user.role === 1 ||
        ((session.user.role === 2 ||
          session.user.role === 4 ||
          session.user.role === 5) &&
          session.user.email == params.email)
      ) {
        if (type == "notice") {
          params.attachments = JSON.stringify(params.attachments)
          params.main_attachment = JSON.stringify(params.main_attachment)
          let result = await query(
            `UPDATE notices SET title=?,timestamp=?,openDate=?,closeDate=?,important=?,` +
              `attachments=?,notice_link=?,isVisible=?,email=?,notice_type=? WHERE id=?`,
            [
              params.title,
              params.timestamp,
              params.openDate,
              params.closeDate,
              params.important,
              params.attachments,
              params.main_attachment,
              params.isVisible,
              params.email,
              params.notice_type,
              params.id,
            ]
          )
          return res.json(result)
        }
      }

      if (session.user.role === 1) {
        if (type == "event") {
          params.attachments = JSON.stringify(params.attachments)
          params.main_attachment = JSON.stringify(params.main_attachment)

          let result = await query(
            `UPDATE events SET title=?,timestamp=?,openDate=?,closeDate=?,venue=?,event_link=?,` +
              `doclink=?,attachments=?,email=? WHERE id=?`,
            [
              params.title,
              params.timestamp,
              params.openDate,
              params.closeDate,
              params.venue,
              params.main_attachment,
              params.doclink,
              params.attachments,
              params.email,
              params.id,
            ]
          )
          return res.json(result)
        } else if (type == "innovation") {
          params.image = JSON.stringify(params.image)
          let result = await query(
            `UPDATE innovation SET title=?,timestamp=?,openDate=?,closeDate=?,description=?` +
              `,image=?,author=?,email=? WHERE id=?`,
            [
              params.title,
              params.timestamp,
              params.openDate,
              params.closeDate,
              params.description,
              params.image,
              params.author,
              params.email,
              params.id,
            ]
          )
          return res.json(result)
        } else if (type == "news") {
          params.image = JSON.stringify(params.image)
          params.add_attach = JSON.stringify(params.add_attach)
          let result = await query(
            `UPDATE news SET title=?,timestamp=?,openDate=?,closeDate=?,description=?` +
              `,image=?,attachments=?,author=?,email=? WHERE id=?`,
            [
              params.title,
              params.timestamp,
              params.openDate,
              params.closeDate,
              params.description,
              params.image,
              params.add_attach,
              params.author,
              params.email,
              params.id,
            ]
          )
          return res.json(result)
        }
      }
      if (
        type == "user" &&
        (session.user.role == 1 || session.user.email == params.email)
      ) {
        let result = await query(
          `UPDATE users SET name=?,email=?,role=?,department=?,designation=?,ext_no=?,administration=?` +
            `,research_interest=? WHERE id=?`,
          [
            params.name,
            params.email,
            params.role,
            params.department,
            params.designation,
            params.ext_no,
            params.administration,
            params.research_interest,
            params.id,
          ]
        )
        return res.json(result)
      }
      if (session.user.email == params.email) {
        if (type == "image") {
          // let result = await query(
          //   `REPLACE INTO users (email,image) values (`+
          //     `'${params.email}','${params.image[0].url}')`
          // );
          let result = await query(
            `UPDATE users SET	image='${params.image[0].url}' WHERE email='${params.email}'`
          )
          return res.json(result)
        } else if (type == "workexperience") {
          let result = await query(
            `UPDATE work_experience SET work_experiences=?,institute=?,start=?,end=? WHERE email=? AND id=?`,
            [
              params.work_experiences,
              params.institute,
              params.start,
              params.end,
              params.email,
              params.id,
            ]
          ).catch((e) => {
            console.log(e)
          })
          return res.json(result)
        } else if (type == "current-responsibility") {
          let result = await query(
            `UPDATE curr_admin_responsibility SET curr_responsibility=?,start=? WHERE email=? AND id=?`,
            [params.curr_responsibility, params.start, params.email, params.id]
          )
          return res.json(result)
        } else if (type == "memberships") {
          let result = await query(
            `UPDATE memberships SET membership_id=?,membership_society=?,start=?,end=? WHERE email=? AND id=?`,
            [
              params.membership_id,
              params.membership_society,
              params.start,
              params.end,
              params.email,
              params.id,
            ]
          )
          return res.json(result)
        } else if (type == "past-responsibility") {
          let result = await query(
            `UPDATE past_admin_responsibility SET past_responsibility=?,start=?,end=? WHERE email=? AND id=?`,
            [
              params.past_responsibility,
              params.start,
              params.end,
              params.email,
              params.id,
            ]
          )
          return res.json(result)
        } else if (type == "subjects") {
          let result = await query(
            `UPDATE subjects_teaching SET code=?,name=?,start=?,end=? WHERE email=? AND id=?;`,
            [
              params.code,
              params.name,
              params.start,
              params.end,
              params.email,
              params.id,
            ]
          ).catch((e) => {
            console.log(e)
          })
          return res.json(result)
        } else if (type == "publications") {
          console.log(params.data)
          params.data = JSON.stringify(params.data)
          let result = await query(
            `UPDATE publications SET publications=? WHERE email=? AND publication_id=?`,
            [params.data, params.email, params.publication_id]
          ).catch((err) => console.log(err))
          // console.log(result)
          return res.json(result)
        } else if (type == "project") {
          let result = await query(
            `UPDATE project SET project=?,sponsor=?,amount=?,start=?,end=? WHERE email=? AND id=?`,
            [
              params.project,
              params.sponsor,
              params.amount,
              params.start,
              params.end,
              params.email,
              params.id,
            ]
          )
          return res.json(result)
        } else if (type == "professionalservice") {
          let result = await query(
            `UPDATE professional_service SET services=? WHERE email=? AND id=?`,
            [params.services, params.email, params.id]
          )
          return res.json(result)
        } else if (type == "education") {
          let result = await query(
            `UPDATE education SET certification=?,institution=?,passing_year=? WHERE email=? AND id=?`,
            [
              params.certification,
              params.institution,
              params.passing_year,
              params.email,
              params.id,
            ]
          )
          return res.json(result)
        } else if (type == "phdcandidates") {
          let result = await query(
            `UPDATE phd_candidates SET phd_student_name=?,thesis_topic=?,start_year=?,completion_year=? WHERE email=? AND id=?`,
            [
              params.phd_student_name,
              params.thesis_topic,
              params.start_year,
              params.completion_year,
              params.email,
              params.id,
            ]
          )
          return res.json(result)
        }
      } else {
        res.json({ message: "Could not find matching requests" })
      }
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  } else {
    res.status(403).json({ message: "You are not authorized" })
  }
}

export default handler

// 		await query(
// 			`update events set (
// title='${params.title}',
// timestamp='${params.timestamp}',
// openDate='${params.openDate}',
// closeDate='${params.closeDate}',
//   venue='${params.venue}',
//   doclink='${params.doclink}
// important='${params.important}',
// attachments='${params.attachments}',
// email='${params.email}',
// ) where id=${params.id}`,
// 		);

// await query(
// 	`update news where (
// 	id=${params.id},
// 	title='${params.title}',
// 	timestamp='${params.timestamp}',
// 	openDate='${params.openDate}',
// 	closeDate='${params.closeDate}',
//   description='${params.description}',
//   image='${params.image}',
//   author='${params.author}',
// 	important='${params.important}',
//   email='${params.email}',
//     ) where id=${params.id}`
// );
