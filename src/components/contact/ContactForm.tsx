import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { CheckCircle2, Loader2, Send, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type FormValues = {
  name: string;
  email: string;
  message: string;
};

type Status = 'idle' | 'sending' | 'success' | 'error';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS = { name: 120, email: 254, message: 4000 };

const emptyValues: FormValues = { name: '', email: '', message: '' };

function validate(values: FormValues): string | null {
  if (!values.name.trim()) return 'Please add your name.';
  if (values.name.trim().length > LIMITS.name) return 'Your name is a little too long.';
  if (!EMAIL_PATTERN.test(values.email.trim()) || values.email.trim().length > LIMITS.email) {
    return 'Please enter a valid email address.';
  }
  if (!values.message.trim()) return 'Please tell me a little about your idea.';
  if (values.message.trim().length > LIMITS.message) return 'Your message is too long to send.';
  return null;
}

const fieldClasses =
  'w-full rounded-2xl border border-white/10 bg-ink-950/60 px-5 py-4 text-base text-ink-100 placeholder:text-ink-500 transition-colors duration-300 focus:border-electric-400/70 focus:outline-none focus:ring-4 focus:ring-electric-500/15';

export default function ContactForm() {
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const submittingRef = useRef(false);

  const updateField = (field: keyof FormValues) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submittingRef.current) return;

    const validationError = validate(values);
    if (validationError) {
      setErrorMessage(validationError);
      setStatus('error');
      return;
    }

    submittingRef.current = true;
    setStatus('sending');
    setErrorMessage(null);

    try {
      const { data, error } = await supabase.functions.invoke<{ ok: boolean }>('send-contact-email', {
        body: {
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
        },
      });

      if (error || data?.ok !== true) {
        setErrorMessage('Your message could not be delivered. Please check your connection and try again.');
        setStatus('error');
        return;
      }

      setValues(emptyValues);
      setStatus('success');
    } finally {
      submittingRef.current = false;
    }
  };

  if (status === 'success') {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center gap-6 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-success-500/15">
          <CheckCircle2 className="h-8 w-8 text-success-400" />
        </span>
        <div className="flex flex-col gap-3">
          <h3 className="font-display text-3xl font-bold uppercase text-ink-100">Message sent successfully</h3>
          <p className="max-w-sm text-base leading-relaxed text-ink-300">
            Thank you for reaching out. I will get back to you as soon as I can.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          data-cursor="hover"
          className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-ink-100 transition-colors hover:bg-white/10"
        >
          Send another message
        </button>
      </div>
    );
  }

  const sending = status === 'sending';

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-ink-200">Name</span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={updateField('name')}
            placeholder="Your name"
            maxLength={LIMITS.name}
            className={fieldClasses}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-ink-200">Email</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            value={values.email}
            onChange={updateField('email')}
            placeholder="you@example.com"
            maxLength={LIMITS.email}
            className={fieldClasses}
          />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-ink-200">Project or idea</span>
        <textarea
          name="message"
          rows={6}
          value={values.message}
          onChange={updateField('message')}
          placeholder="Tell me about your idea, timeline and what you have in mind."
          maxLength={LIMITS.message}
          className={`${fieldClasses} resize-none`}
        />
      </label>

      {errorMessage && (
        <p role="alert" className="flex items-start gap-3 rounded-2xl border border-error-500/30 bg-error-500/10 px-5 py-4 text-sm text-error-400">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        data-cursor="hover"
        className="group inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-electric-500 via-hotpink-500 to-sunset-500 px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-ink-950 shadow-[0_0_40px_-10px_rgba(255,46,136,0.7)] transition-all duration-300 hover:shadow-[0_0_60px_-6px_rgba(255,46,136,0.9)] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {sending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending
          </>
        ) : (
          <>
            Send message
            <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
          </>
        )}
      </button>
    </form>
  );
}
