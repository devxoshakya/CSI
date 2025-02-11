"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { CSVLink } from "react-csv"
import Image from "next/image"

interface User {
  _id: string
  name: string
  email: string
  image: string
  rollNo: string
  branch: string
  year: number
}

export default function UsersTab() {
  const [usersData, setUsersData] = useState<any>([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/user")
        console.log(response);
        if (!response.ok) throw new Error("Failed to fetch users")
        const data = await response.json()
        console.log(data.users, "hellooo");
        setUsersData(data.users)
      } catch (error) {
        console.error("Error fetching users:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const csvData = [
    ["Name", "Roll No", "Email", "Branch", "Year"],
    ...usersData.map((user:any) => [user.name, user.rollNo, user.email, user.branch, user.year]),
  ]

  if (isLoading) return <div>Loading users...</div>

  return (
    <div>
      <div className="mb-4">
        <CSVLink data={csvData} filename={"users.csv"}>
          <Button>Export to CSV</Button>
        </CSVLink>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Roll No</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead>Year</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>

            {usersData.map((user:any) => (
              <TableRow key={user._id}>
                <TableCell>
                  <Image
                    src={user.image || "/placeholder-user.jpg"}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.rollNo}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.branch}</TableCell>
                <TableCell>{user.year}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

