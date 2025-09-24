"use client";

import { useState, useEffect } from "react";
import { trpc } from "@/utils/trpc";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";

interface FidaProfile {
  individualId: string;
  fullName: string;
  dob: string;
  gender: string;
  region: string;
  subCity: string;
  woreda: string;
}

export function FidaProfileCompletionForm() {
  const [individualId, setIndividualId] = useState("");
  const [profile, setProfile] = useState<FidaProfile | null>(null);
  const [displayError, setDisplayError] = useState<string | null>(null);
  const [shouldFetch, setShouldFetch] = useState(false);

  const { data, isLoading, error: queryError } = trpc.fida.getFidaProfile.useQuery(
    { individualId },
    {
      enabled: shouldFetch && individualId.length > 0,
      onSuccess: (fetchedData: FidaProfile) => {
        setProfile(fetchedData);
        setDisplayError(null);
        setShouldFetch(false);
      },
      onError: (err: any) => {
        setProfile(null);
        setDisplayError(err.message);
        setShouldFetch(false);
      },
    }
  );

  useEffect(() => {
    if (queryError) {
      setDisplayError(queryError.message);
    }
  }, [queryError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (individualId) {
      setShouldFetch(true);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>FIDA Profile Completion</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="individualId">Individual ID</Label>
              <Input
                id="individualId"
                placeholder="Enter FIDA Individual ID"
                value={individualId}
                onChange={(e) => setIndividualId(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Fetching..." : "Fetch Profile"}
            </Button>
          </div>
        </form>

        {profile && (
          <div className="mt-4 space-y-2">
            <h3 className="text-lg font-semibold">Profile Details:</h3>
            <p>
              <span className="font-medium">Full Name:</span> {profile.fullName}
            </p>
            <p>
              <span className="font-medium">Date of Birth:</span> {profile.dob}
            </p>
            <p>
              <span className="font-medium">Gender:</span> {profile.gender}
            </p>
            <p>
              <span className="font-medium">Region:</span> {profile.region}
            </p>
            <p>
              <span className="font-medium">Sub City:</span> {profile.subCity}
            </p>
            <p>
              <span className="font-medium">Woreda:</span> {profile.woreda}
            </p>
            {/* Add a button to confirm/save this profile to the user's account */}
            <Button className="mt-4">Confirm Profile</Button>
          </div>
        )}

        {displayError && <p className="text-red-500 mt-4">{displayError}</p>}
      </CardContent>
    </Card>
  );
}
