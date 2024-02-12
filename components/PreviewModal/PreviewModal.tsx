"use client";

import { motion } from "framer-motion";
import Tag from "../Tag";
import { MdLocationOn } from "react-icons/md";
import { GoClockFill } from "react-icons/go";
import { IoTicket } from "react-icons/io5";
import { FaLink } from "react-icons/fa";
import { useGlobalContext } from "../../context/events.context";
import { useRouter } from "next/navigation";

import { formattedDate } from "@/lib/utils";
import Image from "next/image";
import { useToast } from "../ui/use-toast";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const defaultPoster =
  "https://res.cloudinary.com/getoutbcn/image/upload/v1680721784/samples/poster_sh7xqa.jpg";

const PreviewModal = () => {
  const router = useRouter();
  const {
    previewEvent,
    setPreviewEvent,
    setShowModal,
    uploadedPoster,
    setUploadedPoster,
    setTags,
    supabase,
  } = useGlobalContext();
  const { toast } = useToast();

  const formattedDateStr = previewEvent?.date
    ? formattedDate(previewEvent.date, "PPPPp")
    : "";

  async function postEvent() {
    try {
      const { data, error } = await supabase.from("events").insert([
        {
          name: previewEvent?.name,
          date: previewEvent?.date,
          tags: previewEvent?.tags,
          location: previewEvent?.location,
          price: previewEvent?.price,
          description: previewEvent?.description,
          poster: uploadedPoster,
          link: previewEvent?.link,
          created_by: previewEvent?.created_by,
          validated: true,
          completed: false,
        },
      ]);

      if (error) {
        throw new Error("Error inserting data into database.");
      }
      setUploadedPoster(null);
      setPreviewEvent(null);
      setTags([]);

      toast({
        description: "Esdeveniment creat correctament",
        style: {
          backgroundColor: "#6ae95a",
          color: "#000000",
        },
      });
      router.push("/");
      router.refresh();
      return "Data inserted successfully!";
    } catch (error) {
      toast({
        description: "Error en inserir les dades",
        style: {
          backgroundColor: "#fc0606",
          color: "#000000",
        },
      });
      throw error;
    }
  }

  const handleConfirm = async () => {
    try {
      const result = await postEvent();

      setShowModal(false);
    } catch (error) {
      setShowModal(false);
      // handle error here
      toast({
        description: "Error en inserir les dades",
        style: {
          backgroundColor: "#fc0606",
          color: "#000000",
        },
      });
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      {previewEvent && ( //TODO: THIS CAN BE COMMENTED DURING TESTS
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 bottom-0 right-0 h-full w-full bg-white dark:bg-black bg-opacity-50 z-20"
        >
          <motion.div
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative top-10 m-auto max-w-full md:max-w-3xl bg-white dark:bg-black dark:border dark:border-glow  p-4 md:p-8 rounded-lg shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-glow">
                {previewEvent?.name}
              </h2>
            </div>

            <div data-testid="preview-modal" className="mt-6">
              <div className="flex items-start">
                <div className="w-2/3 pr-4">
                  <p className="text-gray-700 dark:text-glow text-base">
                    {previewEvent?.description}
                  </p>
                  <div className="mt-4">
                    <div className="flex flex-wrap mb-4">
                      <div className="h-10 flex items-center">
                        {previewEvent?.tags
                          ? previewEvent.tags.map((tag, id) => {
                              return <Tag key={id} tag={tag} />;
                            })
                          : null}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-1/3">
                  <Image
                    className="w-full rounded-lg"
                    src={uploadedPoster ? uploadedPoster : defaultPoster}
                    alt="poster image"
                    width={200}
                    height={250}
                  />
                </div>
              </div>

              <div className="mt-6 mb-2">
                <div className="flex items-center dark:bg-glow dark:rounded-lg">
                  <MdLocationOn className="text-black" />
                  <p className="ml-2 text-gray-700 dark:text-black text-sm">
                    {previewEvent?.location}
                  </p>
                </div>
                <div className="flex items-center mt-2 dark:bg-glow dark:rounded-lg">
                  <GoClockFill className="text-black" />
                  <p className="ml-2 text-gray-700 dark:text-black text-sm">
                    {formattedDateStr}
                  </p>
                </div>
                <div className="flex items-center mt-2 dark:bg-glow dark:rounded-lg">
                  <IoTicket className="text-black" />
                  <p className="ml-2 text-gray-700 dark:text-black text-sm">
                    {previewEvent?.price}
                  </p>
                </div>
                {previewEvent?.link && (
                  <div className="flex items-center mt-2 dark:bg-glow dark:rounded-lg">
                    <FaLink className="text-black" />

                    <p className="ml-2 text-gray-700 dark:text-black text-sm">
                      <a href={previewEvent.link} target="_blank">
                        Link
                      </a>
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  data-testid="cancel-button"
                  className="bg-card dark:bg-glow text-black dark:text-black font-bold p-2 px-4 rounded justify-start"
                  onClick={handleCancel}
                >
                  Tornar
                </button>
                <button
                  data-testid="confirm-button"
                  className="bg-card dark:bg-glow text-black dark:text-black font-bold p-2 px-4 rounded justify-end"
                  onClick={handleConfirm}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default PreviewModal;
