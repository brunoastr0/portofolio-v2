import { useState } from "react";
import type { PostLanguage } from "@/lib/posts";

interface ShareButtonsProps {
  title: string;
  description: string;
  url: string;
  language: PostLanguage;
}

export function ShareButtons({ title, description, url, language }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const labels = language === "pt"
    ? { heading: "Partilhar artigo", native: "Partilhar", copy: "Copiar ligação", copied: "Ligação copiada" }
    : { heading: "Share this article", native: "Share", copy: "Copy link", copied: "Link copied" };

  const shareLinks = [
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
    },
  ];

  async function share() {
    if (!navigator.share) {
      await copyLink();
      return;
    }

    try {
      await navigator.share({ title, text: description, url });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      await copyLink();
    }
  }

  async function copyLink() {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = url;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      textArea.remove();
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <aside className="mx-auto mt-12 max-w-3xl border-y border-line py-6" aria-label={labels.heading}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium uppercase tracking-widest text-ink-faint">{labels.heading}</p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={share}
            className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-canvas transition-colors hover:bg-ink-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          >
            {labels.native}
          </button>
          {shareLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={copyLink}
            aria-live="polite"
            className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          >
            {copied ? labels.copied : labels.copy}
          </button>
        </div>
      </div>
    </aside>
  );
}
