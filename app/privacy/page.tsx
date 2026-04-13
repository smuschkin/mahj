import { PageWrap } from "@/components/PageWrap";
import { Cover } from "@/components/Cover";

export const metadata = {
  title: "Privacy Policy — MAHJ",
  description: "MAHJ privacy policy. We don't collect any personal data.",
};

export default function PrivacyPage() {
  return (
    <PageWrap>
      <Cover
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="Short version: we don't collect anything"
      />

      <div className="prose space-y-6 rounded-xl bg-white p-6 shadow-sm sm:p-8">
        <p className="text-[15px] text-zinc-500">
          <strong>Last updated:</strong> April 10, 2026
        </p>

        <section>
          <h2 className="font-serif text-xl font-black text-[var(--color-dark)]">
            The short version
          </h2>
          <p className="mt-2 text-[15px] leading-relaxed text-zinc-700">
            MAHJ is an educational app that teaches American Mahjong. We don&apos;t
            collect your name, email, location, or any other personal information.
            We don&apos;t use analytics, tracking, ads, or third-party services
            that could identify you. Your learning progress is saved only on your
            device and never leaves it.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-black text-[var(--color-dark)]">
            What we store
          </h2>
          <p className="mt-2 text-[15px] leading-relaxed text-zinc-700">
            MAHJ stores your lesson progress, quiz scores, and completion
            timestamps locally on your device using your browser&apos;s built-in
            storage (localStorage). This data never leaves your device and is
            never sent to us or anyone else.
          </p>
          <p className="mt-2 text-[15px] leading-relaxed text-zinc-700">
            You can clear this data at any time by tapping the &quot;Reset
            Progress&quot; button on the home screen, or by clearing your
            browser&apos;s site data.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-black text-[var(--color-dark)]">
            What we don&apos;t collect
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-6 text-[15px] leading-relaxed text-zinc-700">
            <li>Your name, email, phone number, or any contact information</li>
            <li>Your location</li>
            <li>Your device ID, advertising ID, or any tracking identifiers</li>
            <li>Analytics or usage data</li>
            <li>Contacts, photos, or any data from other apps</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl font-black text-[var(--color-dark)]">
            No third-party services
          </h2>
          <p className="mt-2 text-[15px] leading-relaxed text-zinc-700">
            MAHJ does not use any third-party analytics, advertising networks,
            crash reporting services, or tracking tools. The app runs entirely
            on your device once installed.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-black text-[var(--color-dark)]">
            Children&apos;s privacy
          </h2>
          <p className="mt-2 text-[15px] leading-relaxed text-zinc-700">
            MAHJ is safe for all ages. Because we don&apos;t collect any data
            from anyone, we comply with the Children&apos;s Online Privacy
            Protection Act (COPPA) by default.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-black text-[var(--color-dark)]">
            Changes to this policy
          </h2>
          <p className="mt-2 text-[15px] leading-relaxed text-zinc-700">
            If we ever change this policy, we&apos;ll update the date at the top
            of this page. Since MAHJ doesn&apos;t collect data, any changes would
            only be to clarify how the app continues not to collect data.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-black text-[var(--color-dark)]">
            Contact
          </h2>
          <p className="mt-2 text-[15px] leading-relaxed text-zinc-700">
            Questions about this policy? Email{" "}
            <a
              href="mailto:sara.muschkin@gmail.com"
              className="text-[var(--color-accent)] underline"
            >
              sara.muschkin@gmail.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-black text-[var(--color-dark)]">
            Not affiliated with NMJL
          </h2>
          <p className="mt-2 text-[15px] leading-relaxed text-zinc-700">
            MAHJ is an independent educational tool. It is not affiliated with,
            endorsed by, or sponsored by the National Mah Jongg League (NMJL®).
            To play official American Mahjong games, purchase the current
            year&apos;s card from{" "}
            <a
              href="https://www.nationalmahjonggleague.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-accent)] underline"
            >
              nationalmahjonggleague.org
            </a>
            .
          </p>
        </section>
      </div>
    </PageWrap>
  );
}
