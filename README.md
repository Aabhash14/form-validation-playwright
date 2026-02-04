# Form Validation Playwright

End-to-end UI tests for the DemoQA Automation Practice Form using Playwright Test.

## What's Inside
- UI test specs in `tests/`
- Playwright configuration in `playwright.config.js`
- HTML report output in `playwright-report/`
- Test artifacts (screenshots, videos, traces) in `test-results/`

## Requirements
- Node.js 18+ recommended
- Windows PowerShell (commands below assume PowerShell)

## Install
```powershell
npm install
```

Install browser binaries (Chromium only is used by config, but Playwright installs all by default):
```powershell
npx playwright install
```

Optional (install only Chromium):
```powershell
npx playwright install chromium
```

## Run Tests
Run all tests:
```powershell
npx playwright test
```

Run a single test file:
```powershell
npx playwright test tests\demoqa-form.spec.js
```

Run in headed mode:
```powershell
npx playwright test --headed
```

Run in debug UI mode:
```powershell
npx playwright test --ui
```

## Reports and Artifacts
This project is configured to always capture:
- Screenshots
- Videos
- Traces

Artifacts are written to `test-results/` by default.

Open the HTML report after a run:
```powershell
npx playwright show-report
```

Open a trace manually:
```powershell
npx playwright show-trace test-results\<test-folder>\trace.zip
```

Open a video manually:
```
test-results\<test-folder>\video.webm
```

Screenshots are saved alongside the test output:
```
test-results\<test-folder>\*.png
```

## Save Video to a Custom Folder (In Test)
If you want to copy/rename the recorded video into your own folder (for example `artifacts\videos\`), add an `afterEach` hook. The video file is available only after the page is closed, so keep the hook in the same test file or a shared fixture.

Example (CommonJS):
```js
const fs = require('fs');
const path = require('path');
const { test } = require('@playwright/test');

test.afterEach(async ({ page }, testInfo) => {
  const video = page.video();
  if (!video) return;

  const videoPath = await video.path();
  const outDir = path.join(__dirname, '..', 'artifacts', 'videos');
  await fs.promises.mkdir(outDir, { recursive: true });

  const safeTitle = testInfo.title.replace(/[^a-z0-9-_]+/gi, '_').toLowerCase();
  const outFile = path.join(outDir, `${safeTitle}-${Date.now()}.webm`);
  await fs.promises.copyFile(videoPath, outFile);
});
```

This keeps Playwright's default video in `test-results/` and saves a copy to `artifacts\videos\`.

## Configuration Notes
The current `playwright.config.js` is set to:
- Run only Chromium
- Capture `screenshot`, `video`, and `trace` on every run

If you want to change retention behavior, update these options in `playwright.config.js`:
```js
use: {
  screenshot: 'on',
  video: 'on',
  trace: 'on',
}
```

## Test Data Notes
`tests\demoqa-form.spec.js` uploads a local file:
```
D:\Downloads\Me\aaa.png
```
Make sure this file exists on your machine or update the path to a valid image.

## Suggested Scripts (Optional)
If you want short commands in `package.json`, add:
```json
"scripts": {
  "test": "playwright test",
  "test:ui": "playwright test --ui",
  "test:headed": "playwright test --headed",
  "report": "playwright show-report"
}
```

## Troubleshooting
- If tests fail on file upload, verify the file path exists.
- If you see browser launch errors, re-run:
  ```powershell
  npx playwright install chromium
  ```

