export interface StyleQuestion {
  id: number;
  text: string;
  answers: Answer[];
}

export interface Answer {
  text: string;
  v: number; // Visual
  a: number; // Auditory
  r: number; // Reading/Writing
  k: number; // Kinesthetic
}

export interface QuizResult {
  v: number;
  a: number;
  r: number;
  k: number;
  totalScore: number;
}

export const learningstyles: StyleQuestion[] = [
  {
    id: 1,
    text: "သင်ခန်းစာအသစ်တစ်ခုကို လေ့လာတဲ့အခါ ဘယ်နည်းလမ်းကို အကြိုက်ဆုံးလဲ?",
    answers: [
      { text: "ရုပ်ပုံတွေ၊ ဗီဒီယိုတွေနဲ့ Diagram တွေ ကြည့်ရတာ", v: 3, a: 0, r: 0, k: 0 },
      { text: "ဆရာရှင်းပြတာကို နားထောင်တာ ဒါမှမဟုတ် သူငယ်ချင်းနဲ့ ဆွေးနွေးတာ", v: 0, a: 3, r: 0, k: 0 },
      { text: "စာအုပ်ဖတ်တာ ဒါမှမဟုတ် မှတ်စုပြန်ရေးတာ", v: 0, a: 0, r: 3, k: 0 },
      { text: "ကိုယ်တိုင် လက်တွေ့စမ်းသပ်လုပ်ဆောင်ကြည့်တာ", v: 0, a: 0, r: 0, k: 3 },
    ],
  },
  {
    id: 2,
    text: "လမ်းညွှန်ချက်တစ်ခုကို ဘယ်လိုမျိုး ပိုနားလည်လွယ်သလဲ?",
    answers: [
      { text: "မြေပုံ ဒါမှမဟုတ် ပုံကြမ်းနဲ့ ပြထားရင်", v: 3, a: 0, r: 0, k: 1 },
      { text: "တစ်ယောက်ယောက်က အသံနဲ့ ပြောပြရင်", v: 0, a: 3, r: 0, k: 0 },
      { text: "စာနဲ့ အသေးစိတ် ရေးသားဖော်ပြထားရင်", v: 0, a: 0, r: 3, k: 0 },
      { text: "ကိုယ်တိုင် အရင်လျှောက်လုပ်ကြည့်ရင်း သင်ယူရင်", v: 0, a: 0, r: 0, k: 3 },
    ],
  },
  // Add more questions following this 4-way scoring pattern...
];

export function getResultMessage(v: number, a: number, r: number, k: number) {
  const scores = [
    { type: "Visual", score: v, title: "👁️ အမြင်အာရုံသုံး သင်ယူသူ (Visual Learner)", desc: "သင်ဟာ ရုပ်ပုံတွေ၊ အရောင်တွေနဲ့ Diagram တွေကို ကြည့်ပြီး အကောင်းဆုံး သင်ယူနိုင်သူပါ။ စာဖတ်တာထက် Mind Map ဆွဲတာက သင့်အတွက် ပိုထိရောက်ပါတယ်။" },
    { type: "Auditory", score: a, title: "🎧 အကြားအာရုံသုံး သင်ယူသူ (Auditory Learner)", desc: "သင်ဟာ နားထောင်ခြင်းနဲ့ ပြောဆိုခြင်းကနေ အသိပညာ ရယူရတာ ကြိုက်သူပါ။ Podcast နားထောင်တာ ဒါမှမဟုတ် သူငယ်ချင်းကို ပြန်ရှင်းပြတာမျိုး လုပ်သင့်ပါတယ်။" },
    { type: "Reading", score: r, title: "📖 စာဖတ်/စာရေး သင်ယူသူ (Read/Write Learner)", desc: "သင်ဟာ စာသားတွေကို ချရေးတာ၊ စာရင်းပြုစုတာနဲ့ စာဖတ်တာကို အားသန်သူပါ။ မှတ်စုအသေးစိတ် ထုတ်တာက သင့်အတွက် အကောင်းဆုံးပါပဲ။" },
    { type: "Kinesthetic", score: k, title: "🏃 လက်တွေ့လုပ်ဆောင် သင်ယူသူ (Kinesthetic Learner)", desc: "သင်ဟာ ငြိမ်ငြိမ်ထိုင်နေရတာထက် ကိုယ်တိုင် လက်တွေ့ ကိုင်တွယ်လုပ်ဆောင်ရတာကို နှစ်သက်သူပါ။ လေ့ကျင့်ခန်းတွေ အများကြီး လုပ်ကြည့်ဖို့ လိုပါတယ်။" }
  ];

  // Sort to find the dominant style
  const dominant = [...scores].sort((a, b) => b.score - a.score)[0];

  return {
    title: dominant.title,
    description: dominant.desc,
    advice: "သင့်ရဲ့ အားသန်တဲ့ နည်းလမ်းကို သုံးပြီး လေ့လာရင် အချိန်ကုန်သက်သာပြီး ပိုမှတ်မိစေမှာပါ။"
  };
}