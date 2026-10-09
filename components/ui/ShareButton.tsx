"use client";

import React, { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { ShareIcon } from "@/components/icons";

type ShareButtonProps = {
  title?: string;
  text?: string;
  url?: string;
  label?: string;
  className?: string;
  copiedText?: string;
};

export function ShareButton({
  title,
  text,
  url,
  label = "Share this page",
  className,
  copiedText = "Link copied",
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = useCallback((value: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(value);
    }
    return new Promise<void>((resolve, reject) => {
      try {
        const ta = document.createElement("textarea");
        ta.value = value;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.top = "-1000px";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(ta);
        ok ? resolve() : reject(new Error("copy failed"));
      } catch (err) {
        reject(err);
      }
    });
  }, []);

  const handleClick = useCallback(async () => {
    const shareUrl = url || window.location.href;
    const shareTitle = title || document.title;
    const shareData: ShareData = { title: shareTitle, url: shareUrl };
    if (text) shareData.text = text;

    const nav = navigator as Navigator & { share?: (data: ShareData) => Promise<void> };

    if (typeof nav.share === "function") {
      try {
        await nav.share(shareData);
        return;
      } catch (err) {
        // user dismissed the share sheet -> stop; any other error -> fall back to copy
        if (err instanceof DOMException && err.name === "AbortError") return;
      }
    }

    try {
      await copyToClipboard(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable (e.g. insecure context) -> silently ignore
    }
  }, [copyToClipboard, text, title, url]);

  const baseClass =
    "relative rounded-full border border-transparent bg-white/5 p-2 text-slate-200/80 transition hover:-translate-y-[1px] hover:bg-white/10 hover:text-white hover:border-sky-300 focus-visible:border-sky-300 focus-visible:ring-1 focus-visible:ring-sky-300 focus-visible:ring-offset-0 focus-ring motion-reduce:transform-none";

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      title={label}
      className={cn(baseClass, className)}
    >
      <ShareIcon className="h-4 w-4" />
      <span
        role="status"
        aria-live="polite"
        className={cn(
          "pointer-events-none absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-slate-800 px-2 py-1 text-[10px] font-medium text-white shadow-lg transition duration-200",
          copied ? "opacity-100" : "opacity-0",
        )}
      >
        {copiedText}
      </span>
    </button>
  );
}
