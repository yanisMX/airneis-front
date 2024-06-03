"use client";

import { useAuth } from "@/app/context/AuthContext";
import { User, UserDto } from "@/app/interfaces/interfaces";
import { formatDateString } from "@/app/utils/utils";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function UserPage() {
  const { user: authUser } = useAuth();

  const router = useRouter();
  const { id } = useParams();

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const saveButtonRef = useRef<HTMLButtonElement>(null);

  const [user, setUser] = useState<User>();
  const [role, setRole] = useState<"user" | "admin">("user");
  const [isFetching, setFetching] = useState<boolean>(true);

  const [isSaving, setSaving] = useState<boolean>(false);

  const processUserSave = () => {
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;

    let errors: string[] = [];

    if (!name || name.length === 0) {
      errors.push("Le nom de l'utilisateur est requis.");
      nameRef.current?.classList.add("input-error");
    }

    if (!email || email.length === 0) {
      errors.push("L'adresse email de l'utilisateur est requise.");
      emailRef.current?.classList.add("input-error");
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

    const userData: UserDto = {
      name: name as string,
      email: user!.email === email ? undefined : email as string,
      role
    };

    updateUser(userData);
  }

  const updateUser = async (editedUser: UserDto) => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/users/" + user!.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authUser?.accessToken}`
        },
        body: JSON.stringify(editedUser)
      });

      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      toast.success(() => <span>L&apos;utilisateur a été mis à jour.</span>);
    } catch (error) {
      console.error(error);
      toast.error(() => <span>Une erreur est survenue lors de la mise à jour de l&apos;utilisateur.</span>);
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    const inputs = [nameRef, emailRef, saveButtonRef];

    for (const input of inputs) {
      if (isSaving) {
        input.current?.setAttribute("disabled", "true");
      } else {
        input.current?.removeAttribute("disabled");
      }
    }
  }, [isSaving]);

  const fetchUser = async (id: number) => {
    setFetching(true);

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/users/" + id, {
        headers: {
          "Authorization": `Bearer ${authUser?.accessToken}`
        }
      });
      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      setUser(data.user);
      setRole(data.user.role);
      setFetching(false);
    } catch (error) {
      console.error(error);
      toast.error(() => <span>Utilisateur <span className="opacity-50">#{id}</span> inexistant.</span>);
      router.push("/dashboard/users");
    }
  }

  useEffect(() => {
    fetchUser(+id);
  }, [id]);

  return (
    <>
      {
        isFetching || !user ? (
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
                    <span className="sm:hidden">Édit. </span>
                    <span className="hidden sm:inline-block">Édition de l&apos;</span>
                    <span>utilisateur</span>
                  </h1>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="btn btn-primary btn-sm" ref={saveButtonRef} onClick={processUserSave}>
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
                          defaultValue={user.name}
                          className="input input-sm input-bordered w-full"
                        />
                      </label>

                      <label className="form-control w-full">
                        <div className="label label-text">
                          Email
                          <span className="text-error">*</span>
                        </div>
                        <input
                          ref={emailRef}
                          maxLength={100}
                          onChange={() => nameRef.current?.classList.remove("input-error")}
                          type="email"
                          placeholder="Email de l'utilisateur"
                          defaultValue={user.email}
                          className="input input-sm input-bordered w-full"
                        />
                      </label>

                      <div className="form-control mb-4">
                        <h3 className="label label-text" tabIndex={0}>Rôle</h3>

                        <div className="dropdown me-1">
                          <div tabIndex={0} role="button" className="btn btn-xs">{role}<i className="fa-solid fa-chevron-down"></i></div>
                          <ul tabIndex={0} className="dropdown-content z-[1] menu menu-sm lg:menu-xs p-1 mt-2 border shadow bg-base-100 rounded-lg w-48 lg:w-32">
                            <li className="menu-item">
                              <button className={`${role === "user" ? "font-bold bg-primary-content text-primary" : ""}`} onClick={() => setRole("user")}>Utilisateur</button>
                            </li>
                            <li className="menu-item">
                              <button className={`${role === "admin" ? "font-bold bg-primary-content text-primary" : ""}`} onClick={() => setRole("admin")}>Administrateur</button>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <label className="form-control w-full">
                          <div className="label label-text">Date de création</div>
                          <input type="text" value={formatDateString(user.createdAt)} className="input input-sm input-bordered w-full disabled:text-black disabled:text-opacity-60" disabled={true} />
                        </label>

                        <label className="form-control w-full">
                          <div className="label label-text">Dernière mise à jour</div>
                          <input type="text" value={formatDateString(user.updatedAt)} className="input input-sm input-bordered w-full disabled:text-black disabled:text-opacity-60" disabled={true} />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      }
    </>
  )
};
