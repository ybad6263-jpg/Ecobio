'use client';

import { useState, useEffect } from 'react'; // Added useEffect
import { motion } from 'framer-motion';
import { getColorForUser } from '@/lib/store';
import { formatDistanceToNow } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { postComment } from '@/app/voice/action';

const ADJECTIVES = ["Green", "Swift", "Silent", "Eco", "Bright", "Brave"];
const NOUNS = ["Owl", "Leaf", "Fox", "River", "Seed", "Mountain"];
const COLORS = ["bg-blue-500", "bg-emerald-500", "bg-violet-500", "bg-amber-500", "bg-rose-500", "bg-cyan-500"];

export function getOrCreateUser() {
  if (typeof window === 'undefined') return { name: "Guest", id: "0" };

  let name = localStorage.getItem('ayaung_user_name');
  let id = localStorage.getItem('ayaung_user_id');

  if (!name || !id) {
    const randomName = `${ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)]} ${NOUNS[Math.floor(Math.random() * NOUNS.length)]}`;
    const randomId = Math.random().toString(36).substring(7);
    
    localStorage.setItem('ayaung_user_name', randomName);
    localStorage.setItem('ayaung_user_id', randomId);
    
    return { name: randomName, id: randomId };
  }

  return { name, id };
}

export default function ThreadClientUI({ initialThread }: { initialThread: any }) {


  const [thread, setThread] = useState(initialThread);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  // Helper to get or create a local identity
  const getIdentity = () => {
    if (typeof window === 'undefined') return { name: 'Student', id: 'guest' };
    
    // Inside your helper functions
let name = localStorage.getItem('ayaung_user_name') || 'အမည်မဖော်လိုသူ';
    let id = localStorage.getItem('ayaung_id') || `guest_${Math.random().toString(36).substring(7)}`;
    
    // Save it so it's consistent
    localStorage.setItem('ayaung_name', name);
    localStorage.setItem('ayaung_id', id);
    
    return { name, id };
  };

 // Inside ThreadClientUI component
const [showNameModal, setShowNameModal] = useState(false);
const [tempName, setTempName] = useState('');

// Updated Submit Logic
const handleSubmitComment = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!newComment.trim() || isSubmitting) return;

  // 1. Check if they have a name yet
  const savedName = localStorage.getItem('ayaung_user_name');
  if (!savedName) {
    setShowNameModal(true); // Open the popup if no name exists
    return;
  }

  // 2. If they HAVE a name, proceed to post
  processPost(savedName);
};

// 3. The actual posting logic moved to a separate function
const processPost = async (userName: string) => {
  setIsSubmitting(true);
  
  // Get ID (create one if it doesn't exist)
  let userId = localStorage.getItem('ayaung_user_id') || Math.random().toString(36).substring(7);
  localStorage.setItem('ayaung_user_id', userId);

  const formData = new FormData();
  formData.append('content', newComment);
  formData.append('topicId', thread.id);
  formData.append('author', userName);
  formData.append('authorId', userId);

  const result = await postComment(formData);
  if (!result?.error) {
    setNewComment('');
    window.location.reload();
  } else {
    setIsSubmitting(false);
  }
};

// 4. Handle Saving Name from Modal
const handleSaveName = () => {
  if (tempName.trim()) {
    localStorage.setItem('ayaung_user_name', tempName.trim());
    setShowNameModal(false);
    processPost(tempName.trim()); // Post the comment immediately after saving name
  }
};

  return (
    <main className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6">
          <Link href="/voice">
            <button className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
              <ArrowLeft className="h-4 w-4" /> နောက်သို့ ပြန်သွားရန်
            </button>
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
        {/* Topic Content */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-border bg-card p-5 sm:p-6 mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-3">{thread.title}</h1>
          <div className="flex flex-wrap items-center gap-2 mb-4">
             <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${getColorForUser(thread.authorId)}`}>
               {thread.authorName}
             </span>
             <span className="text-sm text-muted-foreground">
               {formatDistanceToNow(thread.timestamp, { addSuffix: true })}
             </span>
          </div>
          <p className="text-base text-foreground leading-relaxed">{thread.content}</p>
        </motion.div>

        {/* Comments Section */}
        <div className="space-y-4 mb-12">
          <h2 className="text-xl font-bold text-foreground">
            {thread.comments.length} {thread.comments.length === 1 ? 'Reply' : 'Replies'}
          </h2>

          {thread.comments.map((comment: any) => (
  <motion.div key={comment.id} className="ml-8 sm:ml-12">
    <div className="flex items-start gap-3 mb-4">
      {/* THE COLORFUL AVATAR */}
      <div className={`mt-1 h-8 w-8 rounded-full flex items-center justify-center text-white font-bold shadow-sm ${getColorForUser(comment.author_id)}`}>
        {comment.author?.charAt(0) || 'A'}
      </div>

      <div className="flex-1 rounded-2xl border border-border bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-bold text-foreground">
            {comment.author}
          </span>
          <span className="text-[10px] text-muted-foreground">
            {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
          </span>
        </div>
        <p className="text-sm text-foreground/90">{comment.content}</p>
      </div>
    </div>
  </motion.div>
))}
        </div>

        {/* --- ADDED BACK: THE REPLY FORM --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="sticky bottom-4 bg-card p-4 rounded-2xl border border-border shadow-lg"
        >
          <form onSubmit={handleSubmitComment} className="space-y-3">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="မိတ်ဆွေရဲ့ ထင်မြင်ချက်ကို ရေးပေးပါ..."
              className="w-full rounded-xl border border-border bg-input px-4 py-3 text-foreground resize-none min-h-[60px] focus:ring-1 focus:ring-accent outline-none"
            />
            <button
              type="submit"
              disabled={!newComment.trim() || isSubmitting}
              className="w-full rounded-lg bg-accent py-2.5 font-bold text-accent-foreground hover:bg-accent/90 disabled:opacity-50 transition-all"
            >
              {isSubmitting ? 'Posting...' : 'Reply တင်မယ်'}
            </button>
          </form>
        </motion.div>
      </div>
   {/* IDENTITY MODAL */}
{showNameModal && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-card border border-border p-6 rounded-2xl shadow-2xl max-w-sm w-full"
    >
      <h3 className="text-xl font-bold mb-2 text-foreground">Yes drop your idea 👋</h3>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        မိတ်ဆွေကို ဘယ်လိုခေါ်ရမလဲ? မိတ်ဆွေရဲ့ နာမည်က comment တွေဘေးမှာ ပေါ်နေမှာပါ။
      </p>
      
      <input 
        autoFocus
        type="text"
        placeholder="ဥပမာ - Mg Mg, လေလွင့်လူသား..."
        value={tempName}
        onChange={(e) => setTempName(e.target.value)}
        className="w-full p-3 rounded-xl border border-border bg-input mb-4 outline-none focus:ring-2 focus:ring-accent text-sm"
        onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
      />
      
      <button 
        onClick={handleSaveName}
        disabled={!tempName.trim()}
        className="w-full bg-accent text-accent-foreground font-bold py-3 rounded-xl hover:bg-accent/90 disabled:opacity-50 transition-all text-sm"
      >
        နာမည်မှတ်ပြီး post တင်မယ်
      </button>
    </motion.div>
  </div>
)}
    </main>
  );
}