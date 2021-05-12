import Layout from "@/components/layout";
import styled from "styled-components";
import DataDisplay from "@/components/display-innovation";
import { useEntries } from '@/lib/swr-hook'
import LoadAnimation from "@/components/loading";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

const Wrap = styled.div`
	width: 90%;
	margin: auto;
	margin-top: 60px;
`;

export default function Page() {
	const { entries, isLoading } = useEntries('/api/innovation/all');
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
