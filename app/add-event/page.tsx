"use client";

import { useGlobalContext } from "@/context/events.context";
import { EventFormErrors, EventFormType } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn, eventSchema } from "@/lib/utils";
import DatePicker from "react-datepicker";
import { ca } from "date-fns/locale";
import { CldUploadWidget } from "next-cloudinary";
import { AnimatePresence } from "framer-motion";
import PreviewModal from "@/components/PreviewModal";
import Image from "next/image";

export default function AddEvent() {
  const [name, setName] = useState<string>("");
  const [nameLength, setNameLength] = useState<number>(0);
  const [errors, setErrors] = useState({});
  const [description, setDescription] = useState<string>("");
  const [descriptionLength, setDescriptionLength] = useState<number>(0);
  const [inputTag, setInputTag] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [bannedUsers, setBannedUsers] = useState([]);

  const {
    setPreviewEvent,
    showModal,
    setShowModal,
    uploadedPoster,
    setUploadedPoster,
    tags,
    setTags,
    supabase,
    setCreatedBy,
    createdBy,
  } = useGlobalContext();

  useEffect(() => {
    const fetchBannedUsers = async () => {
      try {
        const { data, error } = await supabase.from("banned_users").select("*");
        if (error) {
          throw new Error(error.message);
        }
        // Process the fetched data here
        setBannedUsers(data);
      } catch (error) {
        console.error("Error fetching banned users:", error);
      }
    };

    fetchBannedUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openModal = () => {
    const reasonIsBanned = isBannedUser(bannedUsers, createdBy);

    if (reasonIsBanned) {
      // El usuario está baneado
      // setErrorToast(
      //   `ESTÁS BANEADO\nRazón: ${reasonIsBanned}. Contacta con atbcnapp@gmail.com`
      // );
      console.log("BANNED USER");
      return;
    }

    // setShowModal(true);
    const formattedDate = date ? date.toISOString() : null;
    const eventDetails = {
      name: name,
      description: description,
      tags: tags,
      location: location,
      price: price,
      date: formattedDate,
      link: link,
      poster: uploadedPoster,
      created_by: createdBy,
    };
    setPreviewEvent(eventDetails);
  };

  function isBannedUser(bannedUsers: any, createdBy: any) {
    for (let i = 0; i < bannedUsers.length; i++) {
      if (bannedUsers[i].mail === createdBy) {
        return bannedUsers[i].reason; // El usuario está baneado por este motivo
      }
    }
    return false; // El usuario no está baneado
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const errors = await validateForm({
      name,
      description,
      tags,
      location,
      price,
      link,
    });
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  const validateForm = async (values: EventFormType) => {
    try {
      await eventSchema.validate(values, { abortEarly: false });
      return {};
    } catch (error: any) {
      const errors: EventFormErrors = {};
      let tagLength = 0;
      error.inner.forEach((e: any) => {
        if (
          e.path === "tags[0]" ||
          e.path === "tags[1]" ||
          e.path === "tags[2]"
        ) {
          tagLength++;
          if (tagLength === 1) {
            errors.tags = [e.message];
          }
        } else {
          errors[e.path] = e.message;
        }
      });
      return errors;
    }
  };

  const handleTagsChange = (e: any) => {
    const { value } = e.target;
    setInputTag(value);
  };

  const handleAddTag = (e: any) => {
    e.preventDefault();
    const trimmedInput = inputTag.trim();

    if (trimmedInput.length && !tags.includes(trimmedInput)) {
      setTags((prevState) => [...prevState, trimmedInput]);
      setInputTag("");
    }
  };

  const deleteTag = (index: number) => {
    setTags((prevState) => prevState.filter((tag, i) => i !== index));
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-background text-text p-8 rounded-md dark:bg-black dark:border dark:border-glow"
        >
          <div className="mb-4">
            <Input
              type="text"
              placeholder="nom"
              id="name"
              className="w-full border border-primary dark:border-glow p-2 rounded-md"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setNameLength(e.target.value.length);
              }}
            />
            {(errors as EventFormErrors).name && (
              <span className="text-red-500 font-bold italic text-xs">
                {(errors as EventFormErrors).name}
              </span>
            )}
            <span className="block text-right text-gray-400 text-xs">
              {nameLength}/50
            </span>
          </div>

          <div className="mb-4">
            <Textarea
              id="description"
              placeholder="descripció"
              className="w-full border border-primary dark:border-glow p-2 rounded-md"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setDescriptionLength(e.target.value.length);
              }}
            />
            {(errors as EventFormErrors).description && (
              <span className="text-red-500 font-bold italic text-xs">
                {(errors as EventFormErrors).description}
              </span>
            )}
            <span className="block text-right text-gray-400 text-xs">
              {descriptionLength}/150
            </span>
          </div>

          <div className="flex flex-col justify-center mb-4">
            <div className="flex flex-wrap items-start min-h-12 w-100 px-2 border border-primary dark:border-glow rounded-md font-thin">
              <ul className="flex flex-wrap p-0 mt-8">
                {tags?.map((tag, index) => (
                  <li
                    key={index}
                    className="inline-flex items-center justify-center h-8 px-3 text-sm font-medium text-white dark:text-glow dark:border dark:border-glow bg-gray-800 dark:bg-black rounded-md mr-2 mb-2"
                  >
                    <span className="mb-1">{tag}</span>
                    <span
                      onClick={() => deleteTag(index)}
                      className="block w-4 h-4 leading-4 text-center text-xs text-gray-800 bg-white dark:text-glow dark:bg-black dark:border dark:border-glow rounded-full cursor-pointer ml-2"
                    >
                      X
                    </span>
                  </li>
                ))}
              </ul>

              <Input
                value={inputTag}
                placeholder="Màxim 3 tags"
                onChange={handleTagsChange}
                className="w-full min-w-1/2 border-none rounded-md py-4 px-2 mb-2 mt-2"
              />
              <button
                onClick={handleAddTag}
                className="bg-card dark:bg-glow text-black dark:text-black font-bold p-2 px-4 rounded ml-auto mb-2"
              >
                Afegir tag
              </button>
            </div>
            {(errors as EventFormErrors).tags && (
              <span className="text-red-500 font-bold italic text-xs">
                {(errors as EventFormErrors).tags}
              </span>
            )}
          </div>

          <div className="mb-4">
            <Input
              type="text"
              placeholder="ubicació"
              id="location"
              className="w-full border border-primary dark:border-glow p-2 rounded-md"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            {(errors as EventFormErrors).location && (
              <span className="text-red-500 font-bold italic text-xs">
                {(errors as EventFormErrors).location}
              </span>
            )}
          </div>
          <div className="flex gap-4">
            <div className="w-1/2 mb-4 text-left">
              <Input
                type="text"
                placeholder="preu"
                id="price"
                className="w-full border border-primary dark:border-glow p-2 rounded-md"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              {(errors as EventFormErrors).price && (
                <span className="text-red-500 font-bold italic text-xs">
                  {(errors as EventFormErrors).price}
                </span>
              )}
            </div>

            <div className="flex items-center w-1/2 mb-4 text-right">
              <DatePicker
                className="w-full border border-primary dark:border-glow p-2 rounded-md"
                minDate={new Date()}
                showTimeSelect
                selected={date}
                onChange={(date) => setDate(date)}
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="dd/MM/yy HH:mm"
                locale={ca}
                placeholderText="Seleccionar data"
              />
            </div>
          </div>

          <div className="mb-4">
            <Input
              type="text"
              placeholder="link"
              id="link"
              className="w-full border border-primary dark:border-glow p-2 rounded-md"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            {(errors as EventFormErrors).link && (
              <span className="text-red-500 font-bold italic text-xs">
                {(errors as EventFormErrors).link}
              </span>
            )}
          </div>
          {/* POSTER Cloudinary Widget*/}

          <div className="w-full border border-primary dark:border-glow p-2 rounded-md text-center bg-card dark:bg-glow text-black dark:text-black font-bold">
            {uploadedPoster && (
              <Image
                alt="preview"
                className="uploaded"
                src={uploadedPoster}
                width={200}
                height={250}
              />
            )}
            {uploadedPoster ? null : (
              <CldUploadWidget
                options={{
                  sources: ["local"],
                  clientAllowedFormats: [
                    "jpg",
                    "png",
                    "gif",
                    "bmp",
                    "svg",
                    "webp",
                  ],
                }}
                uploadPreset="atbcnposter"
                onSuccess={(result, { widget }) => {
                  console.log(result?.info);
                  if (
                    typeof result?.info === "object" &&
                    result?.info !== null
                  ) {
                    setUploadedPoster(result?.info?.secure_url);
                  }
                  widget.close();
                }}
              >
                {({ open }) => {
                  function handleOnClick() {
                    open();
                  }
                  return (
                    <button onClick={handleOnClick}>
                      Afegeix un pòster de l&apos;esdeveniment
                    </button>
                  );
                }}
              </CldUploadWidget>
            )}
          </div>

          <div className="mt-8 flex justify-between">
            <div></div>
            <button
              type="submit"
              className="bg-card dark:bg-glow text-black dark:text-black font-bold p-2 px-4 rounded ml-auto mb-2"
              onClick={openModal}
            >
              Preview
            </button>
          </div>
        </form>
      </div>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {showModal && Object.keys(errors).length === 0 && <PreviewModal />}
      </AnimatePresence>
    </div>
  );
}
