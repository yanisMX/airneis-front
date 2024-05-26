import { Image as Media } from "@/app/interfaces/interfaces";
import MediaLibraryItem from "./MediaLibraryItem";

export default function MediaLibrary({ options, isFetching, medias, selectedMedias, setSelectedMedias }: { options?: MediaLibraryOptions, isFetching: boolean, medias: Media[], selectedMedias: Media[], setSelectedMedias: (medias: Media[]) => void }) {
  if (!options) options = new MediaLibraryOptions();

  return <>
    <div className="grid gap-2 grid-cols-3 sm:grid-cols-6">
      {
        isFetching ? (
          Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="aspect-square skeleton bg-slate-200 rounded-lg"></div>
          ))
        ) : (
          medias.map(media => (
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
        )
      }
    </div>
  </>;
}

class MediaLibraryOptions {
  public multiple?: boolean = false;
  public selectedMedias?: Media[] = [];
}
