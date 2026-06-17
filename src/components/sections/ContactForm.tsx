"use client";

import { useActionState, useEffect, useRef, useState, useTransition, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Mail, MessageSquare, Send, Tag, User } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { contactAction } from "@/actions/contact";
import { useRecaptcha } from "@/lib/recaptcha-client";
import type { ContactResult, ContactSubject } from "@/types";

const SUBJECTS: ContactSubject[] = ["project", "consulting", "collaboration", "other"];

interface ContactFormProps {
  /** Destination email (passed from the server to use the real env value). */
  email: string;
  /** Whether email delivery (Resend) is configured; enables the Server Action. */
  live: boolean;
  /** Public reCAPTCHA v3 site key, if configured. */
  recaptchaSiteKey?: string;
}

/**
 * Contact form.
 *
 * When `live` is true the submission goes through the `contactAction` Server
 * Action (Resend + reCAPTCHA + rate limit). Otherwise it composes a `mailto:`
 * link as a graceful fallback, so the form is useful before any integration is
 * configured.
 */
export const ContactForm = ({ email, live, recaptchaSiteKey }: ContactFormProps) => {
  const t = useTranslations("contact.form");
  const [state, formAction] = useActionState<ContactResult | null, FormData>(contactAction, null);
  const [isPending, startTransition] = useTransition();
  const { getToken } = useRecaptcha(recaptchaSiteKey);
  const formRef = useRef<HTMLFormElement>(null);

  // mailto fallback state (used when `live` is false)
  const [mailtoSent, setMailtoSent] = useState(false);

  useEffect(() => {
    if (state?.success) formRef.current?.reset();
  }, [state]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = e.currentTarget;

    if (!live) {
      const data = new FormData(formEl);
      const name = String(data.get("name") ?? "");
      const subjectKey = String(data.get("subject") ?? "other");
      const message = String(data.get("message") ?? "");
      const from = String(data.get("email") ?? "");
      const subject = `[ricardotapia.dev] ${t(`subjects.${subjectKey}`)} — ${name}`;
      const body = `${message}\n\n— ${name} (${from})`;
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setMailtoSent(true);
      return;
    }

    const fd = new FormData(formEl);
    if (recaptchaSiteKey) {
      const token = await getToken("contact");
      if (token) fd.set("recaptchaToken", token);
    }
    startTransition(() => formAction(fd));
  };

  const success = live ? state?.success === true : mailtoSent;
  const errorCode = live && state && !state.success ? state.error : undefined;

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
      <div>
        <Label htmlFor="name">
          <User className="mr-1.5 inline h-3.5 w-3.5" />
          {t("name")}
        </Label>
        <Input id="name" name="name" autoComplete="name" required placeholder="Tu nombre" />
      </div>

      <div>
        <Label htmlFor="email">
          <Mail className="mr-1.5 inline h-3.5 w-3.5" />
          {t("email")}
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="tu@correo.com"
        />
      </div>

      <div>
        <Label htmlFor="subject">
          <Tag className="mr-1.5 inline h-3.5 w-3.5" />
          {t("subject")}
        </Label>
        <Select id="subject" name="subject" defaultValue="project">
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {t(`subjects.${s}`)}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <Label htmlFor="message">
          <MessageSquare className="mr-1.5 inline h-3.5 w-3.5" />
          {t("message")}
        </Label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Cuéntame sobre tu proyecto..."
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={isPending} className="group shadow-primary/20 shadow-lg">
          {isPending ? t("sending") : t("submit")}
          <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Button>
        {success && <span className="text-success font-mono text-xs">{t("success")}</span>}
        {errorCode && (
          <span className="text-error font-mono text-xs">{t(`errors.${errorCode}`)}</span>
        )}
      </div>
    </form>
  );
};
