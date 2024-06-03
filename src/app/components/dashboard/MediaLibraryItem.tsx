import { Image as Media } from "@/app/interfaces/interfaces";
import Image from "next/image";

export default function MediaLibraryItem({ media, selected, disabled = false, onChange }: { media: Media, selected?: boolean, disabled?: boolean, onChange: (selected: boolean) => void }) {
  return <label className="relative aspect-square bg-slate-200 rounded-lg overflow-hidden cursor-pointer">
    <Image
      src={process.env.NEXT_PUBLIC_MEDIA_BASE_URL + "/" + media.filename}
      width={200}
      height={200}
      alt={media.name}
      className="object-cover w-full h-full" />

    <input
      type="checkbox"
      className="absolute top-2 left-2 checkbox checkbox-sm bg-white bg-opacity-60 border-gray-500"
      checked={selected}
      disabled={disabled}
      onChange={(e) => onChange(e.target.checked)}
    />
  </label>;
}