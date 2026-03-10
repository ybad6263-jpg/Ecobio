// localStorage data management for Student Voice
// No backend needed - everything stored locally!

export interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  timestamp: number;
  replyTo?: string;
}

export interface Thread {
  id: string;
  title: string;
  category: string;
  content: string;
  authorId: string;
  authorName: string;
  timestamp: number;
  comments: Comment[];
}

const STORAGE_KEY = 'student-voice-threads';
const USER_ID_KEY = 'student-voice-user-id';

// Get or create unique student ID
export function getStudentId(): string {
  if (typeof window === 'undefined') return '';
  
  let id = localStorage.getItem(USER_ID_KEY);
  if (!id) {
    const num = Math.floor(Math.random() * 9000) + 1000;
    id = `Student_${num}`;
    localStorage.setItem(USER_ID_KEY, id);
  }
  return id;
}

// Generate unique author names
const ANIMAL_NAMES = [
  'Anonymous Mouse', 'Quick Deer', 'Curious Owl', 'Brave Falcon',
  'Smart Dolphin', 'Wise Turtle', 'Swift Hare', 'Clever Fox',
  'Gentle Panda', 'Keen Eagle', 'Playful Otter', 'Silent Cat'
];

export function generateAnonymousName(userId: string): string {
  // Fallback if userId is missing
  if (!userId) return 'Anonymous Student';
  const hash = userId.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  return ANIMAL_NAMES[hash % ANIMAL_NAMES.length];
}

// Color mapping for unique visual identity
const COLORS = [
  'bg-teal-100 text-teal-700',
  'bg-blue-100 text-blue-700',
  'bg-cyan-100 text-cyan-700',
  'bg-emerald-100 text-emerald-700',
  'bg-sky-100 text-sky-700',
  'bg-indigo-100 text-indigo-700',
];

export function getColorForUser(userId: string): string {
  // Fallback if userId is missing
  if (!userId) return COLORS[0];
  const hash = userId.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  return COLORS[hash % COLORS.length];
}

// Get all threads
export function getThreads(): Thread[] {
  if (typeof window === 'undefined') return [];
  
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// Save threads
function saveThreads(threads: Thread[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(threads));
}

// Create new thread
// 1. Updated Create Thread - Now accepts custom name and ID
export function createThread(
  title: string, 
  category: string, 
  content: string, 
  customName?: string, // 👈 New
  customId?: string    // 👈 New
): Thread {
  // Use the custom ID if provided, otherwise get the local student ID
  const studentId = customId || getStudentId();
  
  const thread: Thread = {
    id: Date.now().toString(),
    title,
    category,
    content,
    authorId: studentId,
    // Use the custom name if they typed one in the modal!
    authorName: customName || generateAnonymousName(studentId),
    timestamp: Date.now(),
    comments: [],
  };
  
  const threads = getThreads();
  threads.unshift(thread);
  saveThreads(threads);
  
  return thread;
}

// 2. Updated Add Comment - Now accepts custom name and ID
export function addCommentToThread(
  threadId: string, 
  content: string, 
  customName?: string, // 👈 New
  customId?: string    // 👈 New
): Comment {
  const studentId = customId || getStudentId();
  
  const comment: Comment = {
    id: Date.now().toString(),
    authorId: studentId,
    authorName: customName || generateAnonymousName(studentId),
    content,
    timestamp: Date.now(),
  };
  
  const threads = getThreads();
  const thread = threads.find(t => t.id === threadId);
  
  if (thread) {
    thread.comments.push(comment);
    saveThreads(threads);
  }
  
  return comment;
}

// Get single thread
export function getThread(id: string): Thread | undefined {
  const threads = getThreads();
  return threads.find(t => t.id === id);
}

// Seed data for first load
export function seedInitialData(): void {
  if (typeof window === 'undefined') return;
  
  const existing = localStorage.getItem(STORAGE_KEY);
  if (existing) return; // Already seeded
  
  const seedThreads: Thread[] = [
    {
      id: '1',
      title: 'Is it true that Bio students have more homework?',
      category: '#Biology',
      content: 'I heard that Biology stream has a lot more work. Is this true? How do you manage the workload?',
      authorId: 'Student_4521',
      authorName: 'Curious Owl',
      timestamp: Date.now() - 1000 * 60 * 60 * 2,
      comments: [
        {
          id: '1-1',
          authorId: 'Student_7834',
          authorName: 'Brave Falcon',
          content: 'From my experience, yes. But it depends on your teacher and school. The practicals are what take time.',
          timestamp: Date.now() - 1000 * 60 * 60 * 1.5,
        },
        {
          id: '1-2',
          authorId: 'Student_2156',
          authorName: 'Wise Turtle',
          content: 'I find Economics easier to manage. Biology requires consistent study throughout the year.',
          timestamp: Date.now() - 1000 * 60 * 60,
        },
      ],
    },
    {
      id: '2',
      title: 'Which IGCSE center in Mandalay is best for Economics?',
      category: '#Economics',
      content: 'Looking to choose a school for my IGCSE. What are your experiences with different centers in Mandalay?',
      authorId: 'Student_5432',
      authorName: 'Smart Dolphin',
      timestamp: Date.now() - 1000 * 60 * 60 * 4,
      comments: [
        {
          id: '2-1',
          authorId: 'Student_9012',
          authorName: 'Clever Fox',
          content: 'Depends on what subjects you want to take. Some schools are better at certain subjects.',
          timestamp: Date.now() - 1000 * 60 * 60 * 3,
        },
      ],
    },
    {
      id: '3',
      title: 'Tips for passing IGCSE Physics?',
      category: '#Physics',
      content: 'Any tips or resources that helped you succeed in Physics? Planning my study schedule now.',
      authorId: 'Student_8765',
      authorName: 'Quick Deer',
      timestamp: Date.now() - 1000 * 60 * 60 * 6,
      comments: [],
    },
    {
      id: '4',
      title: 'How do you balance extracurricular activities with studies?',
      category: '#University',
      content: 'I want to join sports but worried about academics. How do successful students balance both?',
      authorId: 'Student_3210',
      authorName: 'Playful Otter',
      timestamp: Date.now() - 1000 * 60 * 60 * 8,
      comments: [
        {
          id: '4-1',
          authorId: 'Student_6543',
          authorName: 'Keen Eagle',
          content: 'Time management is key. Make a schedule and stick to it. Your health matters more than grades.',
          timestamp: Date.now() - 1000 * 60 * 60 * 7,
        },
      ],
    },
    {
      id: '5',
      title: 'Are online classes effective for exam prep?',
      category: '#University',
      content: 'Considering online courses to supplement my studies. Are they worth it?',
      authorId: 'Student_4567',
      authorName: 'Gentle Panda',
      timestamp: Date.now() - 1000 * 60 * 60 * 10,
      comments: [],
    },
  ];
  
  saveThreads(seedThreads);
}
