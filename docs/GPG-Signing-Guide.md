# GPG Signing Guide

## Documentation index

Please familiarise yourself with our:

- [Code of conduct](https://github.com/bbc/simorgh/blob/latest/.github/CODE_OF_CONDUCT.md)
- [Code Standards](https://github.com/bbc/simorgh/blob/latest/docs/Code-Standards.md)
- [Contributing guidelines](https://github.com/bbc/simorgh/blob/latest/CONTRIBUTING.md)
- [Github Project Board Guide](https://github.com/bbc/simorgh/blob/latest/docs/Project-Board-Guide.md)
- [GPG Signing Guide](docs/GPG-Signing-Guide.md) (you are here)
- [Primary README](https://github.com/bbc/simorgh/blob/latest/README.md)

This document explains how to set up GPG Signing on MacOS for Simorgh and its relating projects.

## Why?

GPG Signing is an added layer of security to commits. By enforcing a GPG signature on the key, Github verifies that the commits are indeed written by you. (As long as you keep the private side of the key secure)
You can also use your GPG key to sign messages, files and even your emails. But for the purpose of this doc we are only interested in commits.

## How?

Setting up GPG on a MacOS is actually quite simple. Please follow the links for the detailed documentation given by Github.

1. [Download and install GPG Tools](https://gpgtools.org/)
2. [Uninstall GPG Tools Mail](https://gpgtools.tenderapp.com/kb/faq/uninstall-gpg-suite#2-uninstall-gpgmail)
3. Open the app and create a new key pair
   - The application will automatically prompt you
4. [Add your public GPG key to GitHub](https://help.github.com/en/articles/adding-a-new-gpg-key-to-your-github-account)
5. [Tell git about the gpg sign](https://help.github.com/en/articles/telling-git-about-your-signing-key)
6. [Turn on commit signing](https://help.github.com/en/articles/signing-commits)

## Automatic Signing

In your local repository you can turn on automatic signing with this command:

```
git config commit.gpgsign true
```

If you want git to globally sign all commits that you make use this command:

```
git config --global commit.gpgsign true
```

## Signing failures

1. Make sure you follow the following step: https://help.github.com/en/articles/telling-git-about-your-signing-key
2. Install Pineentry from [link](https://www.gnupg.org/related_software/pinentry/index.en.html) or `homebrew`

```
brew install pinentry-mac
```
