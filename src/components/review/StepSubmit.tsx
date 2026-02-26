import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

interface StepSubmitProps {
  emailBody: string;
  subject: string;
  onBack: () => void;
  onClearAndFinish: () => void;
}

export function StepSubmit({ emailBody, subject, onBack, onClearAndFinish }: StepSubmitProps) {
  const [copied, setCopied] = useState(false);

  const mailtoHref = `mailto:support@focuslab.dev?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(emailBody);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: select text in the preview
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Review Preview
        </h2>
        <p className="mt-2 text-gray-600">
          Here&apos;s what will be sent. Use the email button or copy and paste it manually.
        </p>
      </div>

      <pre className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-sm text-gray-700 whitespace-pre-wrap overflow-x-auto max-h-96 overflow-y-auto font-mono leading-relaxed">
        {emailBody}
      </pre>

      <div className="flex flex-col gap-3">
        <Button variant="primary" fullWidth href={mailtoHref} external>
          Open in Email
        </Button>
        <p className="text-sm text-gray-500 text-center">
          If the email button doesn&apos;t work, copy the text below and send it
          to{" "}
          <a
            href="mailto:support@focuslab.dev"
            className="text-blue-600 hover:text-blue-700 transition-colors"
          >
            support@focuslab.dev
          </a>
        </p>
        <Button variant="secondary" fullWidth onClick={handleCopy}>
          {copied ? "Copied!" : "Copy to Clipboard"}
        </Button>
      </div>

      <div className="flex justify-between">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button variant="ghost" onClick={onClearAndFinish}>
          Clear Data and Finish
        </Button>
      </div>
    </motion.div>
  );
}
