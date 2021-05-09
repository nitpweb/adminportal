import Layout from "@/components/layout";
import styled from "styled-components";
import { FacultyTable } from "@/components/faculty-table";
import { useEntries } from '@/lib/swr-hook'
import LoadAnimation from "@/components/loading";

const Wrap = styled.div`
	width: 90%;
	margin: auto;
	margin-top: 60px;
`;

export default function Page() {
	const { entries, isLoading } = useEntries('/api/faculty/all');

	// console.log(entries);
	return (
		<Layout>
			<Wrap>
				{isLoading ?
					(<LoadAnimation />) :
					(<FacultyTable entries={entries} />)}

			</Wrap>
		</Layout>
	);
}
