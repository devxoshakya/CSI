"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UsersTab from "@/components/UsersTab"
import EventsTab from "@/components/EventsTab"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("users")

  return (
    <div className="mt-8 px-2 mx-auto max-w-7xl">
    <h1 className="py-4 font-semibold text-3xl mx-auto">CSI ADMIN DASHBOARD</h1>
    
    <Tabs defaultValue="users" className="max-w-7xl mx-auto" onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="users">Users</TabsTrigger>
        <TabsTrigger value="events">Events</TabsTrigger>
      </TabsList>
      <TabsContent value="users">
        <UsersTab />
      </TabsContent>
      <TabsContent value="events">
        <EventsTab />
      </TabsContent>
    </Tabs>
    </div>
  )
}

