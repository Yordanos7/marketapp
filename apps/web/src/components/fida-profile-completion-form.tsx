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

interface ImageData {
  file: File | null;
  preview: string | null;
}

export function FidaProfileCompletionForm() {
  const [individualId, setIndividualId] = useState("");
  const [profile, setProfile] = useState<FidaProfile | null>(null);
  const [displayError, setDisplayError] = useState<string | null>(null);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [searched, setSearched] = useState(false);

  // Image states
  const [frontImage, setFrontImage] = useState<ImageData>({
    file: null,
    preview: null,
  });
  const [backImage, setBackImage] = useState<ImageData>({
    file: null,
    preview: null,
  });
  const [isUsingCamera, setIsUsingCamera] = useState<"front" | "back" | null>(
    null
  );

  // Refs for file inputs
  const frontFileInputRef = useRef<HTMLInputElement>(null);
  const backFileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  // Handle file selection
  const handleFileSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
    side: "front" | "back"
  ) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const preview = URL.createObjectURL(file);
      if (side === "front") {
        setFrontImage({ file, preview });
      } else {
        setBackImage({ file, preview });
      }
    }
  };

  // Start camera
  const startCamera = async (side: "front" | "back") => {
    setIsUsingCamera(side);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }, // Use back camera if available
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      setDisplayError(
        "Unable to access camera. Please use file upload instead."
      );
      setIsUsingCamera(null);
    }
  };

  // Capture image from camera
  const captureImage = () => {
    if (videoRef.current && canvasRef.current && isUsingCamera) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const file = new File([blob], `id-${isUsingCamera}.jpg`, {
                type: "image/jpeg",
              });
              const preview = URL.createObjectURL(blob);

              if (isUsingCamera === "front") {
                setFrontImage({ file, preview });
              } else {
                setBackImage({ file, preview });
              }
            }
          },
          "image/jpeg",
          0.9
        );
      }

      stopCamera();
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsUsingCamera(null);
  };

  // Remove image
  const removeImage = (side: "front" | "back") => {
    if (side === "front") {
      if (frontImage.preview) URL.revokeObjectURL(frontImage.preview);
      setFrontImage({ file: null, preview: null });
      if (frontFileInputRef.current) frontFileInputRef.current.value = "";
    } else {
      if (backImage.preview) URL.revokeObjectURL(backImage.preview);
      setBackImage({ file: null, preview: null });
      if (backFileInputRef.current) backFileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (individualId) {
      setSearched(false);
      setProfile(null);
      setDisplayError(null);
      setShouldFetch(true);
    }
  };

  // Handle final form submission with images
  const handleFinalSubmit = async () => {
    if (!profile) return;

    // Here you would typically upload the images to your server
    // You can access frontImage.file and backImage.file
    console.log("Profile:", profile);
    console.log("Front image:", frontImage.file);
    console.log("Back image:", backImage.file);

    // Add your submission logic here
    alert("Profile completion submitted!");
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (frontImage.preview) URL.revokeObjectURL(frontImage.preview);
      if (backImage.preview) URL.revokeObjectURL(backImage.preview);
      stopCamera();
    };
  }, []);

  return (
    <div className="w-auto dark:bg-white p-6 h-screen">
      <CardHeader>
        <CardTitle className="text-4xl">Make your Profile full</CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <div className="">
          <div className="flex gap-4">
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
        <div className="mt-4 space-y-4">
          <h3 className="text-lg font-semibold">Profile Details:</h3>
          <div className="space-y-2">
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
          </div>

          {/* ID Card Image Upload Section */}
          <div className="mt-6 space-y-6">
            <h3 className="text-lg font-semibold">Upload ID Card Images:</h3>

            {/* Front Side */}
            <div className="space-y-3">
              <Label className="text-base font-medium">
                Front Side of ID Card
              </Label>
              <div className="flex gap-3">
                <Button
                  type="button"
                  onClick={() => frontFileInputRef.current?.click()}
                  variant="outline"
                >
                  Choose File
                </Button>
                <Button
                  type="button"
                  onClick={() => startCamera("front")}
                  variant="outline"
                >
                  Use Camera
                </Button>
                {frontImage.file && (
                  <Button
                    type="button"
                    onClick={() => removeImage("front")}
                    variant="destructive"
                  >
                    Remove
                  </Button>
                )}
              </div>
              <input
                ref={frontFileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(e) => handleFileSelect(e, "front")}
                className="hidden"
              />
              {frontImage.preview && (
                <div className="mt-2">
                  <img
                    src={frontImage.preview}
                    alt="Front ID preview"
                    className="max-w-xs h-auto border rounded"
                  />
                </div>
              )}
            </div>

            {/* Back Side */}
            <div className="space-y-3">
              <Label className="text-base font-medium">
                Back Side of ID Card
              </Label>
              <div className="flex gap-3">
                <Button
                  type="button"
                  onClick={() => backFileInputRef.current?.click()}
                  variant="outline"
                >
                  Choose File
                </Button>
                <Button
                  type="button"
                  onClick={() => startCamera("back")}
                  variant="outline"
                >
                  Use Camera
                </Button>
                {backImage.file && (
                  <Button
                    type="button"
                    onClick={() => removeImage("back")}
                    variant="destructive"
                  >
                    Remove
                  </Button>
                )}
              </div>
              <input
                ref={backFileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(e) => handleFileSelect(e, "back")}
                className="hidden"
              />
              {backImage.preview && (
                <div className="mt-2">
                  <img
                    src={backImage.preview}
                    alt="Back ID preview"
                    className="max-w-xs h-auto border rounded"
                  />
                </div>
              )}
            </div>

            {/* Camera View */}
            {isUsingCamera && (
              <div className="space-y-3">
                <h4 className="font-medium">
                  Camera View - {isUsingCamera} side
                </h4>
                <video
                  ref={videoRef}
                  className="max-w-sm h-auto border rounded"
                  autoPlay
                  playsInline
                />
                <canvas ref={canvasRef} className="hidden" />
                <div className="flex gap-3">
                  <Button onClick={captureImage} type="button">
                    Capture Photo
                  </Button>
                  <Button onClick={stopCamera} variant="outline" type="button">
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button
              onClick={handleFinalSubmit}
              disabled={!frontImage.file || !backImage.file}
              className="w-full mt-6"
            >
              Complete Profile
            </Button>
          </div>
        </div>
      )}

      {displayError && <p className="text-red-500 mt-4">{displayError}</p>}
    </div>
  );
}
