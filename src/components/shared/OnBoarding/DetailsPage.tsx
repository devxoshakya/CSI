"use client";
import React, { useState } from "react";
// import { useRouter } from "next/router";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { startTransition } from "react";

export function SignupFormDemo({ data }: any) {
  const [email, setEmail] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [errorMessage, setErrorMessage] = useState<string|null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Get the current session to retrieve the token
    const session = await getSession();

    if (!session) {
      console.error("User is not authenticated.");
      return;
    }

    // Prepare the request body with user details
    const year = email.match(/\d{4}/)?.[0];
    console.log(year, email, rollNo);
    const userData = {
      name: data.split("-")[1],
      fname: data.split("-")[2],
      branch: data.split("-")[0],
      phone: data.split("-")[3],
      email: email,
      rollno: rollNo,
      year: year,
    };

    // Send data to the /api/on-boarding endpoint with authorization token
    try {
      // console.log(session);
      const response = await fetch("/api/on-boarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user?.email}`, // Send the email from session (assuming email is part of the session)
        },
        body: JSON.stringify(userData),
      });

      const responseData = await response.json();
      setErrorMessage(responseData.error || null);
      // console.log(session);
      console.log("API Response:", responseData);
      
      // Redirect to /events on successful submission
      if (responseData.message === "Onboarding completed successfully.") {
        startTransition(() => {
          router.push("/events");
        });
        console.log("abb hoja")
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  const [branch, name, fname, phone] = data.split("-");
  console.log(branch, name, fname, phone);

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to CSI MIET
      </h2>
      <p className="text-neutral-800 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Login to CSI MIET to get started with the events and activities.
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          Make sure to correctly fill in the details below to complete the
          registration.
        </span>
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="2300680100000"
            type="text"
            value={name}
            disabled
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="fname">Father's Name</Label>
          <Input
            id="fname"
            placeholder="2300680100000"
            type="text"
            value={fname}
            disabled
          />
        </LabelInputContainer>

        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="branch">Branch</Label>
            <Input
              id="branch"
              placeholder="Tyler"
              type="text"
              value={branch}
              disabled
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="phone">Contact Number</Label>
            <Input
              id="phone"
              placeholder="9876543210"
              type="text"
              value={phone}
              disabled
            />
          </LabelInputContainer>
        </div>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">
            College Email <span className="text-s text-red-500">*</span>
          </Label>
          <Input
            id="email"
            placeholder="someone.cse.2023@miet.ac.in"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Handle email input
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="rollNO">
            Roll Number <span className="text-s text-red-500">*</span>
          </Label>
          <Input
            id="rollNO"
            placeholder="2300680100000"
            type="number"
            required
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)} // Handle roll number input
          />
        </LabelInputContainer>
        {errorMessage && (
            <p className="text-red-500 text-sm mx-2">{errorMessage}</p>
            )}
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Submit
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
