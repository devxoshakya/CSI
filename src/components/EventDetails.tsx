"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CSVLink } from "react-csv";
import Image from "next/image";
import { formatDate } from "@/lib/utils";

interface Event {
  _id: string;
  eventId: string;
  title: string;
  date: string;
}

interface Participant {
  _id: string;
  name: string;
  rollNo: string;
  branch: string;
  email: string;
  image?: string;
  registrationDate?: string;
  checkInTime?: string;
  attendanceTime?: string;
}

interface EventDetailsProps {
  event: Event;
  onBack: () => void;
}

export default function EventDetails({ event, onBack }: EventDetailsProps) {
  const [view, setView] = useState<"registrations" | "checkIns" | "attendance">(
    "registrations"
  );
  const [participants, setParticipants] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchParticipants = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/${view}?eventId=${event.eventId}`);
        if (!response.ok) throw new Error(`Failed to fetch ${view}`);
        const data = await response.json();
        console.log(data);
        if (view === "registrations") {
          setParticipants(data.registrations);
        } else if (view ==="attendance"){
            setParticipants(data.attendanceRecords);
        }else{
            setParticipants(data.registrations)
        }
      } catch (error) {
        console.error(`Error fetching ${view}:`, error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchParticipants();
  }, [event.eventId, view]);

  const renderTable = () => {
    if (isLoading) return <div>Loading...</div>;

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Roll No</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Branch</TableHead>
            <TableHead>Timestamp</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {participants.map((participant: any) => (
            <TableRow key={participant._id}>
              <TableCell>{participant.name}</TableCell>
              <TableCell>{participant.rollNo}</TableCell>
              <TableCell>{participant.email}</TableCell>
              <TableCell>{participant.branch}</TableCell>
              <TableCell>
                {formatDate(
                  participant.registrationDate ||
                    participant.checkInTime ||
                    participant.attendanceTime ||
                    ""
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  const csvData = [
    ["Name", "Roll No", "Email", "Branch", "Timestamp"],
    ...participants.map((p: any) => [
      p.name,
      p.rollNo,
      p.email,
      p.branch,
      formatDate(p.registrationDate || p.checkInTime || p.attendanceTime || ""),
    ]),
  ];

return (
    <div className="p-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <h2 className="text-2xl font-bold mb-2 md:mb-0">{event.title}</h2>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <div className="flex items-center mb-2 md:mb-0">
                <Select value={view} onValueChange={(value: any) => setView(value)}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Select view" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="registrations">Registrations</SelectItem>
                        <SelectItem value="check-in">Check-ins</SelectItem>
                        <SelectItem value="attendance">Attendance</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex items-center space-x-2">
                <Button onClick={onBack}>Back to Events</Button>
                <CSVLink data={csvData} filename={`${event.title}_${view}.csv`}>
                    <Button>Export to CSV</Button>
                </CSVLink>
            </div>
        </div>
        <div className="rounded-md border overflow-x-auto">{renderTable()}</div>
    </div>
);
}
