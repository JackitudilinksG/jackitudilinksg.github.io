'use client';

import { useState } from 'react';
import styles from '../styles/ContactForm.module.css';

type Step = 'form' | 'verify' | 'done';

export default function ContactForm() {
  const [step, setStep]       = useState<Step>('form');
  const [email, setEmail]     = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody]       = useState('');
  const [otp, setOtp]         = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  async function sendOTP() {
    if (!email || !subject || !body) {
      setError('Please fill in all fields before verifying.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res  = await fetch('/api/send-otp', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setStep('verify');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to send code.');
    } finally {
      setLoading(false);
    }
  }

  async function sendMessage() {
    if (!otp) { setError('Enter the verification code.'); return; }
    setError('');
    setLoading(true);
    try {
      const res  = await fetch('/api/send-message', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, otp, subject, body }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setStep('done');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to send message.');
    } finally {
      setLoading(false);
    }
  }

  if (step === 'done') {
    return (
      <div className={styles.done}>
        <span className={styles.doneIcon}>✓</span>
        <p className={styles.doneTitle}>Message sent</p>
        <p className={styles.doneSub}>I'll get back to you as soon as I can.</p>
      </div>
    );
  }

  return (
    <div className={styles.form}>
      <p className={styles.formLabel}>Send a message</p>

      {step === 'form' && (
        <>
          <div className={styles.field}>
            <label className={styles.fieldLabel}>Your email</label>
            <input
              className={styles.input}
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.fieldLabel}>Subject</label>
            <input
              className={styles.input}
              type="text"
              placeholder="What's this about?"
              value={subject}
              onChange={e => setSubject(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.fieldLabel}>Message</label>
            <textarea
              className={`${styles.input} ${styles.textarea}`}
              placeholder="Write your message here..."
              rows={5}
              value={body}
              onChange={e => setBody(e.target.value)}
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button
            className={styles.btn}
            onClick={sendOTP}
            disabled={loading}
          >
            {loading ? 'Sending code…' : 'Verify email & continue →'}
          </button>
        </>
      )}

      {step === 'verify' && (
        <>
          <p className={styles.verifyNote}>
            A 6-digit code was sent to <strong>{email}</strong>. Enter it below to send your message.
          </p>

          <div className={styles.field}>
            <label className={styles.fieldLabel}>Verification code</label>
            <input
              className={`${styles.input} ${styles.otpInput}`}
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="123456"
              value={otp}
              onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.btnRow}>
            <button
              className={`${styles.btn} ${styles.btnSecondary}`}
              onClick={() => { setStep('form'); setError(''); setOtp(''); }}
            >
              ← Back
            </button>
            <button
              className={styles.btn}
              onClick={sendMessage}
              disabled={loading}
            >
              {loading ? 'Sending…' : 'Send message →'}
            </button>
          </div>

          <button
            className={styles.resend}
            onClick={sendOTP}
            disabled={loading}
          >
            Resend code
          </button>
        </>
      )}
    </div>
  );
}