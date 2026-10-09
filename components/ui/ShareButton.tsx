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
  copiedText = "\u5df2\u590d\u5236\u94fe\u63a5",
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
    const rawUrl = url || window.location.href;
    // never share an insecure link
    const shareUrl = /^http:\/\/(localhost|127\.0\.0\.1)/i.test(rawUrl)
      ? rawUrl
      : rawUrl.replace(/^http:\/\//i, "https://");
    const shareTitle = title || document.title;
    const shareData: ShareData = { title: shareTitle, url: shareUrl };
    if (text) shareData.text = text;

    const nav = navigator as Navigator & { share?: (data: ShareData) => Promise<void> };

    if (typeof nav.share === "function") {
      try {
        await nav.share(shareData);
        return;
      } catch (err) {
        // user dismissed the native share sheet -> stop
        if (err instanceof DOMException && err.name === "AbortError") return;
      }
    }

    try {
      await copyToClipboard(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable -> silently ignore
    }
  }, [copyToClipboard, text, title, url]);

  const baseClass =
    "relative rounded-full border border-transparent bg-white/5 p-2 text-slate-200/80 transition hover:-translate-y-[1px] hover:bg-white/10 hover:text-white hover:border-sky-300 focus-visible:border-sky-300 focus-visible:ring-1 focus-visible:ring-sky-300 focus-visible:ring-offset-0 focus-ring motion-reduce:transform-none";

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        aria-label={label}
        title={label}
        className={cn(baseClass, className)}
      >
        <ShareIcon className="h-4 w-4" />
      </button>

      {copied ? (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
          <div className="fade-up rounded-xl border border-white/10 bg-slate-800/95 px-6 py-3 text-sm font-medium text-white shadow-2xl backdrop-blur">
            {copiedText}
          </div>
        </div>
      ) : null}
    </>
  );
}
