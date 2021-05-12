import Layout from "@/components/layout";
import styled from "styled-components";
import { FacultyTable } from "@/components/faculty-table";
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
	const { entries, isLoading } = useEntries('/api/faculty/all');
	const [session,loading] = useSession();
	const router = useRouter();
	// console.log(entries);
	return (
		<Layout>
			<Wrap>
				{session && (session.user.role === 1 ?
					(isLoading ? <LoadAnimation /> : <FacultyTable entries={entries} />) : () => { router.push("/") })
				}
			</Wrap>
		</Layout>
	);
}
