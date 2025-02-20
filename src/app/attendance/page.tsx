import AttendeePage from "./AttendeePage";

export default function Attendance({
    searchParams,
  }: {
    searchParams: { eventId?: string };
  }){
    return <AttendeePage searchParams={searchParams}/>
}