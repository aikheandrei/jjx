"use client";

import { useEffect, useState } from "react";

import { Button } from "../ui/button";
import { createPortal } from "react-dom";
import { DescriptionForm } from "./ui/description-form";
import Backdrop from "../ui/backdrop";

interface RatingModalProps {
  children: React.ReactNode;
  id?: number;
  title?: string;
  description?: string;
  edit?: boolean | false;
  request: string;
}

export const DescriptionModal: React.FC<
  RatingModalProps & { onDescriptionUpdate?: () => void }
> = ({ children, id, title, description, request, onDescriptionUpdate }) => {
  const [modal, toggleModal] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <></>;

  const ratingModal =
    document.getElementById("description-modal") || document.body;

  return (
    <>
      <Button
        onClick={() => toggleModal(!modal)}
        className="font-geistsans text-sm"
        variant={"outline"}
      >
        {children}
      </Button>

      {modal &&
        createPortal(
          <Backdrop onClick={() => toggleModal(!modal)}>
            <DescriptionForm
              id={id}
              setTitle={title}
              setDescription={description}
              toggleModal={() => toggleModal(!modal)}
              request={request}
              onDescriptionUpdate={onDescriptionUpdate}
            />
          </Backdrop>,
          ratingModal,
        )}
    </>
  );
};
