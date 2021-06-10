import Layout from "../components/layout";
import styled from "styled-components";
import DataDisplay from "@/components/display-notices";
import { useEntries } from '@/lib/swr-hook'
import LoadAnimation from "@/components/loading";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import Loading from "../components/loading";
import Sign from "../components/signin";
import Unauthorise from "../components/unauthorise";

const Wrap = styled.div`
	width: 90%;
	margin: auto;
	margin-top: 60px;
`;

export default function Page() {
	const { entries, isLoading } = useEntries('/api/notice/whole');
	const [session, loading] = useSession();
	const router = useRouter();

	if (typeof window !== 'undefined' && loading) return <Loading/>



	if (session && (session.user.role === 1 || session.user.role === 2 ||session.user.role === 4 || session.user.role === 5 )) {
		return (
			<Layout>
				<Wrap>
					{isLoading ? <LoadAnimation /> : <DataDisplay data={entries} />}
				</Wrap>
			</Layout>
		);
	}
	if (session && session.user.role === 3) {
		return <Unauthorise />
	}
	return <Sign />
}

