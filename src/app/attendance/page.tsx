import AttendeePage from "./AttendeePage";

interface PageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default function Attendance(props: PageProps){
    return <AttendeePage searchParams={props.searchParams}/>
}