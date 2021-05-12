import Layout from "@/components/layout";
import { useEntries } from "@/lib/swr-hook";
import LoadAnimation from "@/components/loading";
import styled from "styled-components";
import DataDisplay from "@/components/display-news";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

const Wrap = styled.div`
	width: 90%;
	margin: auto;
	margin-top: 60px;
`;

export default function Page() {
	const { entries, isLoading } = useEntries("/api/news/all");
	const [session,loading] = useSession();
	const router = useRouter();
	console.log(entries);
	return (
		<Layout>
			<Wrap>
				{session && (session.user.role === 1 || session.user.role === 2 ?
					(isLoading ? <LoadAnimation /> : <DataDisplay data={entries} />) : () => { router.push("/") })
				}
			</Wrap>
		</Layout>
	);
}
