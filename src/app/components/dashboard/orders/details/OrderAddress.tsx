import { Address } from "@/app/interfaces/interfaces";

export default function OrderAddress({ address }: { address: Address }) {
  return (<>
    <div className="flex gap-2">
      <label className="form-control w-full">
        <div className="label label-text">Nom</div>
        <input type="text" value={address?.lastName ?? ""} className="input input-sm input-bordered w-full disabled:text-black disabled:text-opacity-60" disabled={true} />
      </label>

      <label className="form-control w-full">
        <div className="label label-text">Prénom</div>
        <input type="text" value={address?.firstName ?? ""} className="input input-sm input-bordered w-full disabled:text-black disabled:text-opacity-60" disabled={true} />
      </label>
    </div>

    <label className="form-control w-full">
      <div className="label label-text">Adresse</div>
      <input type="text" value={address?.address1 ?? ""} className="input input-sm input-bordered w-full disabled:text-black disabled:text-opacity-60" disabled={true} />
    </label>

    <label className="form-control w-full">
      <div className="label label-text">Adresse complémentaire</div>
      <input type="text" value={address?.address2 ?? ""} className="input input-sm input-bordered w-full disabled:text-black disabled:text-opacity-60" disabled={true} />
    </label>

    <div className="flex gap-2">
      <label className="form-control w-full">
        <div className="label label-text">Code postal</div>
        <input type="text" value={address?.postalCode ?? ""} className="input input-sm input-bordered w-full disabled:text-black disabled:text-opacity-60" disabled={true} />
      </label>

      <label className="form-control w-full">
        <div className="label label-text">Ville</div>
        <input type="text" value={address?.city ?? ""} className="input input-sm input-bordered w-full disabled:text-black disabled:text-opacity-60" disabled={true} />
      </label>
    </div>

    <div className="flex gap-2">
      <label className="form-control w-full">
        <div className="label label-text">Région</div>
        <input type="text" value={address?.region ?? ""} className="input input-sm input-bordered w-full disabled:text-black disabled:text-opacity-60" disabled={true} />
      </label>

      <label className="form-control w-full">
        <div className="label label-text">Pays</div>
        <input type="text" value={address?.country ?? ""} className="input input-sm input-bordered w-full disabled:text-black disabled:text-opacity-60" disabled={true} />
      </label>
    </div>

    <label className="form-control w-full">
      <div className="label label-text">Téléphone</div>
      <input type="text" value={address?.phone ?? ""} className="input input-sm input-bordered w-full disabled:text-black disabled:text-opacity-60" disabled={true} />
    </label>
  </>
  );
}
