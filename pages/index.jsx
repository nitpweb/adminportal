import Layout from "@/components/layout";
import Profilepage from "@/components/profile";
import { query } from "@/lib/db";
import { getSession, useSession } from "next-auth/client";
import { useEffect } from "react";
import styled from "styled-components";
import Loading from "../components/loading";
import Sign from "../components/signin";

const Home = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  .image {
    z-index: -1;
    position: absolute;
  }
  .card {
    display: flex;
    justify-content: center;
    text-align: center;
  }
  .title {
    font-size: 24px;
  }
`;

export default function Page({ result }) {
  const [session, loading] = useSession();
  
  if (typeof window !== 'undefined' && loading) return <Loading/>

  if (!session) {
    return (
      <Sign/>
    )
  }
  return (
    <Layout>
      <Profilepage details={result} />
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await getSession({ req });

  if (session) {
    var details = {};
    // console.log(session.user.email)
    let data = await query(
      `SELECT * FROM users WHERE email="${session.user.email}";`
    ).catch((e) => {
      console.log(e);
    });
    let profile = JSON.parse(JSON.stringify(data))[0];
    details["profile"] = profile;
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
    // console.log(profile.id);
    for (let i = 0; i < array.length; i++) {
      let element = array[i];
      let data = await query(
        `SELECT * FROM ${element} WHERE email="${session.user.email}";`
      ).catch((e) => {
        console.log(e);
      });
      let tmp = JSON.parse(JSON.stringify(data));
      // console.log(JSON.parse(JSON.stringify(tmp)));
      if (tmp[0] != undefined) {
        details[element] = tmp;
      }
    }
    // array.forEach(async(element) => {
    //   let data = await query(
    //     `SELECT * FROM ${element} WHERE email="${session.user.email}";`
    //   ).catch((e) => {
    //     console.log(e);
    //   });
    //   let tmp = JSON.parse(JSON.stringify(data))[0];
    //   console.log(tmp);
    //   details={...details,element:tmp};
    // });
    let result = JSON.parse(JSON.stringify(details));
    // console.log(result);
 
    return {
      props: { result }, // will be passed to the page component as props
    };
  } else {
    return {
      props: {}, // will be passed to the page component as props
    };
  }
}

