import AttendeePage from "./AttendeePage";

interface PageProps {
  searchParams: {
    eventId?: string;
  };
}

export default function Attendance(props: PageProps){
    return <AttendeePage searchParams={props.searchParams}/>
}