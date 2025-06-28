"use client";

import { useState, useTransition } from "react";
import { postComment } from "@/action/postComment";

export default function KomentarForm({
  villageId,
  role,
  UserId,
  onCommentSubmit
}: {
  villageId: string;
  role: string;
  UserId?: string;
  onCommentSubmit: () => void;
}) {
  const [text, setText] = useState("");
  const [isPending, startTransition] = useTransition();
  const handleSubmit = () => {
    if (!UserId) {
      window.location.href = "/login";
      return;
    }

    if (!text.trim()) return;

    startTransition(async () => {
      await postComment({
        text,
        userId: UserId || "",
        villageId: villageId,
      });
      setText("");
      onCommentSubmit();
    });
  };

  return (
    <>
      <div className="mt-7 flex">
        <img
          src="/assetsweb/Village/VillageMain/profile.svg"
          alt="profile"
          width={50}
          height={50}
          className="mr-5"
        />
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Tambah Komentar..."
          className="border-b-1 border-gray-400 w-full outline-none placeholder:text-lg md:text-xl"
        />
      </div>
      <div className="text-right mt-5">
        <button
          onClick={() => setText("")}
          className="font-semibold text-lg cursor-pointer"
        >
          Batal
        </button>
        <button
          onClick={handleSubmit}
          className={`ml-5 text-white ${
            role === "auditor" ? "bg-[#0093DD]" : "bg-[#08B786]"
          } font-semibold text-md rounded-2xl px-2 md:px-4 py-2 cursor-pointer`}
        >
          {isPending ? "Mengirim..." : "Komentar"}
        </button>
      </div>
    </>
  );
}
