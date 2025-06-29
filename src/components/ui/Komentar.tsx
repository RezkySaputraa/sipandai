"use client";
import Netizen from "./Netizen";
import KomentarForm from "./komentarForm";
import { useEffect, useState } from "react";

export default function Komentar({
  id,
  role,
  userId,
}: {
  id: string;
  role: string;
  userId: string;
}) {
  const [comment, setComment] = useState<any>();
  const [refreshFlag, setRefreshFlag] = useState(0);
  
  const refreshComments = () => {
    setRefreshFlag(prev => prev + 1);
  };
  
  useEffect(() => {
    const fetchComment = async () => {
      const response = await fetch(`/api/village/comment?id=${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch budget data");
      }
      
      const result = await response.json();
      setComment(result.data);
    };
    
    fetchComment();
  }, [refreshFlag, id]);

  if (!comment) {
    return (
      <div className="text-black">
        <h1>Loading...</h1>
      </div>
    );
  }
  
  return (
    <div>
      <h1 className="font-bold text-xl md:text-2xl mt-5  text-black">
        {comment.length} Komentar
      </h1>
      <KomentarForm villageId={id} role={role} UserId={userId} onCommentSubmit={refreshComments} />
      <div className="mt-5">
        {comment.map((data : any) => (
          <Netizen
            key={data.id}
            user={data.user.email || "Anonim"}
            image={data.user.image || null}
            komentar={data.text}
            tanggal={data.createdAt}
          />
        ))}
      </div>
    </div>
  );
}
