import { useState, useCallback } from "react";
import { IconCheck } from "@/components/ui/Icons";
import { Modal } from "@/components/global/Modal";

const EMAIL = "support@focuslab.dev";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FeedbackModal = ({ isOpen, onClose }: FeedbackModalProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  return (
    <Modal open={isOpen} onClose={onClose} title="Feedback" maxWidth="max-w-md">
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Found an error, have a suggestion, or want to help improve our
          content? We'd love to hear from you.
        </p>
        <p className="text-sm text-gray-600">
          When reporting an issue, it helps to include the language, category,
          and the specific phrase or word so we can locate it quickly.
        </p>
        <a
          href={`mailto:${EMAIL}`}
          className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white bg-gray-900 rounded-xl hover:bg-gray-800 transition-colors"
        >
          Send email to {EMAIL}
        </a>
        <button
          onClick={handleCopy}
          className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
        >
          {copied ? (
            <>
              <IconCheck className="w-4 h-4" />
              <span className="">Copied!</span>
            </>
          ) : (
            "Copy email address"
          )}
        </button>
      </div>
    </Modal>
  );
};
