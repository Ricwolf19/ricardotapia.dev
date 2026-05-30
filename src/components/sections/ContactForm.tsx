"use client";

import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Mail, MessageSquare, Send, Tag, User } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import type { ContactSubject } from "@/types";

const SUBJECTS: ContactSubject[] = ["project", "consulting", "collaboration", "other"];

const EASE = [0.22, 1, 0.36, 1] as const;
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const field = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

interface ContactFormProps {
  /** Email destino (pasado desde el server para usar la env real). */
  email: string;
}

/**
 * Formulario de contacto (UI rica). Hasta cablear el Server Action (Fase 2),
 * compone un `mailto:` con los datos -> ruta de contacto real y honesta.
 */
export const ContactForm = ({ email }: ContactFormProps) => {
  const t = useTranslations("contact.form");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const subjectKey = String(data.get("subject") ?? "other");
    const message = String(data.get("message") ?? "");
    const from = String(data.get("email") ?? "");

    const subject = `[ricardotapia.dev] ${t(`subjects.${subjectKey}`)} — ${name}`;
    const body = `${message}\n\n— ${name} (${from})`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-5"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      <motion.div variants={field}>
        <Label htmlFor="name">
          <User className="mr-1.5 inline h-3.5 w-3.5" />
          {t("name")}
        </Label>
        <Input id="name" name="name" autoComplete="name" required placeholder="Tu nombre" />
      </motion.div>

      <motion.div variants={field}>
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
      </motion.div>

      <motion.div variants={field}>
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
      </motion.div>

      <motion.div variants={field}>
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
      </motion.div>

      <motion.div variants={field} className="flex items-center gap-3">
        <Button type="submit" className="group shadow-primary/20 shadow-lg">
          {t("submit")}
          <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Button>
        {sent && (
          <motion.span
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-success font-mono text-xs"
          >
            {t("success")}
          </motion.span>
        )}
      </motion.div>
    </motion.form>
  );
};
