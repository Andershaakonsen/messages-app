import { useAuthContext } from "context/AuthContext";
import { db } from "firebase-config";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

function Profile() {
  const profile = useAuthContext().profile;
  const { register, handleSubmit, reset } = useForm<IProfile>();

  const handleReset = () => {
    reset({ firstName: "", lastName: "", email: "" });
  };
  const onSubmit = async (data: IProfile) => {
    await updateDoc(doc(db, "profiles", profile?.uid), {
      ...data,
      uid: profile?.uid,
    });
    console.log(profile);

    handleReset();
  };

  return (
    <>
      <h2 className="text-2xl text-radix-violet11 mt-2">Your Profile</h2>
      <form className="flex flex-col w-96" onSubmit={handleSubmit(onSubmit)}>
        <label className="text-radix-mauve11 mt-1">First Name</label>
        <input
          type="text"
          {...register("firstName")}
          placeholder={profile?.firstName}
          className="outline-none bg-radix-mauve3 border focus:border-radix-violet7 border-radix-mauve6 px-2 py-1 w-2/3 rounded-md"
          required
        />
        <label className="text-radix-mauve11 mt-1">Last Name</label>
        <input
          type="text"
          {...register("lastName")}
          placeholder={profile?.lastName}
          className="outline-none bg-radix-mauve3 border focus:border-radix-violet7 border-radix-mauve6 px-2 py-1 w-2/3 rounded-md"
          required
        />
        <label className="text-radix-mauve11 mt-1">Email</label>
        <input
          type="text"
          {...register("email")}
          placeholder={profile?.email}
          className="outline-none bg-radix-mauve3 border focus:border-radix-violet7 border-radix-mauve6 px-2 py-1 w-2/3 rounded-md"
          required
        />
        <div className="flex items-center gap-1 mt-4">
          <button
            type="submit"
            className="text-sm border border-radix-green6 hover:border-radix-green7 px-2 text-radix-green10 hover:text-radix-green12 cursor-pointer hover:scale-110 transition-all"
          >
            UPDATE
          </button>
          <button
            className="text-sm border border-radix-red6 hover:border-radix-red7 px-2 text-radix-red10 hover:text-radix-red12 cursor-pointer hover:scale-105 transition-all"
            type="button"
            onClick={handleReset}
          >
            DISCARD
          </button>
        </div>
      </form>
    </>
  );
}

export default Profile;
