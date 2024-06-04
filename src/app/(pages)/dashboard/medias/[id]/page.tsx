"use client";

import MediasDeleteModal from "@/app/components/dashboard/medias/MediasDeleteModal";
import { useAuth } from "@/app/context/AuthContext";
import { Image as Media, MediaDto } from "@/app/interfaces/interfaces";
import { formatBytes, formatDateString } from "@/app/utils/utils";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function MediaPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { id } = useParams();

  const nameRef = useRef<HTMLInputElement>(null);
  const saveButtonRef = useRef<HTMLButtonElement>(null);

  const [media, setMedia] = useState<Media>();
  const [isFetching, setFetching] = useState<boolean>(true);

  const [isSaving, setSaving] = useState<boolean>(false);

  const processMediaSave = () => {
    const name = nameRef.current?.value;

    let errors: string[] = [];

    if (!name || name.length === 0) {
      errors.push("Le nom de la catégorie est requise.");
      nameRef.current?.classList.add("input-error");
    }

    if (errors.length > 0) {
      toast.error(() => <span>
        <p className="font-bold mb-2">Un ou plusieurs champs sont incorrects :</p>
        <ul className="list-disc list-inside">
          {errors.map(error => <li key={error}>{error}</li>)}
        </ul>
      </span>);
      return;
    }

    setSaving(true);

    const mediaData: MediaDto = {
      name: name as string,
    };

    updateMedia(mediaData);
  }

  const updateMedia = async (editedMedia: MediaDto) => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/medias/" + media!.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user?.accessToken}`
        },
        body: JSON.stringify(editedMedia)
      });

      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      toast.success(() => <span>Le média a été mis à jour.</span>);
    } catch (error) {
      console.error(error);
      toast.error(() => <span>Une erreur est survenue lors de la mise à jour du média.</span>);
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    const inputs = [nameRef, saveButtonRef];

    for (const input of inputs) {
      if (isSaving) {
        input.current?.setAttribute("disabled", "true");
      } else {
        input.current?.removeAttribute("disabled");
      }
    }
  }, [isSaving]);

  const fetchMedia = async (id: number) => {
    setFetching(true);

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/medias/" + id, {
        headers: {
          "Authorization": `Bearer ${user?.accessToken}`
        }
      });
      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      setMedia(data.media);
      setFetching(false);
    } catch (error) {
      console.error(error);
      toast.error(() => <span>Média <span className="opacity-50">#{id}</span> inexistant.</span>);
      router.push("/dashboard/medias");
    }
  }

  useEffect(() => {
    fetchMedia(+id);
  }, [id]);

  return (
    <>
      {
        isFetching || !media ? (
          <div className="flex w-full h-full justify-center items-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <>
            <div className="mb-8 px-5 lg:px-0">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <Link href={"/dashboard/medias"} className="btn btn-neutral btn-circle btn-outline btn-sm">
                    <i className="fa-solid fa-chevron-left"></i>
                  </Link>
                  <h1 className="text-3xl font-semibold">
                    <span className="sm:hidden">Édit.</span>
                    <span className="hidden sm:inline-block">Édition du</span>
                    <span> média</span>
                  </h1>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="btn btn-primary btn-sm" ref={saveButtonRef} onClick={processMediaSave}>
                    {
                      isSaving ? (
                        <>
                          <span className="loading loading-spinner"></span>
                          <span>Enregistrement...</span>
                        </>
                      ) : (
                        "Enregistrer"
                      )
                    }
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-grow lg:rounded-xl border overflow-hidden">
              <div className="h-full overflow-y-auto">
                <div className="overflow-x-auto p-4 h-full" tabIndex={0}>

                  <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8">
                    <div className="flex flex-col gap-2">
                      <label className="form-control w-full">
                        <div className="label label-text">
                          Nom
                          <span className="text-error">*</span>
                        </div>
                        <input
                          ref={nameRef}
                          maxLength={100}
                          onChange={() => nameRef.current?.classList.remove("input-error")}
                          type="text"
                          placeholder="Nom de la catégorie"
                          defaultValue={media.name}
                          className="input input-sm input-bordered w-full"
                        />
                      </label>


                      <div className="relative flex justify-center items-center aspect-video rounded-lg overflow-hidden bg-slate-200 border border-gray-300 my-2">
                        <Image
                          src={process.env.NEXT_PUBLIC_MEDIA_BASE_URL + "/" + media.filename}
                          alt={media.name}
                          width={1280}
                          height={720}
                          className="object-cover blur saturate-150 w-full h-full"
                        />

                        <Link href={process.env.NEXT_PUBLIC_MEDIA_BASE_URL + "/" + media.filename} target="_blank">
                          <Image
                            src={process.env.NEXT_PUBLIC_MEDIA_BASE_URL + "/" + media.filename}
                            alt={media.name}
                            width={1280}
                            height={720}
                            className="absolute top-0 left-0 object-contain w-full h-full"
                          />
                        </Link>

                        <button
                          className="absolute top-3 right-3 w-7 h-7 btn text-white btn-xs bg-red-500 border-red-600 hover:border-red-600 hover:bg-red-600"
                          onClick={() => {
                            const modal = document.getElementById("delete-media-modal") as HTMLDialogElement;
                            modal.showModal();
                          }}
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </div>

                      <div className="flex gap-2">
                        <label className="form-control w-full">
                          <div className="label label-text">Poids</div>
                          <input type="text" value={formatBytes(media.size)} className="input input-sm input-bordered w-full disabled:text-black disabled:text-opacity-60" disabled={true} />
                        </label>
                        <label className="form-control w-full">
                          <div className="label label-text">Type</div>
                          <input type="text" value={media.type} className="input input-sm input-bordered w-full disabled:text-black disabled:text-opacity-60" disabled={true} />
                        </label>
                      </div>

                      <div className="flex gap-2">
                        <label className="form-control w-full">
                          <div className="label label-text">Date de création</div>
                          <input type="text" value={formatDateString(media.createdAt)} className="input input-sm input-bordered w-full disabled:text-black disabled:text-opacity-60" disabled={true} />
                        </label>

                        <label className="form-control w-full">
                          <div className="label label-text">Dernière mise à jour</div>
                          <input type="text" value={formatDateString(media.updatedAt)} className="input input-sm input-bordered w-full disabled:text-black disabled:text-opacity-60" disabled={true} />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <MediasDeleteModal id="delete-media-modal" media={media} fetchMedias={() => { router.push("/dashboard/medias") }} />
          </>
        )
      }
    </>
  )
};
