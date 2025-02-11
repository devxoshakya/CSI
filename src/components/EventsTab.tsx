"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import EventDetails from "./EventDetails"
import { formatDate } from "@/lib/utils"

interface Event {
  _id: string
  eventId: string
  title: string
  date: string
}

export default function EventsTab() {
  const [eventsData, setEventsData] = useState<Event[]>([])
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events")
        if (!response.ok) throw new Error("Failed to fetch events")
        const data = await response.json()
        setEventsData(data)
      } catch (error) {
        console.error("Error fetching events:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvents()
  }, [])

  if (isLoading) return <div>Loading events...</div>

  return (
    <div>
      {selectedEvent ? (
        <EventDetails event={selectedEvent} onBack={() => setSelectedEvent(null)} />
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {eventsData.map((event) => (
                <TableRow key={event._id}>
                  <TableCell>{event.title}</TableCell>
                  <TableCell>{formatDate(event.date)}</TableCell>
                  <TableCell>
                    <Button onClick={() => setSelectedEvent(event)}>View Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

