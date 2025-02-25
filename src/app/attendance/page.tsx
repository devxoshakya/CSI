import AttendeePage from "./AttendeePage";
import AttendanceScanner from "@/components/shared/Attendance/AttendanceScanner";
interface AttendancePageProps {
  searchParams: Promise<{ eventId?: string }>;
}

export default async function Attendance({ searchParams }: AttendancePageProps) {
  const { eventId } = await searchParams;
  // return <AttendeePage searchParams={{ eventId }} />;
  return <AttendanceScanner />;
}
