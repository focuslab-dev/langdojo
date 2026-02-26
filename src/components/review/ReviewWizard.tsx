import { useState, useEffect, useMemo } from "react";
import { LanguageId, Category } from "@/types";
import { categories } from "@/utils/languages";
import { getCategoryData } from "@/utils/getPhraseData";
import { formatReviewEmail } from "@/utils/formatReviewEmail";
import { ProgressBar } from "./ProgressBar";
import { StepLanguageSelect } from "./StepLanguageSelect";
import { StepCategoryReview } from "./StepCategoryReview";
import { StepFinalForm } from "./StepFinalForm";
import { StepSubmit } from "./StepSubmit";

interface ReviewState {
  currentStep: number;
  selectedLanguageId: LanguageId | null;
  phraseComments: Record<string, Record<string, string>>;
  newPhraseSuggestions: Record<string, string>;
  overallFeedback: string;
  contributorName: string;
  contributorLink: string;
  email: string;
}

const STORAGE_KEY = "langdojo-review-state";

const initialState: ReviewState = {
  currentStep: 0,
  selectedLanguageId: null,
  phraseComments: {},
  newPhraseSuggestions: {},
  overallFeedback: "",
  contributorName: "",
  contributorLink: "",
  email: "",
};

function loadState(): ReviewState {
  if (typeof window === "undefined") return initialState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    return { ...initialState, ...JSON.parse(raw) };
  } catch {
    return initialState;
  }
}

function saveState(state: ReviewState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage full or unavailable
  }
}

export function ReviewWizard() {
  const [state, setState] = useState<ReviewState>(initialState);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount (client only)
  useEffect(() => {
    setState(loadState());
    setHydrated(true);
  }, []);

  // Persist to localStorage on every state change (after hydration)
  useEffect(() => {
    if (hydrated) saveState(state);
  }, [state, hydrated]);

  const reviewCategories: Category[] = useMemo(
    () => categories.filter((c) => c.id !== "favorites"),
    [],
  );

  // 0 = language select, 1-9 = categories, 10 = final form, 11 = preview
  const totalSteps = reviewCategories.length + 3;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [state.currentStep]);

  const goTo = (step: number) =>
    setState((s) => ({ ...s, currentStep: step }));

  const handleLanguageSelect = (languageId: LanguageId) => {
    setState((s) => ({ ...s, selectedLanguageId: languageId, currentStep: 1 }));
  };

  const handleCommentChange = (
    categoryId: string,
    phraseId: string,
    comment: string,
  ) => {
    setState((s) => ({
      ...s,
      phraseComments: {
        ...s.phraseComments,
        [categoryId]: {
          ...(s.phraseComments[categoryId] ?? {}),
          [phraseId]: comment,
        },
      },
    }));
  };

  const handleSuggestionChange = (categoryId: string, suggestion: string) => {
    setState((s) => ({
      ...s,
      newPhraseSuggestions: {
        ...s.newPhraseSuggestions,
        [categoryId]: suggestion,
      },
    }));
  };

  const handleFieldChange = (field: string, value: string) => {
    setState((s) => ({ ...s, [field]: value }));
  };

  const handleClearAndFinish = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState(initialState);
  };

  // Build phrase lookup for email formatting
  const phraseLookup = useMemo(() => {
    if (!state.selectedLanguageId) return {};
    const lookup: Record<string, { id: string; text: string; translation: string }[]> = {};
    for (const cat of reviewCategories) {
      const { phrases, words } = getCategoryData(state.selectedLanguageId, cat.id);
      lookup[cat.id] = [...phrases, ...words].map((p) => ({
        id: p.id,
        text: p.text,
        translation: p.translation,
      }));
    }
    return lookup;
  }, [state.selectedLanguageId, reviewCategories]);

  const emailBody = useMemo(() => {
    if (!state.selectedLanguageId) return "";
    return formatReviewEmail(
      {
        selectedLanguageId: state.selectedLanguageId,
        phraseComments: state.phraseComments,
        newPhraseSuggestions: state.newPhraseSuggestions,
        overallFeedback: state.overallFeedback,
        contributorName: state.contributorName,
        contributorLink: state.contributorLink,
      },
      phraseLookup,
    );
  }, [state, phraseLookup]);

  const emailSubject = state.selectedLanguageId
    ? `Lang Dojo Review — ${state.selectedLanguageId}`
    : "Lang Dojo Review";

  // Render current step
  const renderStep = () => {
    if (state.currentStep === 0) {
      return <StepLanguageSelect onSelect={handleLanguageSelect} />;
    }

    const categoryIndex = state.currentStep - 1;
    if (categoryIndex >= 0 && categoryIndex < reviewCategories.length) {
      const category = reviewCategories[categoryIndex];
      return (
        <StepCategoryReview
          key={category.id}
          category={category}
          languageId={state.selectedLanguageId!}
          comments={state.phraseComments[category.id] ?? {}}
          suggestion={state.newPhraseSuggestions[category.id] ?? ""}
          onCommentChange={(phraseId, comment) =>
            handleCommentChange(category.id, phraseId, comment)
          }
          onSuggestionChange={(suggestion) =>
            handleSuggestionChange(category.id, suggestion)
          }
          onNext={() => goTo(state.currentStep + 1)}
          onBack={() => goTo(state.currentStep - 1)}
        />
      );
    }

    if (state.currentStep === reviewCategories.length + 1) {
      return (
        <StepFinalForm
          overallFeedback={state.overallFeedback}
          contributorName={state.contributorName}
          contributorLink={state.contributorLink}
          email={state.email}
          onFieldChange={handleFieldChange}
          onNext={() => goTo(state.currentStep + 1)}
          onBack={() => goTo(state.currentStep - 1)}
        />
      );
    }

    if (state.currentStep === reviewCategories.length + 2) {
      return (
        <StepSubmit
          emailBody={emailBody}
          subject={emailSubject}
          onBack={() => goTo(state.currentStep - 1)}
          onClearAndFinish={handleClearAndFinish}
        />
      );
    }

    return null;
  };

  if (!hydrated) {
    return <div className="max-w-2xl mx-auto px-4 py-8" />;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {state.currentStep > 0 && (
        <div className="mb-6">
          <ProgressBar currentStep={state.currentStep} totalSteps={totalSteps} />
        </div>
      )}
      {renderStep()}
    </div>
  );
}
