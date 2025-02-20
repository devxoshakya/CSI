import AttendeePage from "./AttendeePage";
interface AttendancePageProps {
  searchParams: Promise<{ eventId?: string }>;
}

export default async function Attendance({ searchParams }: AttendancePageProps) {
  const { eventId } = await searchParams;
  return <AttendeePage searchParams={{ eventId }} />;
}
