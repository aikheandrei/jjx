"use client";
import { ReviewProps } from "@/types/props";
import { StarRating } from "../ui/star-rating";
import { Button } from "./button";
import { useState } from "react";

const UserReview: React.FC<
  ReviewProps & { onTestimonialToggle?: () => void }
> = ({
  id,
  review,
  rating,
  testimonial,
  img,
  userName,
  userEmail,
  isAdmin,
  onTestimonialToggle,
}) => {
  const [isTestimonial, setIsTestimonial] = useState(testimonial);

  const setTestimonial = async (newTestimonialStatus: boolean, id: number) => {
    const response = await fetch(`/api/reviews`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        testimonial: newTestimonialStatus,
        id,
      }),
    });

    if (response.ok) {
      setIsTestimonial(newTestimonialStatus);

      // Call the parent component's refresh method if provided
      if (onTestimonialToggle) {
        onTestimonialToggle();
      }
    } else {
      console.error("Failed to update testimonial status");
    }
  };

  return (
    <div className="flex gap-2 border-b-2 px-8 py-4">
      <img
        className="size-12 rounded-full border-[3px]"
        src={img}
        alt="User Profile"
      />
      <div className="mt-[.05rem] font-geistsans text-sm">
        <a className="flex gap-2">
          <span className="font-semibold">{userName}</span>
          <span className="text-neutral-500">{userEmail}</span>
        </a>
        <div className="-ml-[.2rem] mt-[.15rem] flex flex-row gap-[0.03rem] text-yellow-400">
          <StarRating rating={rating ?? 0} size={18} />
        </div>
        <p className="mb-[1rem] mt-[.1rem] leading-5">
          {id} {review}
        </p>
        {isAdmin && (
          <>
            {isTestimonial ? (
              <p className="mb-[.4rem] mt-[.1rem] leading-5">true</p>
            ) : (
              <p className="mb-[.4rem] mt-[.1rem] leading-5">false</p>
            )}
            {id !== undefined && (
              <Button onClick={() => setTestimonial(!isTestimonial, id)}>
                Testimonial
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export { UserReview };
