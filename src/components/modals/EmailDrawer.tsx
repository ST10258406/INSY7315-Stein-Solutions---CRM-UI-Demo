import React, { useState, useRef, useEffect } from 'react';
import { X, Mail, Paperclip, Send, ThumbsUp, Reply, CornerUpRight, Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { EmailMessage, EmailAttachment } from '@/types/crm';

interface EmailDrawerProps {
  isOpen: boolean;
  donorName: string;
  contactName: string;
  contactEmail: string;
  emails: EmailMessage[];
  attachments: EmailAttachment[];
  onClose: () => void;
  onSendEmail: (subject: string, body: string, replyId?: number) => void;
}

export const EmailDrawer: React.FC<EmailDrawerProps> = ({
  isOpen,
  donorName,
  contactName,
  contactEmail,
  emails,
  attachments,
  onClose,
  onSendEmail,
}) => {
  const [activeTab, setActiveTab] = useState<'emails' | 'attachments'>('emails');
  const [hasRecipient, setHasRecipient] = useState(true);
  const [toDraft, setToDraft] = useState('');
  const [subjectDraft, setSubjectDraft] = useState('');
  const [bodyDraft, setBodyDraft] = useState('');
  const [replyTo, setReplyTo] = useState<EmailMessage | null>(null);

  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (feedRef.current && activeTab === 'emails') {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [emails, activeTab, isOpen]);

  if (!isOpen) return null;

  const handleSend = () => {
    if (!bodyDraft.trim()) return;
    const finalSubject = replyTo
      ? `Re: ${replyTo.subject.replace(/^Re:\s*/, '')}`
      : subjectDraft.trim() || '(no subject)';

    onSendEmail(finalSubject, bodyDraft.trim(), replyTo?.id);
    setBodyDraft('');
    setSubjectDraft('');
    setReplyTo(null);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 bg-[#0C0C0A]/42 backdrop-blur-xs animate-email-fade"
      />

      {/* Drawer */}
      <aside className="fixed top-0 right-0 bottom-0 z-51 w-[620px] max-w-[92vw] bg-[var(--card)] border-l border-[var(--border)] shadow-[-24px_0_60px_rgba(12,12,10,0.28)] flex flex-col animate-email-slide">
        {/* Header */}
        <div className="shrink-0 p-5.5 pb-0 border-b border-[var(--divider)]">
          <div className="flex items-start justify-between gap-3.5">
            <div className="min-w-0">
              <h2 className="m-0 text-xl font-extrabold tracking-tight text-[var(--ink)]">
                {donorName} <span className="text-[var(--muted2)] font-semibold">—</span> Email Thread
              </h2>
              <p className="m-0 mt-1 text-xs font-medium text-[var(--muted)]">
                {contactName} · {contactEmail}
              </p>
            </div>
            <button
              onClick={onClose}
              title="Close"
              className="shrink-0 w-9 h-9 rounded-full border border-[var(--border)] bg-[var(--card)] flex items-center justify-center cursor-pointer text-[var(--icon)] hover:bg-[var(--hover)] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Sub-Tabs */}
          <div className="flex items-center gap-0.5 mt-4">
            <button
              onClick={() => setActiveTab('emails')}
              className={`flex items-center gap-1.5 py-2.5 px-3.5 border-b-2 text-13 font-bold cursor-pointer transition-colors ${
                activeTab === 'emails'
                  ? 'text-[var(--ink)] border-[#FADF01]'
                  : 'text-[var(--muted2)] border-transparent hover:text-[var(--ink)]'
              }`}
            >
              <span>Emails</span>
              {emails.length > 0 && (
                <span className="min-w-[18px] h-[18px] px-1.5 rounded-full bg-[var(--chip)] text-[var(--muted)] text-[10.5px] font-bold inline-flex items-center justify-center">
                  {emails.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('attachments')}
              className={`flex items-center gap-1.5 py-2.5 px-3.5 border-b-2 text-13 font-bold cursor-pointer transition-colors ${
                activeTab === 'attachments'
                  ? 'text-[var(--ink)] border-[#FADF01]'
                  : 'text-[var(--muted2)] border-transparent hover:text-[var(--ink)]'
              }`}
            >
              <span>Attachments</span>
              <span className="min-w-[18px] h-[18px] px-1.5 rounded-full bg-[var(--chip)] text-[var(--muted)] text-[10.5px] font-bold inline-flex items-center justify-center">
                {attachments.length}
              </span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'emails' ? (
          <>
            {/* Email Message History */}
            <div
              ref={feedRef}
              className="flex-1 min-h-0 overflow-y-auto p-5.5 bg-[var(--soft)] flex flex-col gap-3.5"
            >
              <div className="self-center px-3.5 py-1.25 rounded-xl bg-[var(--chip)] text-[11px] font-bold text-[var(--muted)] tracking-wider">
                THREAD STARTED 24 JUL 2026
              </div>

              {emails.map((em) => (
                <article
                  key={em.id}
                  className="bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-[0_1px_3px_var(--shadow)] p-4.5"
                >
                  {/* Sender Info */}
                  <div className="flex items-center gap-2.5">
                    <span
                      className="shrink-0 w-9 h-9 rounded-full text-white text-xs font-bold flex items-center justify-center"
                      style={{ backgroundColor: em.avatarBg }}
                    >
                      {em.initials}
                    </span>
                    <div className="min-w-0 leading-tight">
                      <div className="flex items-center gap-1.75 flex-wrap">
                        <span className="text-[13.5px] font-bold text-[var(--ink)]">{em.sender}</span>
                        <Mail className="w-3.25 h-3.25 text-[var(--muted2)]" />
                        {em.forwarded && (
                          <span className="px-2 py-0.5 rounded-md bg-[var(--chip)] text-[10.5px] font-bold text-[var(--pill-ink)] inline-flex items-center gap-1">
                            <CornerUpRight className="w-2.75 h-2.75" />
                            <span>Forwarded</span>
                          </span>
                        )}
                      </div>
                      {em.fromLine && (
                        <div className="text-[11.5px] text-[var(--muted)] font-medium mt-0.5">
                          From: {em.fromLine}
                        </div>
                      )}
                    </div>
                    <span className="ml-auto shrink-0 text-[11.5px] text-[var(--muted2)] font-semibold">
                      {em.age}
                    </span>
                  </div>

                  {/* Subject & Body */}
                  <div className="mt-3">
                    <div className="text-[13.5px] font-bold text-[var(--ink)] mb-1.5">{em.subject}</div>
                    <div className="text-[13px] leading-relaxed text-[var(--ink)] font-medium whitespace-pre-line">
                      {em.body}
                    </div>
                  </div>

                  {/* Signature */}
                  {em.signature && (
                    <div className="mt-3.5 p-3 border-l-3 border-[#FADF01] bg-[var(--field)] rounded-r-xl flex items-center gap-3">
                      <img
                        src="/assets/avatar-keegan.svg"
                        alt=""
                        className="w-10.5 h-10.5 rounded-full object-cover block"
                      />
                      <div className="leading-snug">
                        <div className="text-xs font-bold text-[var(--ink)]">{em.sigName}</div>
                        <div className="text-[11.5px] text-[var(--muted)] font-medium">{em.sigTitle}</div>
                        <div className="text-[11.5px] text-[var(--muted)] font-medium">{em.sigPhone}</div>
                      </div>
                    </div>
                  )}

                  {/* Quick Actions */}
                  <div className="flex items-center gap-4 mt-3 pt-2.75 border-t border-[var(--hair)]">
                    <button className="flex items-center gap-1.25 border-none bg-none p-0 text-xs font-semibold text-[var(--muted2)] hover:text-[var(--ink)] cursor-pointer">
                      <ThumbsUp className="w-3.25 h-3.25" />
                      <span>Like</span>
                    </button>
                    <button
                      onClick={() => setReplyTo(em)}
                      className="flex items-center gap-1.25 border-none bg-none p-0 text-xs font-semibold text-[var(--muted2)] hover:text-[var(--ink)] cursor-pointer"
                    >
                      <Reply className="w-3.25 h-3.25" />
                      <span>Reply</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* Live Composer */}
            <div className="shrink-0 border-t border-[var(--border)] bg-[var(--card)] p-4.5 px-6">
              {/* To Row */}
              <div className="flex items-center gap-2.5 pb-2.5 border-b border-[var(--hair)]">
                <span className="text-xs font-bold text-[var(--muted2)] shrink-0">To:</span>
                {hasRecipient ? (
                  <span className="inline-flex items-center gap-1.75 h-7.5 px-1.5 pl-[4px] rounded-full bg-[var(--chip)] text-[12.5px] font-semibold">
                    <span className="w-5.5 h-5.5 rounded-full bg-[#7A3B4E] text-white text-[9px] font-bold flex items-center justify-center">
                      DM
                    </span>
                    <span>{contactEmail}</span>
                    <button
                      onClick={() => setHasRecipient(false)}
                      title="Remove"
                      className="w-4.5 h-4.5 rounded-full border-none bg-none flex items-center justify-center cursor-pointer p-0 hover:bg-[var(--hover)]"
                    >
                      <X className="w-2.5 h-2.5 text-[var(--muted)]" />
                    </button>
                  </span>
                ) : (
                  <input
                    value={toDraft}
                    onChange={(e) => setToDraft(e.target.value)}
                    placeholder="Add recipient email"
                    className="flex-1 border-none bg-none text-[12.5px] font-medium text-[var(--ink)] outline-none py-1"
                  />
                )}
              </div>

              {/* Mode Specific Headers */}
              {replyTo ? (
                <div className="flex items-center gap-2 py-2 border-b border-[var(--hair)]">
                  <span className="px-2.5 py-0.75 rounded-md bg-[var(--chip)] text-[10.5px] font-bold text-[var(--pill-ink)]">
                    Re: {replyTo.subject}
                  </span>
                  <button
                    onClick={() => setReplyTo(null)}
                    className="border-none bg-none p-0 text-[11.5px] font-semibold text-[var(--muted2)] hover:text-[var(--ink)] cursor-pointer"
                  >
                    New email instead
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2.5 py-2 border-b border-[var(--hair)]">
                  <span className="text-xs font-bold text-[var(--muted2)] shrink-0">Subject:</span>
                  <input
                    value={subjectDraft}
                    onChange={(e) => setSubjectDraft(e.target.value)}
                    placeholder="Add a subject"
                    className="flex-1 border-none bg-none text-[12.5px] font-semibold text-[var(--ink)] outline-none py-0.5"
                  />
                </div>
              )}

              {/* Textarea Body */}
              <textarea
                value={bodyDraft}
                onChange={(e) => setBodyDraft(e.target.value)}
                placeholder="Write your message..."
                rows={3}
                className="w-full border-none bg-none resize-none text-13 font-medium leading-relaxed text-[var(--ink)] outline-none pt-3 pb-1"
              />

              {/* Actions Footer */}
              <div className="flex items-center gap-1 mt-1.5">
                <button
                  title="Bold"
                  className="w-8 h-8 rounded-lg border-none bg-none flex items-center justify-center cursor-pointer font-extrabold text-13 text-[var(--icon)] hover:bg-[var(--hover)]"
                >
                  B
                </button>
                <button
                  title="Italic"
                  className="w-8 h-8 rounded-lg border-none bg-none flex items-center justify-center cursor-pointer font-serif italic font-semibold text-sm text-[var(--icon)] hover:bg-[var(--hover)]"
                >
                  I
                </button>
                <button
                  title="Attach file"
                  className="w-8 h-8 rounded-lg border-none bg-none flex items-center justify-center cursor-pointer text-[var(--icon)] hover:bg-[var(--hover)]"
                >
                  <Paperclip className="w-3.75 h-3.75" />
                </button>

                <Button
                  variant="default"
                  onClick={handleSend}
                  className="ml-auto flex items-center gap-1.75 h-10 px-5 rounded-full text-xs font-bold"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </Button>
              </div>
            </div>
          </>
        ) : (
          /* Attachments View */
          <div className="flex-1 min-h-0 overflow-y-auto bg-[var(--soft)] p-5.5 flex flex-col gap-2.5">
            {attachments.map((at, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-[var(--card)] border border-[var(--border)] rounded-xl p-3.5 shadow-[0_1px_3px_var(--shadow)]"
              >
                <div className="w-9.5 h-9.5 rounded-lg bg-[var(--icon-bg)] flex items-center justify-center shrink-0">
                  <FileText className="w-4.5 h-4.5 text-[var(--icon)]" />
                </div>
                <div className="min-w-0 leading-snug">
                  <div className="text-13 font-bold text-[var(--ink)] truncate">{at.name}</div>
                  <div className="text-[11.5px] color-[var(--muted)] font-medium">{at.meta}</div>
                </div>
                <button
                  title="Download attachment"
                  className="ml-auto shrink-0 w-8.5 h-8.5 rounded-full border border-[var(--border)] bg-[var(--card)] flex items-center justify-center cursor-pointer text-[var(--icon)] hover:bg-[var(--hover)] transition-colors"
                >
                  <Download className="w-3.75 h-3.75" />
                </button>
              </div>
            ))}
          </div>
        )}
      </aside>
    </>
  );
};
