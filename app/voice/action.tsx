"use server";

import { createClient } from "../utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function postComment(formData: FormData) {
  // ❌ WRONG: const supabase = createClient(); 
  // ✅ RIGHT:
  const supabase = await createClient(); // This waits for the "Promise" to finish
  
  const content = formData.get("content") as string;
  const topicId = formData.get("topicId") as string;
  const author = (formData.get("author") as string) || "Anonymous Student";

  if (!content || !topicId) return { error: "Missing data" };

  // Now 'supabase' is the actual client, so '.from' exists!
  const { error } = await supabase
    .from("comments")
    .insert([{ 
        topic_id: topicId, 
        content: content, 
        author: author 
    }]);

  if (error) {
    console.error("Supabase Error:", error);
    return { error: "Failed to post" };
  }

  revalidatePath("/voice");
}

export async function postTopic(formData: FormData) {
  const supabase = await createClient();

  const title = formData.get('title') as string;
  const category = formData.get('category') as string;
  const content = formData.get('content') as string;
  const authorName = formData.get('author') as string;
  const authorId = formData.get('authorId') as string;

  const { data, error } = await supabase
    .from('topics')
    .insert([
      { 
        title, 
        category, 
        content, 
        author_name: authorName, 
        //author_id: authorId 
      }
    ]);

  if (error) {
    console.error('Error posting topic:', error);
    return { error: error.message };
  }

  revalidatePath('/voice');
  return { success: true };
}