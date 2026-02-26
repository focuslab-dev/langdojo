import { useState } from "react";
import { Phrase } from "@/types";

interface ReviewPhraseCardProps {
  phrase: Phrase;
  comment: string;
  onCommentChange: (comment: string) => void;
}

export function ReviewPhraseCard({
  phrase,
  comment,
  onCommentChange,
}: ReviewPhraseCardProps) {
  const [expanded, setExpanded] = useState(comment !== "");

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm text-pink-600">{phrase.translation}</p>
          <p className="mt-2 text-lg font-semibold text-gray-800 leading-tight">
            {phrase.text}
          </p>
          {phrase.pronunciation && (
            <p className="mt-1 text-base text-gray-500">
              {phrase.pronunciation}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="shrink-0 mt-1 text-xs text-blue-600 hover:text-blue-700 font-medium px-2 py-1 rounded-lg hover:bg-blue-50 transition-colors"
        >
          {expanded ? "Close" : "Comment"}
        </button>
      </div>

      {expanded && (
        <div className="mt-3">
          <textarea
            value={comment}
            onChange={(e) => onCommentChange(e.target.value)}
            placeholder="e.g. This phrase sounds unnatural, try…"
            rows={2}
            className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>
      )}
    </div>
  );
}
