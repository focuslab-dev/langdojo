import { IconNotes } from "@/components/ui/Icons";
import { ChangelogEntry } from "@/types";

const badgeStyles: Record<ChangelogEntry["type"], string> = {
  review: "bg-green-100 text-green-800",
  edit: "bg-blue-100 text-blue-800",
  other: "bg-gray-200 text-gray-800",
};

const badgeText: Record<ChangelogEntry["type"], string> = {
  review: "Reviewed",
  edit: "Edited",
  other: "Other",
};

function Badge({ type }: { type: ChangelogEntry["type"] }) {
  return (
    <span
      className={`inline-block text-xs font-medium px-2 py-0.5 rounded capitalize ${badgeStyles[type]}`}
    >
      {badgeText[type]}
    </span>
  );
}

interface ChangelogEntryCardProps {
  entry: ChangelogEntry;
  languageLabel?: string;
}

export function ChangelogEntryCard({
  entry,
  languageLabel,
}: ChangelogEntryCardProps) {
  return (
    <li className="">
      <div className="flex items-start gap-2">
        <div className="-translate-y-[0.7px]">
          <Badge type={entry.type} />
        </div>
        {languageLabel ? (
          <span className="text-gray-600 text-sm">{languageLabel}</span>
        ) : (
          <span className="text-gray-900">{entry.description}</span>
        )}
      </div>
      {languageLabel && (
        <p className="text-gray-900 mt-1">{entry.description}</p>
      )}
      {entry.contributor && (
        <p className="text-sm text-gray-500 mt-1">
          Contributor:{" "}
          <a
            href={entry.contributor.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {entry.contributor.name}
          </a>
        </p>
      )}
      {entry.note && (
        <p className="text-sm text-gray-500 mt-1 italic flex items-start gap-1">
          <IconNotes className="w-3.5 h-3.5 mt-0.5 shrink-0 opacity-75" />
          {entry.note}
        </p>
      )}
    </li>
  );
}
