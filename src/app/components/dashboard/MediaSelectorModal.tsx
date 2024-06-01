import { Image as Media, MediaPagination, MediaQuery } from "@/app/interfaces/interfaces";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import MediaCreation from "./MediaCreation";
import MediaLibrary from "./MediaLibrary";
import MediaLibraryItem from "./MediaLibraryItem";

export default function MediaSelectorModal({ id, options, onSelect }: { id: string, options?: MediaSelectorModalOptions, onSelect?: (medias: Media[]) => void }) {
  if (!options) {
    options = new MediaSelectorModalOptions();
  } else {
    if (options.multiple === undefined) options.multiple = true;
    if (options.gallery === undefined) options.gallery = true;
    if (options.preview === undefined) options.preview = true;
  }

  const dialogRef = useRef<HTMLDialogElement>(null);

  const [mediaKey, setMediaKey] = useState<number>(0);

  const [isFetching, setFetching] = useState<boolean>(true);
  const [isUploading, setUploading] = useState<boolean>(false);
  const [importMode, setImportMode] = useState<boolean>(true);

  const [mediaQuery, setMediaQuery] = useState<MediaQuery>({ limit: 24 });
  const [mediaPagination, setMediaPagination] = useState<MediaPagination>();

  const [medias, setMedias] = useState<Media[]>([]);
  const [selectedMedias, setSelectedMedias] = useState<Media[]>([]);
  const [createdMedias, setCreatedMedias] = useState<Media[]>([]);

  const fetchMedias = async () => {
    setFetching(true);

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/medias?limit=" + mediaQuery.limit
        + (mediaQuery.page ? "&page=" + mediaQuery.page : ""));
      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      setMedias(data.medias);
      setMediaPagination({ ...data });
    } catch (error) {
      console.error(error);
      toast.error(() => <span>Une erreur est survenue lors de la récupération des médias.</span>);
    } finally {
      setFetching(false);
    }
  }

  useEffect(() => {
    if (options.gallery)
      fetchMedias();
  }, [mediaQuery]);

  useEffect(() => {
    if (options.gallery)
      fetchMedias();
  }, []);

  const onConfirm = () => {
    onSelect?.(selectedMedias);
    dialogRef.current?.close();
  }

  const onClose = () => {
    setMedias([]);
    setSelectedMedias([]);
    setCreatedMedias([]);
    setImportMode(true);
    setUploading(false);
    setMediaKey(mediaKey + 1);
  }

  return <>
    <dialog id={id} ref={dialogRef} className="modal modal-bottom sm:modal-middle" onClose={() => onClose()}>
      <div className="modal-box font-normal flex flex-col px-0 sm:w-11/12 sm:max-w-5xl">
        <div className="px-6 mb-4 flex items-center">
          <h2 className="font-bold text-2xl flex-1">Médias</h2>
          {
            options.multiple && (
              <span className="opacity-50">{selectedMedias.length === 0 ? "Aucun" : selectedMedias.length} média{selectedMedias.length > 1 ? "s" : ""} sélectionné{selectedMedias.length > 1 ? "s" : ""}</span>
            )
          }
        </div>

        <div className="form-control gap-2 overflow-auto px-6">
          {
            importMode && createdMedias.length > 0 && (
              <div className="mb-4">
                <div className="mb-2"><span className="text-sm text-opacity-50">Importés à l'instant</span></div>
                <div className="grid gap-2 grid-cols-3 sm:grid-cols-6">
                  {
                    createdMedias.map(media => (
                      <MediaLibraryItem
                        key={media.id}
                        media={media}
                        selected={selectedMedias.some(m => m.id === media.id)}
                        onChange={(selected) => {
                          if (selected) {
                            if (!options.multiple) {
                              setSelectedMedias([media]);
                            } else {
                              setSelectedMedias([...selectedMedias, media]);
                            }
                          } else {
                            setSelectedMedias(selectedMedias.filter(m => m.id !== media.id));
                          }
                        }} />
                    ))
                  }
                </div>
              </div>
            )
          }

          {
            importMode ? (
              <MediaCreation
                key={mediaKey}
                options={{ allowReupload: true }}
                onUploadStart={() => setUploading(true)}
                onUploadError={() => setUploading(false)}
                onUploadComplete={(media: Media) => {
                  setUploading(false)

                  if (options.preview) {
                    setCreatedMedias([...createdMedias, media]);
                    setSelectedMedias(options.multiple ? [...selectedMedias, media] : [media]);
                  } else {
                    onSelect?.([media]);
                    dialogRef.current?.close();
                  }
                }}
              />
            ) : (
              <MediaLibrary
                isFetching={isFetching}
                medias={medias}
                selectedMedias={selectedMedias}
                setSelectedMedias={setSelectedMedias}
                options={{ multiple: options.multiple }}
              />
            )
          }
        </div>

        <div className="modal-action px-6 justify-between sm:justify-end">
          <div className="sm:flex-1">
            {
              options.gallery && (
                <button
                  className="btn btn-sm"
                  onClick={() => {
                    if (importMode) {
                      setMedias([]);
                      setMediaKey(mediaKey + 1);
                      setMediaPagination(undefined);
                      setMediaQuery({ ...mediaQuery, page: undefined });
                    }

                    setImportMode(!importMode);
                  }}
                  disabled={isUploading}
                >
                  {
                    importMode ? (<>
                      <i className="fa-solid fa-images"></i>
                      <span>Galerie</span>
                    </>) : (<>
                      <i className="fa-solid fa-arrow-up-from-bracket"></i>
                      <span className="hidden md:inline-block">Importer</span>
                    </>)
                  }
                </button>
              )
            }
          </div>
          <div>
            {
              !importMode && (
                <div className="join items-center bg-base-200 sm:me-12">
                  <button className="join-item btn btn-sm"
                    onClick={() => {
                      if (isFetching || mediaPagination?.page === 1) return;
                      setMediaQuery({ ...mediaQuery, page: (mediaQuery.page ?? 1) - 1 })
                    }}
                  >
                    <i className="fa-solid fa-angle-left"></i>
                  </button>
                  <span className="text-sm font-semibold">{mediaPagination?.page ?? 0} / {mediaPagination?.totalPages ?? 0}</span>
                  <button className="join-item btn btn-sm"
                    onClick={() => {
                      if (isFetching || mediaPagination?.page === mediaPagination?.totalPages) return;
                      setMediaQuery({ ...mediaQuery, page: (mediaQuery.page ?? 1) + 1 })
                    }}
                  >
                    <i className="fa-solid fa-angle-right"></i>
                  </button>
                </div>
              )
            }
          </div>
          <div className="flex space-x-2">
            <button className="btn btn-sm" onClick={() => dialogRef.current?.close()} disabled={isUploading}>Annuler</button>
            {options.preview && <button className="btn btn-sm btn-primary" onClick={() => onConfirm()} disabled={isUploading}>Sélectionner</button>}
          </div>
        </div>
      </div>
    </dialog >
  </>;
}

class MediaSelectorModalOptions {
  /**
   * Allows the user to select multiple media(s) when the previous one has been imported.
   */
  public multiple?: boolean = true;

  /**
   * Allows the user to select media(s) from the gallery.
   */
  public gallery?: boolean = true;

  /**
   * Allows the user to preview and (de)select imported media(s) before confirming the selection.
   * Otherwise, the selection is confirmed immediately after the import, and the modal is closed.
   */
  public preview?: boolean = true;
}
