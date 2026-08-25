# Locker Mate — support site

The support page and privacy policy for **Locker Mate**, a gym locker timer for
iPhone. Served by GitHub Pages.

- `index.html` — support page and FAQ, used as the App Store **Support URL**
- `privacy.html` — privacy policy, used as the App Store **Privacy Policy URL**
- `style.css` — palette lifted from the app's `DesignSystem.swift`, light and dark
- `mark.png` — the app icon

This repository is public **only** so GitHub Pages can serve it for free. It
contains no application code; the app itself lives in a separate private
repository.

Unlike the Serenity support site, this privacy policy is not a short one, because
the app is not a "collects nothing" app. Locker Mate stores everything it records
on the device and uploads none of it — but it also serves ads through Google
AdMob, which means a third party processes device data, the IDFA is involved when
the user permits it, and both App Tracking Transparency and Google's UK/EU consent
form apply. The policy has to describe all of that accurately, because Apple
compares it against the App Privacy answers given in App Store Connect.

**If the app's data behaviour changes, this policy has to change with it** — in
particular if an analytics SDK is ever added, if ads are removed, or if anything
starts being sent to a server.
