"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Mail, MessageSquare, Tag, User } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import type { ContactSubject } from "@/types";

const SUBJECTS: ContactSubject[] = ["project", "consulting", "collaboration", "other"];

interface ContactComposerProps {
  /** Destination email (Ricardo's inbox). */
  email: string;
  /** International WhatsApp number without `+`, if configured. */
  whatsappNumber?: string;
}

/**
 * Contact composer used when email delivery (Resend) is not configured.
 *
 * Instead of a server-backed form that can't send, the visitor writes their
 * message here and hands it off to a real channel with the text pre-filled:
 * WhatsApp, or email (Gmail's web composer on desktop, the `mailto:` handler on
 * touch devices). Nothing is submitted to the server — the message travels in
 * the chosen channel's URL, so it always works.
 */
export const ContactComposer = ({ email, whatsappNumber }: ContactComposerProps) => {
  const t = useTranslations("contact");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState<ContactSubject>("project");
  const [message, setMessage] = useState("");

  const ready = message.trim().length > 0;

  const subjectLabel = t(`form.subjects.${subject}`);
  const signature = name.trim() ? `\n\n— ${name.trim()}` : "";
  const emailSubject = `[ricardotapia.dev] ${subjectLabel}${name.trim() ? ` — ${name.trim()}` : ""}`;
  const emailBody = `${message.trim()}${signature}`;

  const openEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!ready) return;
    const su = encodeURIComponent(emailSubject);
    const body = encodeURIComponent(emailBody);
    // Touch devices get the native mail app; desktop opens Gmail's web composer.
    const isTouch = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
    const href = isTouch
      ? `mailto:${email}?subject=${su}&body=${body}`
      : `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${su}&body=${body}`;
    window.open(href, "_blank", "noopener,noreferrer");
  };

  const openWhatsApp = () => {
    if (!ready || !whatsappNumber) return;
    const greeting = name.trim() ? `Hola Ricardo, soy ${name.trim()}.` : "Hola Ricardo.";
    const text = encodeURIComponent(`${greeting} (${subjectLabel})\n\n${message.trim()}`);
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={openEmail} className="space-y-5">
      <p className="text-foreground-muted text-sm">{t("composer.note")}</p>

      <div>
        <Label htmlFor="name">
          <User className="mr-1.5 inline h-3.5 w-3.5" />
          {t("form.name")}
        </Label>
        <Input
          id="name"
          name="name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tu nombre"
        />
      </div>

      <div>
        <Label htmlFor="subject">
          <Tag className="mr-1.5 inline h-3.5 w-3.5" />
          {t("form.subject")}
        </Label>
        <Select
          id="subject"
          name="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value as ContactSubject)}
        >
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {t(`form.subjects.${s}`)}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <Label htmlFor="message">
          <MessageSquare className="mr-1.5 inline h-3.5 w-3.5" />
          {t("form.message")}
        </Label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Cuéntame sobre tu proyecto..."
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {whatsappNumber && (
          <Button
            type="button"
            onClick={openWhatsApp}
            disabled={!ready}
            className="group bg-[#25D366] text-white shadow-lg shadow-[#25D366]/20 hover:bg-[#1ebe5b]"
          >
            <FaWhatsapp className="h-4 w-4" />
            {t("composer.whatsappBtn")}
          </Button>
        )}
        <Button
          type="submit"
          disabled={!ready}
          variant={whatsappNumber ? "secondary" : "primary"}
          className="group"
        >
          <Mail className="h-4 w-4" />
          {t("composer.emailBtn")}
        </Button>
      </div>
    </form>
  );
};
