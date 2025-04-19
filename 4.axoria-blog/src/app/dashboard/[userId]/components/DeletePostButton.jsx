"use client"

import { deletePost } from "@/lib/serverActions/blog/postServerActions"
import { useRouter } from "next/navigation";

export default function DeletePostButton({id}) {

  const router = useRouter();
  
  async function handleDelete() {
    const result = await deletePost(id);
    if(result.success) {
      router.push(`/`);
    }
  }

  return (
    <button 
      onClick={ handleDelete}
      className=" bg-red-500 hover:bg-red-400 text-white font-bold py-3 px-4 rounded mr-2 text-center min-w-24">
        Delete
    </button>
  )
}
