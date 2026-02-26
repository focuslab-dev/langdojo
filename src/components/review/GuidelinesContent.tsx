import { categories } from "@/utils/languages";

const reviewCategories = categories.filter((c) => c.id !== "favorites");

export function GuidelinesContent() {
  return (
    <div className="space-y-4">
      <h3 className="heading-3">Content Structure</h3>

      <div className="space-y-3 text-md text-gray-700">
        <div className="flex gap-3">
          <span className="font-medium text-gray-500 shrink-0">1.</span>
          <div>
            <span className="font-medium text-gray-900">
              There are {reviewCategories.length} categories
            </span>{" "}
            &mdash; each covering a common travel scenario:
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {reviewCategories.map((c) => (
                <span
                  key={c.id}
                  className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-50 rounded-full text-xs text-gray-600 border border-gray-100"
                >
                  <span>{c.emoji}</span>
                  {c.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <span className="font-medium text-gray-500 shrink-0">2.</span>
          <span>
            Each category contains{" "}
            <span className="font-medium text-gray-900">phrases</span> and
            (additional){" "}
            <span className="font-medium text-gray-900">words</span>.
          </span>
        </div>
      </div>

      <h3 className="heading-3">Phrases Guidelines</h3>

      <div className="space-y-3 text-md text-gray-700">
        <div className="flex gap-3">
          <span className="font-medium text-gray-500 shrink-0">1.</span>
          <span>
            <span className="font-medium text-gray-900">Phrases</span> should
            cover essential expressions used in the situation{" "}
            <span className="font-medium text-gray-900">
              from both speakers
            </span>{" "}
            (e.g. both the customer and the staff).
          </span>
        </div>

        <div className="flex gap-3">
          <span className="font-medium text-gray-500 shrink-0">2.</span>
          <span>
            The phrase order should follow the{" "}
            <span className="font-medium text-gray-900">
              natural flow of the conversation
            </span>{" "}
            &mdash; from greeting to finishing.
          </span>
        </div>

        <div className="flex gap-3">
          <span className="font-medium text-gray-500 shrink-0">3.</span>
          <span>
            Prioritize{" "}
            <span className="font-medium text-gray-900">
              short, easy-to-remember phrases
            </span>{" "}
            over perfectly grammatically correct ones. Travelers need something
            they can actually use.
          </span>
        </div>
      </div>

      <h3 className="heading-3">Words Guidelines</h3>

      <div className="flex gap-3">
        <span className="font-medium text-gray-500 shrink-0">1.</span>
        <span>
          <span className="font-medium text-gray-900">Additional words</span>{" "}
          should cover useful vocabulary not in the phrases (e.g. types of
          coffee: black coffee, latte, espresso).
        </span>
      </div>

      <h3 className="heading-3">Review Checklist</h3>

      <div className="space-y-4 mt-2">
        <div className="flex gap-3">
          <span className="font-medium text-gray-500 shrink-0">1.</span>
          <span>
            <span className="font-medium text-gray-900">
              Phrase correction:
            </span>{" "}
            Fix awkward, outdated, or unnatural phrases. If the phrase is too
            long, please suggest a shorter alternative (e.g. "I would like to
            have..." could be changed to "Can I have...?").
          </span>
        </div>
        <div className="flex gap-3">
          <span className="font-medium text-gray-500 shrink-0">2.</span>
          <span>
            <span className="font-medium text-gray-900">
              Pronunciation correction (for non-Latin-script languages):
            </span>{" "}
            Verify romanization is accurate, consistent, and matches native
            pronunciation.
          </span>
        </div>
        <div className="flex gap-3">
          <span className="font-medium text-gray-500 shrink-0">3.</span>
          <span>
            <span className="font-medium text-gray-900">Removals:</span> Flag
            redundant, irrelevant, or overly advanced entries for removal. (The
            list should cover only the essential phrases which are enough to
            survive as a traveler.)
          </span>
        </div>

        <div className="flex gap-3">
          <span className="font-medium text-gray-500 shrink-0">4.</span>
          <span>
            <span className="font-medium text-gray-900">Additions:</span> While
            the primary focus is on correcting and improving existing phrases,
            please feel free to suggest new phrases that are missing from the
            category.
          </span>
        </div>
      </div>
    </div>
  );
}
