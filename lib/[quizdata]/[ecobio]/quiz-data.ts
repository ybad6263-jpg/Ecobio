
export interface Question {
  id: number;
  text: string;
  answers: Answer[];
}

export interface Answer {
  text: string;
  biology: number;
  economics: number;
}

export interface QuizResult {
  biology: number;
  economics: number;
  totalScore: number;
}


export const quizQuestions: Question[] = [
  {
    id: 1,
    text: "အနာဂတ်မှာ ဘယ်လိုအလုပ်မျိုးနဲ့ လန်းချင်တာလဲ?", // What attracts you most in your career?
    answers: [
      { text: "သဘာဝတရားနဲ့ သက်ရှိတွေအကြောင်း လေ့လာရတာမျိုး", biology: 3, economics: 0 },
      { text: "ကိုယ်ပိုင်စီးပွားရေးနဲ့ ချမ်းသာကြွယ်ဝဖို့ ကြိုးစားရတာမျိုး", biology: 0, economics: 3 },
      { text: "နှစ်ခုလုံးကို စိတ်ဝင်စားတယ်", biology: 2, economics: 2 },
    ],
  },
  {
    id: 2,
    text: "ပြဿနာတစ်ခုခုကြုံလာရင် ဘယ်လိုမြင်တတ်လဲ?", // How do you view complex problems?
    answers: [
      { text: "သဘာဝတရားရဲ့ အချိတ်အဆက်တစ်ခုလိုပဲ မြင်တယ်", biology: 3, economics: 1 },
      { text: "အရှုံးအမြတ်နဲ့ အကောင်းဆုံးဖြစ်အောင် တွက်ချက်ရမယ့် စိန်ခေါ်မှုလို့ မြင်တယ်", biology: 1, economics: 3 },
      { text: "ရှုထောင့်ပေါင်းစုံကနေ ကြည့်တတ်တယ်", biology: 2, economics: 2 },
    ],
  },
  {
    id: 3,
    text: "မင်းကို အတက်ကြွဆုံးဖြစ်စေတဲ့အရာက ဘာလဲ?", // What motivates you most?
    answers: [
      { text: "သဘာဝပတ်ဝန်းကျင်နဲ့ ဂေဟစနစ်ကို ကာကွယ်ရတာမျိုး", biology: 3, economics: 0 },
      { text: "စီးပွားရေးတန်ဖိုးသစ်တွေနဲ့ Innovation တွေ ဖန်တီးရတာမျိုး", biology: 0, economics: 3 },
      { text: "အားလုံးအတွက် ရေရှည်ကောင်းမွန်မယ့် တိုးတက်မှုမျိုး", biology: 2, economics: 2 },
    ],
  },
  {
    id: 4,
    text: "မင်းအကြိုက်ဆုံး အလုပ်ခွင် ပတ်ဝန်းကျင်က ဘယ်လိုမျိုးလဲ?", // Your ideal work environment involves
    answers: [
      { text: "ဓာတ်ခွဲခန်းထဲမှာ ဒါမှမဟုတ် အပြင်ကွင်းဆင်း သုတေသနလုပ်ရတာမျိုး", biology: 3, economics: 0 },
      { text: "Data တွေကြည့်ပြီး Strategy (ဗျူဟာ) ချရတာမျိုး", biology: 0, economics: 3 },
      { text: "အဖွဲ့အစည်းနဲ့ တိုင်ပင်ပြီး ပြဿနာဖြေရှင်းရတာမျိုး", biology: 2, economics: 2 },
    ],
  },
  {
    id: 5,
    text: "အနာဂတ်အတွက် ဘာကို အစိုးရိမ်ဆုံးလဲ?", // What concerns you most about the future?
    answers: [
      { text: "ရာသီဥတုဖောက်ပြန်တာနဲ့ သဘာဝတရားတွေ ပျက်စီးကုန်မှာ", biology: 3, economics: 1 },
      { text: "စီးပွားရေးမညီမျှတာနဲ့ အရင်းအမြစ်တွေ ရှားပါးလာမှာ", biology: 1, economics: 3 },
      { text: "နှစ်ခုလုံးက အရေးကြီးတယ်လို့ ထင်တယ်", biology: 2, economics: 2 },
    ],
  },
  {
    id: 6,
    text: "Team ထဲမှာဆိုရင် မင်းက ဘယ်လိုလူစားမျိုးလဲ?", // In a team, you naturally become the person who
    answers: [
      { text: "အချက်အလက်တွေကို သေချာရှာဖွေပြီး အတည်ပြုပေးတဲ့သူ", biology: 3, economics: 1 },
      { text: "ငွေကြေးနဲ့ အရင်းအမြစ်တွေကို သေချာတွက်ချက် စီမံတဲ့သူ", biology: 0, economics: 3 },
      { text: "မတူညီတဲ့ အမြင်တွေကို ပေါင်းစပ်ညှိနှိုင်းပေးတဲ့သူ", biology: 2, economics: 2 },
    ],
  },
  {
    id: 7,
    text: "Weekend (ပိတ်ရက်) မှာ ဘာလုပ်ရတာ အပျော်ဆုံးလဲ?", // Your ideal way to spend a weekend
    answers: [
      { text: "သဘာဝတရားထဲမှာ အနားယူတာ ဒါမှမဟုတ် ဗဟုသုတအသစ်တွေ ဖတ်တာ", biology: 3, economics: 0 },
      { text: "စီးပွားရေးသတင်းတွေနဲ့ လုပ်ငန်းရှင်တွေအကြောင်း ဖတ်တာ", biology: 0, economics: 3 },
      { text: "အသစ်အဆန်းတစ်ခုခုကို လေ့လာလိုက်စားတာ", biology: 2, economics: 2 },
    ],
  },
  {
    id: 8,
    text: "နည်းပညာ (Technology) က ဘယ်နေရာမှာ အသုံးအဝင်ဆုံးလို့ ထင်လဲ?", // What role do you see for technology?
    answers: [
      { text: "သဘာဝတရားကို နားလည်ဖို့နဲ့ ထိန်းသိမ်းဖို့", biology: 3, economics: 1 },
      { text: "စီးပွားရေး ပိုမိုမြန်ဆန်တိုးတက်လာဖို့", biology: 1, economics: 3 },
      { text: "ကမ္ဘာကြီးရဲ့ အခက်အခဲတွေကို ရေရှည်ဖြေရှင်းပေးဖို့", biology: 2, economics: 2 },
    ],
  },
  {
    id: 9,
    text: "အမှားတစ်ခုခုကြုံရင် ဘယ်လို တုံ့ပြန်တတ်လဲ?", // When facing failure, you typically
    answers: [
      { text: "ဘာကြောင့်မှားသွားလဲဆိုတာကို သိပ္ပံနည်းကျ ပြန်ဆန်းစစ်တယ်", biology: 3, economics: 1 },
      { text: "ဘယ်လောက်ထိခိုက်သွားလဲ တွက်ချက်ပြီး ပြန်ထူထောင်ဖို့ ပြင်တယ်", biology: 1, economics: 3 },
      { text: "အမှားကနေ သင်ခန်းစာယူပြီး ပိုကောင်းအောင် ပြင်ဆင်တယ်", biology: 2, economics: 2 },
    ],
  },
  {
    id: 10,
    text: "မင်းရဲ့ ရည်မှန်းချက်က ဘာဖြစ်မလဲ?", // Your long-term vision is to
    answers: [
      { text: "သိပ္ပံပညာနဲ့ သဘာဝလောကကြီးကို ပိုကောင်းအောင်လုပ်ဖို့", biology: 3, economics: 0 },
      { text: "လူမှုပတ်ဝန်းကျင်ကို အကျိုးပြုမယ့် စီးပွားရေးတစ်ခု တည်ထောင်ဖို့", biology: 0, economics: 3 },
      { text: "အားလုံးအတွက် ကောင်းမွန်တဲ့ အနာဂတ်တစ်ခု ဖန်တီးပေးဖို့", biology: 2, economics: 2 },
    ],
  },
];
export function getResultMessage(biology: number, economics: number) {
  const total = biology + economics;
  if (total === 0) return { 
    title: "စလိုက်ကြရအောင်!", 
    description: "မင်းရဲ့ ဝါသနာက ဘယ်လမ်းကြောင်းလဲဆိုတာ သိရဖို့ Quiz လေး အရင်ဖြေကြည့်လိုက်ပါဦး။" 
  };

  const biologyPercent = (biology / total) * 100;
  const economicsPercent = (economics / total) * 100;

  // Bio-heavy (The Biologist)
  if (biologyPercent > 65) {
    return {
      title: "🧬 သဘာဝရဲ့ လက်ထောက် (The Biologist)",
      description: "မင်းက သက်ရှိလောကနဲ့ သဘာဝတရားကို စူးစမ်းရတာ ဝါသနာပါတဲ့သူပဲ။ ဆရာဝန်၊ ပတ်ဝန်းကျင်ထိန်းသိမ်းရေးသမား ဒါမှမဟုတ် မျိုးရိုးဗီဇပညာရှင် အစရှိတဲ့ လမ်းကြောင်းတွေက မင်းအတွက် အလန်းဆုံးပဲ။",
    };
  }

  // Eco-heavy (The Economist)
  if (economicsPercent > 65) {
    return {
      title: "💼 စီးပွားရေး ပါရမီရှင် (The Economist)",
      description: "စနစ်တွေကို ခွဲခြမ်းစိတ်ဖြာပြီး တန်ဖိုးအသစ်တွေ ဖန်တီးရတာကို မင်းက တကယ်ပိုင်နိုင်တာပဲ။ စီးပွားရေးလုပ်ငန်းရှင်၊ ဘဏ္ဍာရေးကျွမ်းကျင်သူ ဒါမှမဟုတ် Strategy ချရတဲ့ အလုပ်တွေမှာ မင်းနေရာရမှာ သေချာတယ်။",
    };
  }

  // Balanced (The Integrator)
  if (Math.abs(biologyPercent - economicsPercent) < 15) {
    return {
      title: "🌱 လောကအလှဖန်တီးရှင် (The Integrator)",
      description: "သဘာဝတရားနဲ့ စီးပွားရေးကြားက ဆက်နွှယ်မှုကို မင်းက ကောင်းကောင်းမြင်တတ်တယ်။ Sustainable Business (ရေရှည်တည်တံ့တဲ့ စီးပွားရေး) ဒါမှမဟုတ် Biotech လိုမျိုး နယ်ပယ်တွေက မင်းနဲ့ အကိုက်ညီဆုံးပဲ။",
    };
  }

  // Leaning Bio (The Applied Scientist)
  if (biologyPercent > economicsPercent) {
    return {
      title: "🔬 လက်တွေ့သမား သိပ္ပံပညာရှင် (The Applied Scientist)",
      description: "သိပ္ပံပညာကို လက်တွေ့ကျကျ စဉ်းစားတွေးခေါ်တတ်တဲ့သူပါ။ စိုက်ပျိုးရေးသိပ္ပံ၊ ပတ်ဝန်းကျင်ဆိုင်ရာ အကြံပေး ဒါမှမဟုတ် သိပ္ပံသတင်းပြန်ကြားရေးသမားအဖြစ် အောင်မြင်နိုင်တယ်။",
    };
  }

  // Leaning Eco (The Strategic Thinker)
  return {
    title: "📊 နည်းဗျူဟာဆရာကြီး (The Strategic Thinker)",
    description: "Data တွေနဲ့ စနစ်တွေကို ကောင်းကောင်းနားလည်တဲ့သူပဲ။ Business Analytics၊ စီးပွားရေးမူဝါဒ ချမှတ်သူ ဒါမှမဟုတ် ရေရှည်ဖွံ့ဖြိုးတိုးတက်ရေး လုပ်ငန်းတွေမှာ မင်းရဲ့အရည်အချင်းကို ထုတ်ပြလိုက်ပါ။",
  };
}