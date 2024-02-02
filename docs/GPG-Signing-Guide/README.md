# GPG Signing Guide

## Why?

GPG Signing is an added layer of security to commits. By enforcing a GPG signature on the key, Github verifies that the commits are indeed written by you. (As long as you keep the private side of the key secure)
You can also use your GPG key to sign messages, files and even your emails. But for the purpose of this doc we are only interested in commits.

## How?

Setting up GPG on a MacOS is actually quite simple. Please follow the links for the detailed documentation given by Github.

1. [Download and install GPG Tools](https://gpgtools.org/)
2. [Uninstall GPG Tools Mail](https://gpgtools.tenderapp.com/kb/faq/uninstall-gpg-suite#2-uninstall-gpgmail)
3. Open the app and create a new key pair
   - The application will automatically prompt you
4. [Add your public GPG key to GitHub](https://docs.github.com/en/authentication/managing-commit-signature-verification/adding-a-gpg-key-to-your-github-account)
5. [Tell git about the gpg sign](https://docs.github.com/en/authentication/managing-commit-signature-verification/telling-git-about-your-signing-key)
6. [Turn on commit signing](https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits)

## Automatic Signing

In your local repository you can turn on automatic signing with this command:

```sh
git config commit.gpgsign true
```

If you want git to globally sign all commits that you make use this command:

```sh
git config --global commit.gpgsign true
```

## Signing failures

1. Make sure you follow the following steps: https://docs.github.com/en/authentication/managing-commit-signature-verification/telling-git-about-your-signing-key
2. Install Pineentry from [link](https://www.gnupg.org/related_software/pinentry/index.en.html) or `homebrew`

```
brew install pinentry-mac
```

## Troubleshooting

### Unsigned commits in latest are preventing me from pushing my branch

Please refer to [these docs](https://github.com/bbc/simorgh/blob/latest/docs/Troubleshooting/README.md#unsigned-commits-in-latest-are-preventing-me-from-pushing-my-branch).

### I've signed my commits but I'm unable to push my changes to a remote branch

Make sure your GitHub email matches your email associated with GPG.
