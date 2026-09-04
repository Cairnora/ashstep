#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs';

const productFiles = [
  'apps/quit-smoking/index.html',
  'ashstep/index.html',
  'product/quit-smoking/index.html',
  'quit-smoking/index.html',
  'assets/main-71dc24ec.js',
];

const rootFiles = ['index.html', 'assets/root-f845c0de.js'];

const productReplacements = [
  [
    'Ashstep Quit Smoking is an upcoming support app built around smaller starts, guided hard-moment support, visible progress, and weekly reflection. Launching June 1, 2026.',
    'Ashstep Quit Smoking is a practical iPhone app for planning a quit attempt, handling cravings, tracking progress, and reflecting without shame.',
  ],
  ['Ashstep Quit Smoking | Pre-launch', 'Ashstep Quit Smoking | A steadier way to quit'],
  [
    'A quit-smoking support app built for smaller starts, hard moments, and visible progress. Join the waitlist before the June 1, 2026 launch.',
    'A practical quit-smoking app for focused challenges, guided craving support, visible progress, and weekly reflection.',
  ],
  ['Get the June launch email', 'Request a release update'],
  ['Get the release update.', 'Request one launch notice.'],
  ['Right now this opens a short email to the launch inbox.', 'This opens your email app so you can request one launch notice.'],
  ['Pre-launch', 'App Store review'],
  ['PRE-LAUNCH', 'APP STORE REVIEW'],
  ['Launching June 1, 2026', 'Version 1.0 · iPhone first'],
  [
    'Ashstep Quit Smoking is an upcoming support app built around challenge goals, guided\n          hard-moment support, visible progress, and weekly reflection.',
    'Ashstep Quit Smoking combines focused goals, guided craving support, visible progress, and weekly reflection in one calm, practical app.',
  ],
  [
    'Ashstep Quit Smoking is an upcoming support app built around challenge goals, guided hard-moment support, visible progress, and weekly reflection.',
    'Ashstep Quit Smoking combines focused goals, guided craving support, visible progress, and weekly reflection in one calm, practical app.',
  ],
  ['June 1 target', 'Version 1.0 in review'],
  ['No App Store page yet', 'App Store link coming soon'],
  ['Launch updates only', 'One release notice'],
  ['Premium adds deeper goal options', 'Clear goal and duration choices'],
  ['Crisis support flow', 'Guided craving support'],
  ['Launch sequence', 'Availability'],
  ['LAUNCH SEQUENCE', 'AVAILABILITY'],
  ['Pre-launch means clarity first, scale later.', 'Version 1.0 is ready for review.'],
  ['App Store review means clarity first, scale later.', 'Version 1.0 is in App Store review.'],
  [
    /The current page is intentionally focused\. It explains the product clearly, tests which\s+message resonates, and collects early launch intent before release\./g,
    'Ashstep is prepared for its first iPhone release. Version 1.0 is in App Store review, with final availability following approval and release checks.',
  ],
  ['The page explains the product clearly and starts collecting early launch interest.', 'Version 1.0 is in App Store review.'],
  ['Before launch', 'After approval'],
  [
    'The message, channel mix, and creative direction get refined around what early visitors actually respond to.',
    'We will complete final checks before making the app public.',
  ],
  ['Launch updates go out first to the waitlist as the App Store rollout begins.', 'The App Store link will appear here when Ashstep is live.'],
  ['<strong>June 1</strong>', '<strong>Launch</strong>'],
  ['data-track-label="June 1"', 'data-track-label="Launch"'],
  ['when:`June 1`', 'when:`Launch`'],
  ['What joining means', 'Release updates'],
  ['WHAT JOINING MEANS', 'RELEASE UPDATES'],
  ['Get the June launch email.', 'Request one launch notice.'],
  ['Launch updates and release notice first', 'One message when Ashstep is live'],
  ['A grounded product story instead of generic motivation', 'No recurring newsletter'],
  ['Clear positioning around smaller starts, support, and progress', 'Direct support from the AKORA team'],
  ['No spammy newsletter framing and no fake urgency', 'No fake countdowns or launch pressure'],
  ['Prefer your email app instead?', 'Email AKORA support directly'],
  ['Joining now means hearing first when Ashstep goes live.', 'The App Store link will be added here after approval.'],
  ['App Store link coming soon. The App Store link will be added here after approval.', 'The App Store link will be added here after approval.'],
  ['Clear answers for a focused pre-launch page.', 'Clear answers before release.'],
  ['Clear answers before release.', 'Clear answers about Ashstep.'],
  ['No. The current launch target is June 1, 2026.', 'Not yet. Version 1.0 is currently in App Store review.'],
  ['Who should join the waitlist?', 'How can I hear when Ashstep launches?'],
  [
    'People who want launch updates, early access news, and the first release notice when the product goes live.',
    'Use the release update request above and we will send one message when the App Store page is live.',
  ],
  ['How can I hear when Ashstep launches?', 'When will Ashstep be available?'],
  [
    'Use the release update request above and we will send one message when the App Store page is live.',
    'After App Store approval and final release checks. The App Store link will appear on this page.',
  ],
  ['Ashstep Quit Smoking by Cairnora', 'Ashstep Quit Smoking by AKORA Co., Ltd.'],
  ['Please add me to the Ashstep launch updates list.', 'Please send me one message when Ashstep is available on the App Store.'],
  ['I want to hear about the June 1 launch.', 'I would like to hear when Ashstep is available.'],
  ['mailto:ashstep%40gmail.com?subject=Ashstep%20waitlist', 'mailto:contact%40akoracorp.com?subject=Ashstep%20release%20update'],
  ['Please%20add%20me%20to%20the%20Ashstep%20launch%20updates%20list.', 'Please%20send%20me%20one%20message%20when%20Ashstep%20is%20available%20on%20the%20App%20Store.'],
  ['I%20want%20to%20hear%20about%20the%20June%201%20launch.', 'I%20would%20like%20to%20hear%20when%20Ashstep%20is%20available.'],
];

const rootReplacements = [
  [
    'Ashstep apps support difficult habit changes one step at a time. Quit Smoking opens June 1, 2026, Quit Drinking opens July 1, 2026, and Substance Support is in preparation.',
    'Ashstep apps support difficult habit changes one step at a time. Quit Smoking is coming soon to iPhone, while Quit Drinking and Substance Support are in development.',
  ],
  [
    'Quit Smoking opens June 1, 2026. Quit Drinking opens July 1, 2026. Substance Support is in preparation.',
    'Quit Smoking is coming soon to iPhone. Quit Drinking and Substance Support are in development.',
  ],
  [
    /Ashstep Quit Smoking opens June 1, 2026\. Ashstep Quit Drinking opens July 1,\s+2026\. Ashstep Substance Support is in preparation\./g,
    'Ashstep Quit Smoking is coming soon to iPhone. Ashstep Quit Drinking and Ashstep Substance Support are in development.',
  ],
  ['Opens June 1, 2026', 'Coming soon to iPhone'],
  ['Opening July 1', 'In development'],
  ['Opens July 1, 2026', 'In development'],
];

for (const file of productFiles) updateFile(file, productReplacements);
for (const file of rootFiles) updateFile(file, rootReplacements);

for (const file of productFiles.filter((file) => file.endsWith('.html'))) {
  let source = readFileSync(file, 'utf8');
  if (!source.includes('/assets/release-refresh.css')) {
    source = source.replace(
      '<link rel="stylesheet" crossorigin href="/assets/styles-DCUqroG7.css">',
      '<link rel="stylesheet" crossorigin href="/assets/styles-DCUqroG7.css">\n    <link rel="stylesheet" href="/assets/release-refresh.css">',
    );
  }
  if (!source.includes('external-legal-footer')) {
    source = source.replace(
      '  </body>',
      `    <footer class="site-footer external-legal-footer" aria-label="Legal links">
      <div class="page-shell footer-card">
        <p>Ashstep Quit Smoking by AKORA Co., Ltd.</p>
        <p><a href="/privacy/">Privacy</a> · <a href="/terms/">Terms</a> · <a href="/support/">Support</a> · <a href="/delete-account/">Delete account</a></p>
      </div>
    </footer>
  </body>`,
    );
  }
  writeFileSync(file, source);
}

console.log('Ashstep release copy refreshed.');

function updateFile(file, replacements) {
  let source = readFileSync(file, 'utf8');
  for (const [pattern, replacement] of replacements) {
    source = typeof pattern === 'string' ? source.replaceAll(pattern, replacement) : source.replace(pattern, replacement);
  }
  writeFileSync(file, source);
}
