"use client";

import { useState, useEffect, useRef } from "react";
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
// here i will set the interface for id camera scanning and manual input types

interface ImageData {
  file: File | null;
  preView: string | null;
}

export function FidaProfileCompletionForm() {
  const [individualId, setIndividualId] = useState("");
  const [profile, setProfile] = useState<FidaProfile | null>(null);
  const [displayError, setDisplayError] = useState<string | null>(null);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [searched, setSearched] = useState(false);
  // state for image data
  const [frontImage, setFrontImage] = useState<ImageData>({
    file: null,
    preView: null,
  });
  const [backImage, setBackImage] = useState<ImageData>({
    file: null,
    preView: null,
  });
  const [isUseCamera, setIsUseCamera] = useState(false);

  // Ref for file inpust this is for  make the app not re-render when the user select a file
  const frontFileInputRef = useRef<HTMLInputElement>(null);
  const backFileInputRef = useRef<HTMLInputElement>(null);
  const canvaRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const {
    data,
    isLoading,
    error: queryError,
  } = trpc.fida.getFidaProfile.useQuery(
    { individualId },
    {
      enabled: shouldFetch && individualId.length > 0,
    }
  );

  useEffect(() => {
    if (data) {
      setProfile(data);
      setDisplayError(null);
      setShouldFetch(false);
      setSearched(true);
    }
  }, [data]);

  useEffect(() => {
    if (queryError) {
      setProfile(null);
      setDisplayError(queryError.message);
      setShouldFetch(false);
      setSearched(true);
    }
  }, [queryError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (individualId) {
      setSearched(false);
      setProfile(null);
      setDisplayError(null);
      setShouldFetch(true);
    }
  };

  // this function will handle the file insertion

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "front" | "back"
  ) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const preView = URL.createObjectURL(file);
      if (type === "front") {
        setFrontImage({ file, preView });
      } else {
        setBackImage({ file, preView });
      }
    }
  };

  // for set camera usage

  const startCamera = async () => {
    setIsUseCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "enviroment",
        },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      setDisplayError(
        "Error accessing camera. Please ensure you have given permission."
      );
      setIsUseCamera(false);
    }
  };

  return (
    <div className="w-auto dark:bg-white p-6  h-screen ">
      <CardHeader>
        <CardTitle className="text-4xl">Make your Profile full</CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <div className="">
          <div className=" flex gap-4">
            <Label htmlFor="individualId">Individual ID</Label>
            <Input
              id="individualId"
              placeholder="Enter FIDA Individual ID"
              value={individualId}
              onChange={(e) => setIndividualId(e.target.value)}
              className="w-64"
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Fetching..." : "Fetch Profile"}
            </Button>
          </div>
        </div>
      </form>

      {isLoading && <p className="mt-4">Fetching profile...</p>}

      {searched && !profile && !isLoading && !displayError && (
        <p className="mt-4">No profile found for this ID.</p>
      )}

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
        </div>
      )}

      {displayError && <p className="text-red-500 mt-4">{displayError}</p>}
    </div>
  );
}
