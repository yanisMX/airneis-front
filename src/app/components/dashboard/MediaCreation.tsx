import { useAuth } from "@/app/context/AuthContext";
import { Image as Media } from "@/app/interfaces/interfaces";
import { useEffect, useRef, useState } from "react";

export default function MediaCreation({ options, onUploadStart, onUploadComplete, onUploadError }: { options?: MediaCreationOptions, onUploadStart?: () => void, onUploadComplete?: (media: Media) => void, onUploadError?: () => void }) {
  if (!options) options = new MediaCreationOptions();

  const { user } = useAuth();

  const [fileName, setFileName] = useState<string>("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");

  const [isUploading, setUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadFailed, setUploadFailed] = useState<boolean>(false);

  const uploadInputRef = useRef<HTMLInputElement | null>(null);
  const imagePreviewRef = useRef<HTMLDivElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUploadProgress(0);

    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImagePreviewUrl(e.target.result as string);
          uploadFile();
        }
      };

      reader.readAsDataURL(file);
    } else {
      setFileName("");
      setImagePreviewUrl("");
      setUploadFailed(false);
    }
  };

  const uploadFile = () => {
    const file = uploadInputRef.current?.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", process.env.NEXT_PUBLIC_API_BASE_URL + "/medias", true);
    xhr.setRequestHeader("Authorization", "Bearer " + user?.accessToken);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(percentComplete);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 201) {
        const response = JSON.parse(xhr.responseText);
        handleSuccess(response.media as Media);
      } else {
        handleError();
      }
    };

    xhr.onerror = () => {
      handleError();
    };

    xhr.send(formData);
    handleStart();
  };

  const handleStart = () => {
    setUploadFailed(false);
    setUploading(true);
    setUploadProgress(0);
    onUploadStart?.();
  }

  const handleSuccess = (media: Media) => {
    setUploadProgress(100);
    setUploading(false);
    onUploadComplete?.(media);
  }

  const handleError = () => {
    setUploadFailed(true);
    setUploadProgress(0);
    setUploading(false);
    onUploadError?.();
  }

  useEffect(() => {
    const imagePreviewElement = imagePreviewRef.current;
    if (imagePreviewElement && !imagePreviewUrl) {
      imagePreviewElement.classList.add("border-dashed", "border-2", "border-gray-400");
    } else if (imagePreviewElement) {
      imagePreviewElement.classList.remove("border-dashed", "border-2", "border-gray-400");
    }
  }, [imagePreviewUrl]);

  return (
    <div className={isUploading ? "cursor-wait" : "cursor-pointer"}>
      <div
        id="image-preview"
        ref={imagePreviewRef}
        className="relative overflow-hidden flex flex-col p-4 h-80 bg-gray-100 border-dashed border-2 border-gray-400 rounded-lg justify-center items-center text-center"
        onClick={() => !isUploading && uploadInputRef.current?.click()}
      >
        <input
          id="upload"
          type="file"
          className="hidden"
          accept="image/jpeg, image/png, image/jpg"
          ref={uploadInputRef}
          onChange={handleFileChange}
          disabled={uploadProgress === 100 && !uploadFailed && !options.allowReupload}
        />

        {!imagePreviewUrl ? (
          <div>
            <div className="mb-2">
              <i className="fa-solid fa-arrow-up-from-bracket text-4xl"></i>
            </div>
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-700">
              Téléverser une image
            </h5>
            <p className="font-normal text-sm text-gray-400 md:px-6">
              Choisissez une image de moins de <b className="text-gray-600">10 Mo</b>
            </p>
            <p className="font-normal text-sm text-gray-400 md:px-6">
              au format <b className="text-gray-600">JPG, JPEG ou PNG</b>.
            </p>
            <span id="filename" className="text-gray-500 bg-gray-200 z-50">{fileName}</span>
          </div>
        ) : (
          <img src={imagePreviewUrl} className="h-full rounded-lg mx-auto object-contain" alt="Aperçu de l'image" />
        )}

        {uploadFailed && <div className="absolute bottom-2 p-4">
          <div role="alert" className="alert alert-error flex py-2 gap-x-2 shadow-lg">
            <i className="fa-solid fa-circle-exclamation"></i>
            <span>L&apos;envoi de l&apos;image a échoué.</span>
          </div>
        </div>}

        {isUploading && <div className="absolute bottom-2 p-4">
          <div role="alert" className="alert flex py-2 gap-x-2 shadow-lg border border-gray-300">
            <span className="loading loading-spinner loading-md"></span>
            <span>Envoi en cours...</span>
          </div>
        </div>}

        {uploadProgress !== 0 && (
          <progress className={"absolute bottom-0 progress " + (uploadProgress !== 100 ? "progress-primary" : "progress-success") + " w-full rounded-none"} value={uploadProgress} max="100"></progress>
        )}
      </div>
    </div>
  );
}

class MediaCreationOptions {
  allowReupload: boolean = false;
}