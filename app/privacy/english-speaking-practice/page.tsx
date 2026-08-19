import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — English Speaking Practice',
  description: 'Privacy policy for the English Speaking Practice Chrome extension.',
}

export default function PrivacyPolicyPage() {
  return (
    <main className="px-6 sm:px-12 lg:px-24 pt-24 pb-24 max-w-3xl mx-auto w-full">
      <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-12">
        Privacy Policy
      </p>

      <h1 className="text-2xl font-bold text-foreground mb-2">
        English Speaking Practice
      </h1>
      <p className="text-sm text-muted-foreground mb-12">
        Chrome Extension &mdash; Last updated: August 2026
      </p>

      <div className="flex flex-col gap-8 text-sm text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">Overview</h2>
          <p>
            English Speaking Practice is a Chrome extension that lets you select text on any
            webpage and practice reading it aloud. This policy explains what data the extension
            handles and how it is stored.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">Data we collect</h2>
          <p className="mb-3">The extension may store the following on your device:</p>
          <ul className="flex flex-col gap-2 pl-4 border-l border-border">
            <li>
              <span className="text-foreground font-medium">Audio recordings</span> — captured
              via your microphone when you start a practice session.
            </li>
            <li>
              <span className="text-foreground font-medium">Practice sessions</span> — the text
              you practiced, your speech transcript, accuracy score, and duration.
            </li>
            <li>
              <span className="text-foreground font-medium">Settings</span> — your preferences
              such as whether to save audio or auto-save on finish.
            </li>
            <li>
              <span className="text-foreground font-medium">Diagnostic logs</span> — timestamped
              debug entries used to troubleshoot issues, exportable from the extension popup.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">Where data is stored</h2>
          <p>
            <strong className="text-foreground">All data is stored locally on your device</strong>{' '}
            using the browser&apos;s built-in{' '}
            <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">
              chrome.storage.local
            </code>{' '}
            API. Nothing is transmitted to any external server, third-party service, or cloud
            storage. We do not have access to your recordings or sessions.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">Microphone access</h2>
          <p>
            The extension requests microphone permission only when you click the{' '}
            <em>Speak</em> button to start a practice session. Audio is processed entirely in
            your browser and is never uploaded anywhere.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">Data sharing</h2>
          <p>We do not share, sell, or transmit any data to third parties.</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">
            Data retention and deletion
          </h2>
          <p>
            You can delete individual sessions or all stored data at any time from the extension
            popup. Uninstalling the extension removes all locally stored data automatically.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">Permissions used</h2>
          <ul className="flex flex-col gap-2 pl-4 border-l border-border">
            <li>
              <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">
                storage / unlimitedStorage
              </code>{' '}
              — to save sessions and audio recordings locally.
            </li>
            <li>
              <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">
                contextMenus
              </code>{' '}
              — to add a right-click option for opening a practice session.
            </li>
            <li>
              <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">activeTab</code>{' '}
              — to read selected text on the current page.
            </li>
            <li>
              <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">
                host_permissions (&lt;all_urls&gt;)
              </code>{' '}
              — to inject the practice panel on any webpage you choose to practice on.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">
            Children&apos;s privacy
          </h2>
          <p>
            This extension is not directed at children under 13 and does not knowingly collect
            data from them.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">Changes to this policy</h2>
          <p>
            If this policy changes materially, the updated version will be published at this URL
            and the extension&apos;s version number will be bumped.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">Contact</h2>
          <p>
            Questions? Reach out via{' '}
            <a
              href="/contact"
              className="text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity"
            >
              the contact page
            </a>
            {' '}or the Chrome Web Store listing.
          </p>
        </section>
      </div>
    </main>
  )
}
