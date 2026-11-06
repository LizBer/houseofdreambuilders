// All visible content lives here, so it can be changed without touching markup.
//
// Assumptions and placeholders (every one is listed in the hand-off message too):
// - `url` is houseofdreambuilders.com, taken from the Privacy/Terms links on the sales page.
// - `email` is a placeholder address on that domain.
// - `kitCheckout` is a placeholder: point it at the real checkout or sales page.
// - The kit video is a placeholder slot.
// - Products marked `placeholder: true` are invented examples of what could come next.
//   Replace them with real ones or delete them.

export type Product = {
  slug: string;
  name: string;
  kind: 'AI system' | 'Digital product';
  status: 'Available now' | 'In the workshop';
  line: string; // one sentence: what it takes off her plate
  href?: string; // only for available products
  placeholder?: boolean;
};

export const site = {
  name: 'House of Dreambuilders',
  short: 'Dreambuilders',
  founder: 'Lizzy',
  url: 'https://houseofdreambuilders.com',
  description:
    'Plug-and-play AI systems and digital products for moms building a business in the little time a full life leaves them.',
  email: 'hello@houseofdreambuilders.com', // placeholder
  kitCheckout: '/systems/edit-starter-kit/#get', // placeholder: real checkout URL
  privacy: 'https://houseofdreambuilders.com/privacy',
  terms: 'https://houseofdreambuilders.com/terms',
};

export const nav = [
  { label: 'Systems', href: '/systems/' },
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

export const products: Product[] = [
  {
    slug: 'edit-starter-kit',
    name: 'Edit Starter Kit',
    kind: 'AI system',
    status: 'Available now',
    line: 'Turns your raw recordings into cut, captioned reels in your own look.',
    href: '/systems/edit-starter-kit/',
  },
  {
    slug: 'caption-planner',
    name: 'Week of Posts',
    kind: 'AI system',
    status: 'In the workshop',
    line: 'Turns one voice note into a week of captions and a posting plan.',
    placeholder: true,
  },
  {
    slug: 'margin-planner',
    name: 'The Margin Planner',
    kind: 'Digital product',
    status: 'In the workshop',
    line: 'A printable week that finds the hours you actually have, and gives each one a job.',
    placeholder: true,
  },
];

export const kit = {
  name: 'Edit Starter Kit',
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
