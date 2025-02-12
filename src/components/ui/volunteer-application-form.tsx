"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import SuccessPage from "../success-page";
import { useSession } from "next-auth/react";

const domains = [
  "Graphics",
  "Visuals",
  "Event",
  "PR and Outreach",
  "Content",
  "Social Media",
  "Web Development",
  "Technical",
];

export default function VolunteerApplicationForm() {
  const { data: session } = useSession();
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    experience: "",
    skills: "",
    otherSocieties: "",
    availability: "flexible",
    portfolio: "",
    aboutYou: "",
    socials: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>("Make sure all entires are correct before submitting.");

  useEffect(() => {
    const submitted = localStorage.getItem("formSubmitted");
    if (submitted) {
      setIsSubmitted(true);
    }
  }, []);

  const handleDomainChange = (domain: string) => {
    setSelectedDomains((prev) => {
      if (prev.includes(domain)) {
        return prev.filter((d) => d !== domain);
      } else if (prev.length < 2) {
        return [...prev, domain];
      }
      return prev;
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ ...formData, selectedDomains });
    localStorage.setItem("formData", JSON.stringify(formData));
    fetch("/api/volunteer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.googleId}`, // Assuming email is stored in socials
      },
      body: JSON.stringify({ ...formData, selectedDomains }),
    })
      .then((response) => {
        if (response.ok) {
          setIsSubmitted(true);
          setErrorMessage(null);
        } else {
          return response.json().then((data) => {
            console.log(data.error);
            setErrorMessage(data.error);
          });
        }
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  if (isSubmitted) {
    return <SuccessPage />;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col lg:flex-row lg:space-x-8 items-center justify-center">
        <div className="lg:w-1/3 mx-auto">
          <Card className="text-black shadow-none border-none">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                CSI MIET Volunteer Application
              </CardTitle>
              <CardDescription>
                Join our team and make a difference!
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6 text-black">
                <div className="space-y-2">
                  <Label>Which Domain Are You Interested In? (Max 2)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {domains.map((domain) => (
                      <div key={domain} className="flex items-center space-x-2">
                        <Checkbox
                          id={domain}
                          checked={selectedDomains.includes(domain)}
                          onCheckedChange={() => handleDomainChange(domain)}
                          disabled={
                            selectedDomains.length >= 2 &&
                            !selectedDomains.includes(domain)
                          }
                        />
                        <Label htmlFor={domain}>{domain}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">
                    Do You Have Any Prior Experience in the Domain?
                  </Label>
                  <Textarea
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    placeholder="Mention your prior experience in the selected domains."
                    className="h-24"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skills">
                    What Specific Skills Can You Bring to This Domain?
                  </Label>
                  <Textarea
                    id="skills"
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    required
                    placeholder="Describe the skills you possess relevant to the selected domains."
                    className="h-24"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="otherSocieties">
                    Have You Been Working with Other Societies?
                  </Label>
                  <Textarea
                    id="otherSocieties"
                    name="otherSocieties"
                    value={formData.otherSocieties}
                    required
                    onChange={handleInputChange}
                    placeholder="If yes, mention the societies and your roles."
                    className="h-24"
                  />
                </div>

                <div className="space-y-2">
                  <Label>
                    Availability for Regular Meetings and Monthly Events
                  </Label>
                  <RadioGroup
                    required
                    defaultValue="flexible"
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, availability: value }))
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="weekdays" id="weekdays" />
                      <Label htmlFor="weekdays">Weekdays</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="weekends" id="weekends" />
                      <Label htmlFor="weekends">Weekends</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="both" id="both" />
                      <Label htmlFor="both">Both Weekdays and Weekends</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="flexible" id="flexible" />
                      <Label htmlFor="flexible">Flexible Schedule</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="portfolio">
                    Add Links to Your Projects or Portfolio
                  </Label>
                  <Input
                    id="portfolio"
                    name="portfolio"
                    required
                    value={formData.portfolio}
                    onChange={handleInputChange}
                    placeholder="Provide links to your portfolio or notable projects."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aboutYou">
                    Tell Us About Yourself (Be Creative as You Can)
                  </Label>
                  <Textarea
                    id="aboutYou"
                    name="aboutYou"
                    required
                    value={formData.aboutYou}
                    onChange={handleInputChange}
                    placeholder="Introduce yourself in a creative way."
                    className="h-32"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="socials">Add Your Socials</Label>
                  <Textarea
                    id="socials"
                    name="socials"
                    required
                    value={formData.socials}
                    onChange={handleInputChange}
                    placeholder="Add links to your social media profiles (e.g., LinkedIn, GitHub, Instagram)"
                    className="h-24"
                  />
                </div>
              </CardContent>
              {errorMessage && (
                errorMessage === "Make sure all entires are correct before submitting." ?
                <div className="text-neutral-700 text-xs p-2">{errorMessage}</div>:
                <div className="text-red-500 text-xs p-2">{errorMessage}</div>
              )}
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full bg-gray-900 text-white hover:bg-gray-700"
                >
                  Submit Application
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
        {/* <div className="hidden lg:block lg:w-1/2 lg:fixed lg:right-0 lg:top-0 lg:h-screen overflow-y-auto">
          <LogoInfoSection />
        </div> */}
      </div>
    </div>
  );
}
