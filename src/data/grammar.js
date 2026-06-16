// JLPT N5 Grammar - All lessons with Burmese explanations

export const grammar = [
  // ==================== LESSON 1 ====================
  {
    id: 1, lesson: 1,
    pattern: "〜は〜です",
    burmese_meaning: "...သည် ...ဖြစ်သည် (ရိုသေသောပြောဆိုမှု)",
    structure: "[Subject] は [Noun] です",
    example_jp: "わたしは学生です。",
    example_mm: "ကျွန်တော်/ကျွန်မသည် ကျောင်းသားဖြစ်သည်。",
    notes_mm: "は သည် topic marker (ဝါကျ၏ ခေါင်းစဉ် marker) ဖြစ်သည်။ です သည် ရိုသေသော 'ဖြစ်သည်' ဖြစ်သည်။"
  },
  {
    id: 2, lesson: 1,
    pattern: "〜は〜ではありません",
    burmese_meaning: "...သည် ...မဟုတ်ပါ (ငြင်းပယ်ချက်)",
    structure: "[Subject] は [Noun] ではありません",
    example_jp: "わたしは先生ではありません。",
    example_mm: "ကျွန်တော်/ကျွန်မသည် ဆရာ/ဆရာမ မဟုတ်ပါ。",
    notes_mm: "ではありません သည် です ၏ ငြင်းပယ်ပုံစံဖြစ်သည်။ ပိုရင်းနှီးသောပြောဆိုမှုတွင် じゃないです ကိုသုံးနိုင်သည်။"
  },
  {
    id: 3, lesson: 1,
    pattern: "〜は〜ですか",
    burmese_meaning: "...သည် ...ဖြစ်သလား? (မေးခြင်း)",
    structure: "[Subject] は [Noun] ですか",
    example_jp: "あなたは学生ですか。",
    example_mm: "သင်သည် ကျောင်းသားဖြစ်သလား?",
    notes_mm: "ဂျပန်ဘာသာတွင် か ကို ဝါကျနောက်တွင် ထည့်ခြင်းဖြင့် မေးခွန်းဖြစ်လာသည်။ အသံမမြင့်ရပါ။"
  },
  {
    id: 4, lesson: 1,
    pattern: "〜の〜",
    burmese_meaning: "...၏... (ပိုင်ဆိုင်မှုပြ)",
    structure: "[Noun1] の [Noun2]",
    example_jp: "これはわたしの本です。",
    example_mm: "ဒါ ကျွန်တော်/ကျွန်မ၏ စာအုပ်ဖြစ်သည်。",
    notes_mm: "の သည် ပိုင်ဆိုင်မှုပြ particle ဖြစ်သည်။ 'X の Y' ဆိုသည်မှာ 'X ၏ Y' ဖြစ်သည်။"
  },

  // ==================== LESSON 2 ====================
  {
    id: 5, lesson: 2,
    pattern: "これ／それ／あれ は 〜です",
    burmese_meaning: "ဒါ/ဟိုဟာ...ဖြစ်သည် (ပစ္စည်းညွှန်ပြ)",
    structure: "これ/それ/あれ は [Noun] です",
    example_jp: "これは本です。",
    example_mm: "ဒါ စာအုပ်ဖြစ်သည်。",
    notes_mm: "これ = ဒါ (ပြောသူနားတွင်), それ = ဟိုဟာ (နားထောင်သူနားတွင်), あれ = ဟိုဟာ (နှစ်ဦးစလုံးနှင့် ဝေးသော)"
  },
  {
    id: 6, lesson: 2,
    pattern: "〜の (ပိုင်ဆိုင်မှုပြ pronoun)",
    burmese_meaning: "...၏ဟာ (ပိုင်ဆိုင်မှုပြ)",
    structure: "[Person] の",
    example_jp: "これはわたしのです。",
    example_mm: "ဒါ ကျွန်တော်/ကျွန်မ၏ ဖြစ်သည်。",
    notes_mm: "နာမ်ကို ထပ်မံမဖော်ပြဘဲ の ကိုတစ်ခုတည်းသုံးနိုင်သည်。"
  },

  // ==================== LESSON 3 ====================
  {
    id: 7, lesson: 3,
    pattern: "〜に〜があります/います",
    burmese_meaning: "...တွင် ...ရှိသည်",
    structure: "[Place] に [Subject] が あります/います",
    example_jp: "机の上に本があります。",
    example_mm: "စားပွဲပေါ်တွင် စာအုပ်ရှိသည်。",
    notes_mm: "あります = ပစ္စည်း/အရာများအတွက်, います = လူ/တိရစ္ဆာန်များအတွက်"
  },
  {
    id: 8, lesson: 3,
    pattern: "〜はどこですか",
    burmese_meaning: "...သည် ဘယ်မှာလဲ?",
    structure: "[Subject] は どこ ですか",
    example_jp: "トイレはどこですか。",
    example_mm: "အိမ်သာ ဘယ်မှာလဲ?",
    notes_mm: "どこ သည် 'ဘယ်နေရာ' ဟုအဓိပ္ပါယ်ရသည်。"
  },

  // ==================== LESSON 4 ====================
  {
    id: 9, lesson: 4,
    pattern: "今〜時〜分です",
    burmese_meaning: "အခု ...နာရီ ...မိနစ်ဖြစ်သည်",
    structure: "今 [Number]時 [Number]分 です",
    example_jp: "今、3時15分です。",
    example_mm: "အခု 3 နာရီ 15 မိနစ်ဖြစ်သည်。",
    notes_mm: "時 = နာရီ, 分 = မိနစ်。 30分 = はん ဟု ခေါ်နိုင်သည်。"
  },
  {
    id: 10, lesson: 4,
    pattern: "〜から〜まで",
    burmese_meaning: "...မှ ...အထိ (အချိန်/နေရာ)",
    structure: "[Start] から [End] まで",
    example_jp: "9時から5時まで働きます。",
    example_mm: "9 နာရီမှ 5 နာရီအထိ အလုပ်လုပ်သည်。",
    notes_mm: "から = မှ/ကစ၍, まで = အထိ。 နှစ်ခုသုံးခြင်း မဖြစ်မနေမဟုတ်ပါ。"
  },

  // ==================== LESSON 5 ====================
  {
    id: 11, lesson: 5,
    pattern: "〜へ行きます/来ます/帰ります",
    burmese_meaning: "...သို့ သွားသည်/လာသည်/ပြန်သည်",
    structure: "[Place] へ 行きます/来ます/帰ります",
    example_jp: "学校へ行きます。",
    example_mm: "ကျောင်းသို့ သွားသည်。",
    notes_mm: "へ သည် ဦးတည်ရာ particle ဖြစ်သည်。ဤနေရာတွင် に နှင့် လဲလှယ်သုံးနိုင်သည်。"
  },
  {
    id: 12, lesson: 5,
    pattern: "〜で行きます",
    burmese_meaning: "...ဖြင့် သွားသည် (ယာဉ်ပြ)",
    structure: "[Transport] で 行きます",
    example_jp: "電車で行きます。",
    example_mm: "ရထားဖြင့် သွားသည်。",
    notes_mm: "で သည် နည်းလမ်း/ကိရိယာပြ particle ဖြစ်သည်。"
  },
  {
    id: 13, lesson: 5,
    pattern: "だれと〜ますか",
    burmese_meaning: "ဘယ်သူနဲ့ ...သလဲ?",
    structure: "だれと [Verb] ますか",
    example_jp: "だれと行きますか。",
    example_mm: "ဘယ်သူနဲ့ သွားသလဲ?",
    notes_mm: "と = ...နှင့်(အတူ), だれ = ဘယ်သူ"
  },

  // ==================== LESSON 6 ====================
  {
    id: 14, lesson: 6,
    pattern: "〜を〜ます",
    burmese_meaning: "...ကို ...သည် (object marker)",
    structure: "[Object] を [Verb] ます",
    example_jp: "ごはんを食べます。",
    example_mm: "ထမင်းစားသည်。",
    notes_mm: "を သည် object marker ဖြစ်သည်။ verb ၏ object (ဝဋ်) ကိုပြသည်。"
  },
  {
    id: 15, lesson: 6,
    pattern: "〜に〜ます",
    burmese_meaning: "...တွင် ...သည် (နေရာ/အချိန်ပြ)",
    structure: "[Place/Time] に [Verb] ます",
    example_jp: "7時に起きます。",
    example_mm: "7 နာရီတွင် ထသည်。",
    notes_mm: "に သည် တိကျသောအချိန်/နေရာကိုညွှန်ပြသည်。ကြိယာ action လုပ်ရာနေရာ/အချိန်တွင်သုံးသည်。"
  },

  // ==================== LESSON 7 ====================
  {
    id: 16, lesson: 7,
    pattern: "〜に〜をあげます",
    burmese_meaning: "...ကို ...ပေးသည် (ကိုယ်ထက်နိမ့်သောသူကို)",
    structure: "[Person] に [Object] を あげます",
    example_jp: "友達にプレゼントをあげます。",
    example_mm: "သူငယ်ချင်းကို လက်ဆောင်ပေးသည်。",
    notes_mm: "あげる = ကိုယ်မှ တခြားသူကိုပေးသည်。ကိုယ်ထက်မြင့်သောသူကို差し上げる ကိုသုံးသည်။"
  },
  {
    id: 17, lesson: 7,
    pattern: "〜に〜をもらいます",
    burmese_meaning: "...ထံမှ ...ရသည်",
    structure: "[Person] に/から [Object] を もらいます",
    example_jp: "先生にプレゼントをもらいました。",
    example_mm: "ဆရာ/ဆရာမထံမှ လက်ဆောင်ရသည်。",
    notes_mm: "もらう = တခြားသူထံမှ ကိုယ်ကရသည်။"
  },

  // ==================== LESSON 8 ====================
  {
    id: 18, lesson: 8,
    pattern: "〜に〜があります",
    burmese_meaning: "...တွင် ...ရှိသည် (ပစ္စည်း)",
    structure: "[Place] に [Thing] が あります",
    example_jp: "テーブルの上に本があります。",
    example_mm: "စားပွဲပေါ်တွင် စာအုပ်ရှိသည်。",
    notes_mm: "ありますသည် ပစ္စည်း/အရာများ (ရွေ့လျားနိုင်ခြင်းရှိသော/မရှိသော) များအတွက်သုံးသည်。"
  },
  {
    id: 19, lesson: 8,
    pattern: "〜に〜がいます",
    burmese_meaning: "...တွင် ...ရှိသည် (လူ/တိရစ္ဆာန်)",
    structure: "[Place] に [Person/Animal] が います",
    example_jp: "公園に子供がいます。",
    example_mm: "ဥယျာဉ်တွင် ကလေးရှိသည်。",
    notes_mm: "います သည် လူ/တိရစ္ဆာန် (ရွေ့လျားနိုင်သောသတ္တဝါ) များအတွက်သုံးသည်。"
  },
  {
    id: 20, lesson: 8,
    pattern: "〜の[位置] に",
    burmese_meaning: "[ပစ္စည်း]၏ [နေရာ] တွင်",
    structure: "[Object] の 上/下/前/後ろ/右/左/中/外/隣 に",
    example_jp: "机の上に本があります。",
    example_mm: "စားပွဲ၏ပေါ်တွင် စာအုပ်ရှိသည်。",
    notes_mm: "上=အပေါ်, 下=အောက်, 前=ရှေ့, 後ろ=နောက်, 右=ညာ, 左=ဘယ်, 中=ထဲ, 外=ပြင်, 隣=ဘေး"
  },

  // ==================== LESSON 9 ====================
  {
    id: 21, lesson: 9,
    pattern: "〜が好きです/嫌いです",
    burmese_meaning: "...ကို ကြိုက်သည်/မကြိုက်ပါ",
    structure: "[Object] が 好きです/嫌いです",
    example_jp: "音楽が好きです。",
    example_mm: "တေးဂီတကို ကြိုက်သည်。",
    notes_mm: "好き/嫌い = na-adjectives ဖြစ်သည်。 とても好き = အရမ်းကြိုက်, 大嫌い = အရမ်းမကြိုက်"
  },
  {
    id: 22, lesson: 9,
    pattern: "〜が得意です/苦手です",
    burmese_meaning: "...မှာ ကျွမ်းကျင်သည်/ညံ့သည်",
    structure: "[Field] が 得意です/苦手です",
    example_jp: "日本語が得意です。",
    example_mm: "ဂျပန်ဘာသာမှာ ကျွမ်းကျင်သည်。",
    notes_mm: "得意 = ပါရမီရှိသောနယ်ပယ်, 苦手 = ညံ့သောနယ်ပယ် (好き/嫌い နှင့် ခြားနားသည်)"
  },

  // ==================== LESSON 10 ====================
  {
    id: 23, lesson: 10,
    pattern: "〜が〜あります/います",
    burmese_meaning: "...ရှိသည် (အရေအတွက်ဖြင့်)",
    structure: "[Subject] が [Number+Counter] あります/います",
    example_jp: "子供が3人います。",
    example_mm: "ကလေး 3 ယောက်ရှိသည်。",
    notes_mm: "နဂါးပြောင်ကိန်း (counter) ကိုနာမ်နောက်မှာသုံးသည်: 一本、二枚、三冊 ၊ etc."
  },
  {
    id: 24, lesson: 10,
    pattern: "〜をください",
    burmese_meaning: "...ကို ပေးပါ (တောင်းဆိုချက်)",
    structure: "[Object] を ください",
    example_jp: "みずをください。",
    example_mm: "ရေ ပေးပါ。",
    notes_mm: "ください သည် 'ပေးပါ' ဟုတောင်းဆိုရာတွင်သုံးသည်。"
  },

  // ==================== LESSON 11 ====================
  {
    id: 25, lesson: 11,
    pattern: "i-Adjective + です",
    burmese_meaning: "i-adjective (い-ဝိသေသနာ) ဖြင့် ဝါကျဖွဲ့ခြင်း",
    structure: "[i-Adj] です / [i-Adj] くないです",
    example_jp: "この映画はおもしろいです。この映画はおもしろくないです。",
    example_mm: "ဤရုပ်ရှင်သည် စိတ်ဝင်စားဖွယ်ကောင်းသည်。ဤရုပ်ရှင်သည် မစိတ်ဝင်စားဖွယ်ကောင်းပါ。",
    notes_mm: "い-adjective ကို ငြင်းပယ်ရန် い ကိုဖယ်ပြီး くない ထည့်သည်。 Past: かった/くなかった"
  },
  {
    id: 26, lesson: 11,
    pattern: "na-Adjective + です",
    burmese_meaning: "na-adjective (な-ဝိသေသနာ) ဖြင့် ဝါကျဖွဲ့ခြင်း",
    structure: "[na-Adj] です / [na-Adj] ではありません",
    example_jp: "この町はきれいです。この町はきれいではありません。",
    example_mm: "ဤမြို့သည် လှပသည်။ ဤမြို့သည် မလှပပါ。",
    notes_mm: "な-adjective ကို ငြင်းပယ်ရန် ではありません / じゃないです ထည့်သည်。"
  },
  {
    id: 27, lesson: 11,
    pattern: "〜より〜のほうが〜",
    burmese_meaning: "...ထက် ...ပိုသည် (နှိုင်းယှဉ်ခြင်း)",
    structure: "[A] より [B] のほうが [Adj] です",
    example_jp: "犬より猫のほうが好きです。",
    example_mm: "ခွေးထက် ကြောင်ကို ပိုကြိုက်သည်。",
    notes_mm: "より = ...ထက်, のほうが = ...ပိုသော ဘက်သည်"
  },

  // ==================== LESSON 12 ====================
  {
    id: 28, lesson: 12,
    pattern: "〜ましょう",
    burmese_meaning: "...ကြစို့ (အဆိုပြုချက်)",
    structure: "[Verb stem] ましょう",
    example_jp: "一緒に食べましょう。",
    example_mm: "အတူတကွ စားကြစို့。",
    notes_mm: "ましょう = ကြစို့ (invitation/suggestion). ましょうか = လုပ်ကြမလား?"
  },
  {
    id: 29, lesson: 12,
    pattern: "〜ませんか",
    burmese_meaning: "...မလဲ? (ဖိတ်ကြားချက်)",
    structure: "[Verb stem] ませんか",
    example_jp: "一緒に映画を見ませんか。",
    example_mm: "အတူတကွ ရုပ်ရှင်ကြည့်မလဲ?",
    notes_mm: "ませんか = ましょう ထက် ပိုသိမ်မွေ့သောဖိတ်ကြားချက်ဖြစ်သည်。"
  },
  {
    id: 30, lesson: 12,
    pattern: "〜たいです",
    burmese_meaning: "...ချင်သည် (ဆန္ဒပြ)",
    structure: "[Verb stem] たいです",
    example_jp: "日本に行きたいです。",
    example_mm: "ဂျပန်သွားချင်သည်。",
    notes_mm: "たい = i-adjective ပုံသဏ္ဍာန်ရှိသည်。 ငြင်းပယ်: たくないです, Past: たかったです"
  },

  // ==================== LESSON 13 ====================
  {
    id: 31, lesson: 13,
    pattern: "〜て形 (Te-form)",
    burmese_meaning: "Te ပုံစံ (ကြိယာ ချိတ်ဆက်ပုံ)",
    structure: "Group 1: く→いて, ぐ→いで, etc. Group 2: る→て. Group 3: する→して, くる→きて",
    example_jp: "ちょっと待って、それから話しましょう。",
    example_mm: "ခဏစောင့်ပြီးမှ စကားပြောကြစို့。",
    notes_mm: "Te-form ကို ကြိယာများ ချိတ်ဆက်ရန်၊ ခွင့်တောင်းရန်၊ ညီလာဆက်ဖော်ပြရန် သုံးသည်。"
  },
  {
    id: 32, lesson: 13,
    pattern: "〜てください",
    burmese_meaning: "...ပေးပါ (တောင်းဆိုချက်/ညွှန်ကြားချက်)",
    structure: "[Te-form] ください",
    example_jp: "ここに座ってください。",
    example_mm: "ဒီနေရာတွင် ထိုင်ပေးပါ。",
    notes_mm: "ください = ပေးပါ/ပေးပါဦး。 ပိုတောင်းဆိုသောပုံ: 〜ていただけますか"
  },
  {
    id: 33, lesson: 13,
    pattern: "〜ています",
    burmese_meaning: "...နေသည် (ဆက်တိုက်လုပ်ဆောင်နေမှု)",
    structure: "[Te-form] います",
    example_jp: "今、テレビを見ています。",
    example_mm: "အခု တီဗီကြည့်နေသည်。",
    notes_mm: "1) ဆက်တိုက်လုပ်ဆောင်နေသောအမှု 2) ပြောင်းလဲပြီးသားပြောင်းလဲမှု (e.g., 結婚しています = လက်ထပ်ပြီးနေသည်)"
  },

  // ==================== LESSON 14 ====================
  {
    id: 34, lesson: 14,
    pattern: "〜てもいいですか",
    burmese_meaning: "...လို့ ရပါသလား? (ခွင့်တောင်းခြင်း)",
    structure: "[Te-form] もいいですか",
    example_jp: "写真を撮ってもいいですか。",
    example_mm: "ဓာတ်ပုံရိုက်လို့ ရပါသလား?",
    notes_mm: "ဖြေဆိုပုံ: はい、どうぞ (ဟုတ်ကဲ့ ရပါသည်) / すみません、ちょっと... (ဆောရီးပါ...)"
  },
  {
    id: 35, lesson: 14,
    pattern: "〜てはいけません",
    burmese_meaning: "...မဖြစ်ရ (တားမြစ်ချက်)",
    structure: "[Te-form] はいけません",
    example_jp: "ここで泳いではいけません。",
    example_mm: "ဒီနေရာတွင် ရေမကူးရ。",
    notes_mm: "〜てはいけません = တင်းကျပ်သောတားမြစ်ချက်。 ပိုမဆိုးသောပုံ: 〜ないでください"
  },
  {
    id: 36, lesson: 14,
    pattern: "〜なければなりません",
    burmese_meaning: "...ရမည် (တာဝန်/မဖြစ်မနေ)",
    structure: "[Negative-stem] なければなりません",
    example_jp: "毎日、薬を飲まなければなりません。",
    example_mm: "နေ့တိုင်း ဆေးသောက်ရမည်မဖြစ်မနေ。",
    notes_mm: "ပုံမှန်ပြောဆိုမှုတွင် 〜なきゃ/〜なければ ကိုသုံးနိုင်သည်。"
  },

  // ==================== LESSON 15 ====================
  {
    id: 37, lesson: 15,
    pattern: "〜から (Because)",
    burmese_meaning: "...သောကြောင့် (အကြောင်းပြ)",
    structure: "[Reason] から、[Result]",
    example_jp: "雨が降っているから、家にいます。",
    example_mm: "မိုးရွာနေသောကြောင့် အိမ်တွင်ရှိသည်。",
    notes_mm: "から = ကြောင့် (informal)。 ပိုရိုသေသောပုံ: 〜ので"
  },
  {
    id: 38, lesson: 15,
    pattern: "〜が (But)",
    burmese_meaning: "...သော်လည်း... (ဆန့်ကျင်ချက်)",
    structure: "[Clause 1] が、[Clause 2]",
    example_jp: "高いですが、おいしいです。",
    example_mm: "ဈေးကြီးသော်လည်း အရသာရှိသည်。",
    notes_mm: "が = 'but/however'。 ဤ が သည် subject marker が နှင့် မတူပါ。"
  },

  // ==================== LESSON 16 ====================
  {
    id: 39, lesson: 16,
    pattern: "〜ながら",
    burmese_meaning: "...ရင်း...သည် (တပြိုင်နက်တည်းလုပ်ဆောင်မှု)",
    structure: "[Verb stem] ながら [Main Verb]",
    example_jp: "音楽を聞きながら料理します。",
    example_mm: "သီချင်းနားထောင်ရင်း ချက်ပြုတ်သည်。",
    notes_mm: "ながら = တဆက်တည်းလုပ်ဆောင်မှု 2 ခုကို ဆက်သည်။ Main verb သည် ပဓာန verb ဖြစ်သည်。"
  },
  {
    id: 40, lesson: 16,
    pattern: "〜前に / 〜後で",
    burmese_meaning: "...မတိုင်ခင် / ...ပြီးနောက်",
    structure: "[Verb-dict] 前に / [Verb-ta] 後で",
    example_jp: "寝る前に歯を磨きます。食べた後で散歩します。",
    example_mm: "အိပ်မချင်းမီ သွားတိုက်သည်။ စားပြီးနောက် လမ်းလျောက်သည်。",
    notes_mm: "前に + dictionary form, 後で + ta-form (past)"
  },

  // ==================== LESSON 17 ====================
  {
    id: 41, lesson: 17,
    pattern: "〜たことがあります",
    burmese_meaning: "...ဖူးသည် (အတွေ့အကြုံရှိမှု)",
    structure: "[Verb-ta] ことがあります",
    example_jp: "富士山に登ったことがあります。",
    example_mm: "ဖူဂျိတောင် တက်ဖူးသည်。",
    notes_mm: "ငြင်းပယ်: 〜たことがありません = ဖူးမသည်/မဖူးပါ"
  },
  {
    id: 42, lesson: 17,
    pattern: "〜たり〜たりします",
    burmese_meaning: "...တာတို့ ...တာတို့ လုပ်သည် (လုပ်ရပ်များ စာရင်းပြု)",
    structure: "[Verb-ta]り [Verb-ta]り します",
    example_jp: "週末は映画を見たり、本を読んだりします。",
    example_mm: "စနေ၊တနင်္ဂနွေတွင် ရုပ်ရှင်ကြည့်တာတို့ စာဖတ်တာတို့ လုပ်သည်。",
    notes_mm: "ဤပုံစံသည် ကြိုးကြိုးနမူနာမဟုတ်ဘဲ ကိုယ်စားလုပ်ရပ်အချို့ကိုသာ ဖော်ပြသည်。"
  },

  // ==================== LESSON 18 ====================
  {
    id: 43, lesson: 18,
    pattern: "〜と思います",
    burmese_meaning: "...ဟုထင်သည် (ထင်မြင်ချက်ပြ)",
    structure: "[Plain form] と思います",
    example_jp: "明日は雨だと思います。",
    example_mm: "မနက်ဖြန် မိုးရွာမည်ဟု ထင်သည်。",
    notes_mm: "と quotes the thought。 Plain form (casual) ကိုသုံးသည်: verb-dict, い-adj, な-adjだ"
  },
  {
    id: 44, lesson: 18,
    pattern: "〜でしょう",
    burmese_meaning: "...ဖြစ်မည်နော် (ခန့်မှန်းချက်)",
    structure: "[Plain form] でしょう",
    example_jp: "明日は晴れでしょう。",
    example_mm: "မနက်ဖြန် နေပေါ်မည်ဟုဆိုနိုင်ပေသည်。",
    notes_mm: "でしょう = だろう ၏ ရိုသေသောပုံ (probability/conjecture)"
  },

  // ==================== LESSON 19 ====================
  {
    id: 45, lesson: 19,
    pattern: "〜方",
    burmese_meaning: "...နည်း / ...ပုံ (လုပ်ဆောင်နည်း)",
    structure: "[Verb stem] 方",
    example_jp: "この機械の使い方を教えてください。",
    example_mm: "ဤစက်၏ သုံးနည်းကို သင်ပေးပါ。",
    notes_mm: "方 = 'way of doing'. 食べ方 =စားနည်း, 書き方 = ရေးနည်း"
  },
  {
    id: 46, lesson: 19,
    pattern: "〜すぎる",
    burmese_meaning: "...လွန်းသည် / အလွန်အမင်း",
    structure: "[Verb stem / Adj stem] すぎる",
    example_jp: "食べすぎました。この問題は難しすぎます。",
    example_mm: "စားလွန်းသည်။ ဤပြဿနာသည် အလွန်ခက်ခဲသည်。",
    notes_mm: "i-adj: い→すぎる (高い→高すぎる), na-adj: な→すぎる (静か→静かすぎる)"
  },
  {
    id: 47, lesson: 19,
    pattern: "〜やすい / 〜にくい",
    burmese_meaning: "...ရလွယ်ကူသည် / ...ရခက်ခဲသည်",
    structure: "[Verb stem] やすい / にくい",
    example_jp: "この本は読みやすいです。この字は書きにくいです。",
    example_mm: "ဤစာအုပ်သည် ဖတ်ရလွယ်ကူသည်။ ဤအက္ခရာသည် ရေးရခက်ခဲသည်。",
    notes_mm: "やすい/にくい = i-adjective ပုံသဏ္ဍာန် → conjugate like i-adj"
  },

  // ==================== LESSON 20 ====================
  {
    id: 48, lesson: 20,
    pattern: "〜し、〜し",
    burmese_meaning: "...ပြီး ...ပြီး (အချက်အများကိုစာရင်းပြု)",
    structure: "[Reason1] し、[Reason2] し、[Conclusion]",
    example_jp: "安いし、おいしいし、この店は最高です。",
    example_mm: "ဈေးသက်သာပြီး အရသာကောင်းပြီး ဤဆိုင်သည် အကောင်းဆုံးဖြစ်သည်。",
    notes_mm: "し = 'and also (reason)'. からより ပိုပူဆာသောပုံစံ。"
  },
  {
    id: 49, lesson: 20,
    pattern: "〜そうです (hearsay)",
    burmese_meaning: "...တဲ့ / ...ဖြစ်သည်ဟု ကြားသည်",
    structure: "[Plain form] そうです",
    example_jp: "明日、雨が降るそうです。",
    example_mm: "မနက်ဖြန် မိုးရွာမည်တဲ့/ဟူ၍ ကြားသည်。",
    notes_mm: "Hearsay そう ≠ Appearance そう (stem+そう)。 Hearsay = plain form + そうです"
  },
  {
    id: 50, lesson: 20,
    pattern: "〜そうです (appearance)",
    burmese_meaning: "...ပုံပေါ်သည် / ...ပုံရသည်",
    structure: "[Verb stem / Adj stem] そうです",
    example_jp: "この料理はおいしそうです。",
    example_mm: "ဤဟင်းသည် အရသာရှိပုံပေါ်သည်。",
    notes_mm: "Appearance そう = stem + そう (いい→よさそう, ない→なさそう)"
  },

  // ==================== LESSON 21 ====================
  {
    id: 51, lesson: 21,
    pattern: "〜ば (conditional)",
    burmese_meaning: "...ဆိုလျှင် (ဖြစ်ခဲ့ပါမူ)",
    structure: "Group1: く→けば, む→めば etc. Group2: る→れば. Group3: する→すれば, くる→くれば",
    example_jp: "もっと練習すれば、上手になります。",
    example_mm: "ပိုလေ့ကျင့်ဆိုလျှင် ကောင်းလာမည်。",
    notes_mm: "ば conditional = ယေဘူယျအမှန်/သဘာဝကျသောအကြောင်းဆက်ကို ဖော်ပြရာတွင်သုံးသည်。"
  },
  {
    id: 52, lesson: 21,
    pattern: "〜たら (conditional)",
    burmese_meaning: "...ဆိုလျှင် / ...ဖြစ်ပြီးလျှင်",
    structure: "[Verb-ta] ら",
    example_jp: "東京に着いたら、電話してください。",
    example_mm: "တိုကျိုရောက်ဆိုလျှင် ဖုန်းဆက်ပေးပါ。",
    notes_mm: "たら = အများဆုံးသုံးသော conditional。 ပြီးနောက်ဖြစ်မည့်ကိစ္စများအတွက် ကောင်းသည်。"
  },

  // ==================== LESSON 22 ====================
  {
    id: 53, lesson: 22,
    pattern: "〜ようにする",
    burmese_meaning: "...ဖြစ်အောင် ကြိုးစားသည်",
    structure: "[Verb-dict] ようにする",
    example_jp: "毎日、野菜を食べるようにしています。",
    example_mm: "နေ့တိုင်း ဟင်းသီးဟင်းရွက်စားအောင် ကြိုးစားသည်。",
    notes_mm: "〜ようにしている = (ပုံမှန်) ကြိုးစားနေသည်. 〜ようにした = (တစ်ကြိမ်) ကြိုးစားသည်"
  },
  {
    id: 54, lesson: 22,
    pattern: "〜ようになる",
    burmese_meaning: "...တတ်လာသည် / ...ဖြစ်လာသည် (တဖြည်းဖြည်းပြောင်းလဲမှု)",
    structure: "[Verb-dict] ようになる",
    example_jp: "日本語で話せるようになりました。",
    example_mm: "ဂျပန်ဘာသာဖြင့် ပြောတတ်လာသည်。",
    notes_mm: "ようになる = ပြောင်းလဲမှု/တိုးတက်မှုကိုပြ (not a conscious effort, but a natural change)"
  },

  // ==================== LESSON 23 ====================
  {
    id: 55, lesson: 23,
    pattern: "〜てあげる / 〜てもらう / 〜てくれる",
    burmese_meaning: "ပေးခြင်း/ရခြင်းကြိယာ (Giving & Receiving)",
    structure: "[Te-form] あげる/もらう/くれる",
    example_jp: "友達に日本語を教えてあげました。友達に教えてもらいました。",
    example_mm: "သူငယ်ချင်းကို ဂျပန်ဘာသာ သင်ပေးသည်။ (ကိုယ်ကပေး) / သူငယ်ချင်းမှ သင်ပေးချက်ကိုရသည်。",
    notes_mm: "あげる = ကိုယ်မှ တခြားသူကို, もらう = တခြားသူထံမှ ကိုယ်ကရ, くれる = တခြားသူမှ ကိုယ်/ကိုယ်ဘက်ကိုပေး"
  },

  // ==================== LESSON 24 ====================
  {
    id: 56, lesson: 24,
    pattern: "〜という",
    burmese_meaning: "...ဟုခေါ်သော / ...ဟုပြောသော",
    structure: "[Name/Quote] という [Noun]",
    example_jp: "「さくら」という花はきれいです。",
    example_mm: "\"ဆာကူရာ\" ဟုခေါ်သောပန်းသည် လှပသည်。",
    notes_mm: "という = ကိုးကားချက်/နာမည်ညွှန်ပြရာတွင်သုံးသည်。"
  },
  {
    id: 57, lesson: 24,
    pattern: "〜ので",
    burmese_meaning: "...သောကြောင့် (ရိုသေပြောဆိုမှု)",
    structure: "[Plain form] ので / [na-adj] なので / [noun] なので",
    example_jp: "熱があるので、学校を休みます。",
    example_mm: "အဖျားရှိသောကြောင့် ကျောင်းခွင့်ယူသည်。",
    notes_mm: "ので = から ထက်ပိုရိုသေသောပုံ (used in formal/polite situations)"
  },

  // ==================== LESSON 25 ====================
  {
    id: 58, lesson: 25,
    pattern: "〜ても (Concessive)",
    burmese_meaning: "...သော်လည်းပဲ / ...ဆိုသော်ပင်",
    structure: "[Te-form] も",
    example_jp: "どんなに忙しくても、食事はとります。",
    example_mm: "ဘယ်လောက်အလုပ်များသည်ဆိုသော်ပင် ထမင်းစားသည်。",
    notes_mm: "〜ても = ပထမသောနှင့်ဆန့်ကျင်ဘက်ဖြစ်သောဒုတိယသောကို ဖော်ပြ。"
  },
  {
    id: 59, lesson: 25,
    pattern: "〜ずに",
    burmese_meaning: "...မလုပ်ဘဲ",
    structure: "[Negative-stem] ずに",
    example_jp: "朝ごはんを食べずに学校に行きました。",
    example_mm: "နံနက်ထမင်း မစားဘဲ ကျောင်းသွားသည်。",
    notes_mm: "ずに ≈ ないで (slightly more formal). する→せずに"
  },
  {
    id: 60, lesson: 25,
    pattern: "普通形 (Plain Form) Review",
    burmese_meaning: "ပုံမှန်ပုံစံ (Plain form) ပြန်လည်ကြည့်ရှုခြင်း",
    structure: "Verb: dict/た/ない/なかった | i-adj: い/かった/くない/くなかった | na-adj: だ/だった/じゃない",
    example_jp: "彼は学生だと思います。日本語は難しいと思います。",
    example_mm: "သူ ကျောင်းသားဖြစ်သည်ဟု ထင်သည်。 ဂျပန်ဘာသာ ခက်ခဲသည်ဟု ထင်သည်。",
    notes_mm: "Plain form ကို quotation (という/と思う), conditional (たら/ば), relative clauses တွင်သုံးသည်。"
  },
];

export const getLessonGrammar = (lesson) => grammar.filter(g => g.lesson === lesson);
export const getAllGrammarLessons = () => [...new Set(grammar.map(g => g.lesson))].sort((a, b) => a - b);
