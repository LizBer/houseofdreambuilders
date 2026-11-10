// All visible content lives here, so it can be changed without touching markup.
//
// Assumptions and placeholders (every one is listed in the hand-off message too):
// - `url` is houseofdreambuilders.com, taken from the Privacy/Terms links on the sales page.
// - `email` is a placeholder address on that domain.
// - `program.name` "The Margin Method" is a proposed name. Rename it here and it changes everywhere.
// - Program phases, what's included, format and FAQ answers are drafts (`placeholder: true`):
//   rewrite them to match the real program. Price is deliberately not shown (application first).
// - `applyUrl` is a placeholder (an email with a subject line). Point it at the real
//   application form or booking page.
// - `kit.optinUrl` is a placeholder: point it at the real opt-in form for the free kit.
// - The kit video is a placeholder slot.

export const site = {
  name: 'House of Dreambuilders',
  founder: 'Lizzy',
  url: 'https://houseofdreambuilders.com',
  description:
    'Mentorship and simple AI systems for moms building a business in the little time a full life leaves them.',
  email: 'hello@houseofdreambuilders.com', // placeholder
  privacy: 'https://houseofdreambuilders.com/privacy',
  terms: 'https://houseofdreambuilders.com/terms',
};

export const program = {
  name: 'The Margin Method',
  kind: 'Business mentorship for moms',
  promise: 'Turn the few hours you have into a business that gives you your time back.',
  applyUrl: `mailto:hello@houseofdreambuilders.com?subject=${encodeURIComponent('Applying to The Margin Method')}`, // placeholder
  placeholder: true,
  phases: [
    { tag: 'Your hours', title: 'Find the time you really have', text: 'We map your week as it is, not as it should be, and give every free hour one clear job.' },
    { tag: 'One offer', title: 'Choose what you build', text: 'One offer for one person you can help, so every hour moves the same thing forward.' },
    { tag: 'The long part', title: 'Hand the repeating work to AI', text: 'Editing, captions, planning and follow-ups, set up as plug-and-play systems that run on your computer.' },
    { tag: 'Ten minutes', title: 'Show up without burning out', text: 'A way of making content and selling that fits in ten-minute pockets, so you stay visible in a full week.' },
  ],
  included: [
    { title: 'Mentorship calls', text: 'Live calls where we work on your business, not on theory.' },
    { title: 'My AI systems, set up with you', text: 'The same plug-and-play systems I use, tuned to your style and your offer.' },
    { title: 'A room of moms doing the same', text: 'A small private community, so you’re never building alone at 21:12.' },
    { title: 'Help between calls', text: 'Questions answered while they still matter, not two weeks later.' },
  ],
  forYou: [
    'You work full time, or your days are full of family, and you still feel the pull to build something of your own.',
    'You have ideas, maybe even a started business, but the time keeps getting eaten.',
    'You want freedom, purpose and room to grow, and you’re willing to do the part only you can do.',
  ],
  notForYou: [
    'You’re looking for a get-rich-quick scheme.',
    'You want someone else to build the business for you.',
    'You’re not ready to give it a few focused hours a week.',
  ],
  faq: [
    { q: 'I only have a few hours a week. Is that enough?', a: 'That’s exactly who this is for. The whole method is built around small, focused hours, with AI systems doing the long, repeating work.' },
    { q: 'Do I need to be good with technology?', a: 'No. The systems are plug and play. If you can open a folder and type a sentence, you can use them, and we set them up together.' },
    { q: 'I don’t have a business yet. Can I still apply?', a: 'Yes. Part of the work is choosing the one offer worth building. Tell me where you are in the application.' },
    { q: 'How much does it cost?', a: 'It’s a high-touch program with limited places. We talk about the investment on the call, once we both know it’s the right fit.' },
  ],
};

export const nav = [
  { label: program.name, href: '/#method' },
  { label: 'About', href: '/about/' },
];

// The day, as it really goes. The last line is the margin.
export const day = [
  { time: '06:10', text: 'Alarm. Lunches. Find the other shoe.' },
  { time: '07:40', text: 'Drop-off' },
  { time: '09:00', text: 'The job (you don’t hate it)' },
  { time: '17:30', text: 'Pick-up, dinner, bath, books' },
  { time: '21:12', text: 'The house goes quiet', margin: true },
];

export const kit = {
  name: 'Edit Starter Kit',
  href: '/edit-starter-kit/',
  optinUrl: '#get', // placeholder: real opt-in form
  price: 'Free',
  promise: 'Record yourself talking. Get finished reels back in your own style, ready to post.',
  outcomes: [
    { title: 'Posted, even in busy weeks', text: 'A week of recordings goes in. A week of finished reels comes out, even when you only had ten minutes.' },
    { title: 'Your evenings back', text: 'No late nights cutting breaths, fixing stumbles or typing captions by hand.' },
    { title: 'Always looks like you', text: 'Your colours, fonts and caption style, set once and kept the same on every reel.' },
    { title: 'Nothing leaves your computer', text: 'Editing runs locally. Your recordings are never uploaded anywhere.' },
  ],
  steps: [
    { cost: '10 min, once', title: 'Tell it your style', text: 'Answer a few questions and share reels you love. Your style is saved.' },
    { cost: '2 min', title: 'Drop your videos in a folder', text: 'Straight from your phone. Mistakes and retakes are fine.' },
    { cost: 'Your pick', title: 'Choose a look and post', text: 'Every reel comes in three looks, with a cover and a caption written from your own words.' },
  ],
  included: [
    { title: 'Pauses and mistakes removed', text: 'Dead air, false starts and retakes are cut. Your best take stays.' },
    { title: 'Captions in your style', text: 'Your fonts, colours and caption look, applied to every reel.' },
    { title: 'Three looks per reel', text: 'Same clean cut, three designs. Pick the one that feels right.' },
    { title: 'A version without text', text: 'For when you want to style it yourself in Instagram or CapCut.' },
    { title: 'A cover and a post caption', text: 'Written from your own words, so it sounds like you.' },
    { title: 'A brand kit you change by asking', text: '“Make the captions bigger.” Done, and kept for every future reel.' },
  ],
  needs: 'A Claude account with Claude Code (Pro or Max), the Claude app, and your videos. Works on Mac and Windows, with any phone.',
  owns: 'Your recordings, your finished reels and your brand kit. All of it stays on your computer.',
  faq: [
    { q: 'I only have a few hours a week. Is this for me?', a: 'Yes, that’s who it’s built for. You record when you have ten minutes. The kit does the long part, so the few hours you have go into your dream, not into a timeline.' },
    { q: 'I’m not technical. Can I really use this?', a: 'Yes. You open a folder in the Claude app, type “Start”, and click Allow when it asks. After that you only drop videos in a folder and say “Edit my videos”.' },
    { q: 'Are my videos uploaded anywhere?', a: 'No. The editing runs on your own computer. Your recordings stay with you.' },
    { q: 'Will my reels look like everyone else’s?', a: 'No. The look comes from you: your colours, your fonts and the reels you love. Two creators with the same kit get two different styles.' },
    { q: 'What if I stumble while recording?', a: 'Pause, then say the sentence again from the start. The kit keeps your best take and removes the rest.' },
    { q: 'Does it add music?', a: 'Not yet. You add music in Instagram when you post, which keeps you on the right side of licensing.' },
  ],
};

// The Reels Starters Room: the AI video editing starter kit, free.
// - Free, no price and no timer.
// - `optinUrl` is a placeholder: point it at the real sign-up form.
export const reels = {
  name: 'The Reels Starters Room',
  href: '/reels-starters-room/',
  optinUrl: '#join', // placeholder
  promise: 'Your AI video editor, set up in your style. Talk to your camera, and get reels back that are cut, captioned and ready to post.',
  inside: [
    { title: 'An AI editor that learns your style', text: 'Tell it your colours, fonts and the reels you love once. Every reel after that looks like you.' },
    { title: 'Stumbles and silences cut for you', text: 'Pause, say it again, keep going. Your best take stays and the rest disappears.' },
    { title: 'Captions you didn’t have to type', text: 'Word-for-word captions in your look, timed to your voice.' },
    { title: 'Three designs for every reel', text: 'One clean cut, three styles. You choose, you approve, you post.' },
    { title: 'A cover and a caption, written from your words', text: 'So the post sounds like you, not like a template.' },
    { title: 'A clean version without text', text: 'For the days you want to finish it yourself in Instagram or CapCut.' },
  ],
  steps: [
    { cost: '10 min, once', title: 'Set up your style', text: 'A few questions and a few reels you love. Saved for good.' },
    { cost: 'Whenever', title: 'Record on your phone', text: 'In the car, at lunch, after bedtime. Mistakes included.' },
    { cost: '2 min', title: 'Drop the videos in a folder', text: 'Ask for your edits and get on with your evening.' },
    { cost: 'Your pick', title: 'Choose and post', text: 'Finished reels, a cover and a caption are waiting for you.' },
  ],
  faq: [
    { q: 'Why is it free?', a: 'I want as many moms as possible to feel what it’s like when AI does the long part. If it gives you your evenings back, that’s the best thanks I can ask for.' },
    { q: 'I’m not technical. Will I manage?', a: 'Yes. It runs in the Claude app: you open a folder, type “Start”, and click Allow when it asks. After that it’s drop videos in, say “Edit my videos”.' },
    { q: 'What do I need?', a: 'A Claude account with Claude Code (Pro or Max), the Claude app on a Mac or Windows computer, and any phone to record on.' },
    { q: 'Are my videos uploaded anywhere?', a: 'No. The editing runs on your own computer, and your recordings stay there.' },
    { q: 'Does it add music?', a: 'Not yet. Add music in Instagram when you post, which keeps you on the right side of licensing.' },
  ],
};
