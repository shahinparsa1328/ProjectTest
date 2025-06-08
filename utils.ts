
import React from 'react'; // Import React for JSX

export const toPersianDigits = (input: string | number | undefined | null): string => {
  if (input === undefined || input === null) {
    return '';
  }
  // Ensure we are working with a primitive string for the .replace method
  // Use globalThis.String to ensure the global String constructor is used
  const strInput = globalThis.String(input); 
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return strInput.replace(/[0-9]/g, (digitChar) => {
    // Check if digitChar is actually a single digit character
    if (/^[0-9]$/.test(digitChar)) {
      const num = parseInt(digitChar, 10);
      // It's good practice to check if num is a valid index, though for [0-9] it always will be.
      if (num >= 0 && num < persianDigits.length) {
        return persianDigits[num];
      }
    }
    return digitChar; // Return the original character if it's not a replaceable digit
  });
};


// Helper to translate priority for display
export const translatePriorityToPersian = (priority: string): string => {
  switch (priority.toLowerCase()) {
    case "high":
      return "بالا";
    case "medium":
      return "متوسط";
    case "low":
      return "پایین";
    default:
      return priority;
  }
};

// Helper to translate persona names to English for API prompts if needed
export const translatePersonaToEnglish = (persianPersona: string): string => {
  switch (persianPersona) {
    case "دوستانه_مربی":
      return "Friendly_Coach";
    case "شوخ_بازیگوش":
      return "Witty_Playful";
    case "رسمی_تحلیلی":
      return "Formal_Analytical";
    case "همدل_حامی":
      return "Empathetic_Supportive";
    default:
      return persianPersona; 
  }
};

export const highlightText = (text: string, highlight: string): React.ReactNode => {
  if (!highlight.trim()) {
    return toPersianDigits(text);
  }
  // Escape regex special characters in highlight term
  const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escapedHighlight})`, 'gi'));

  // Using React.createElement to avoid JSX parsing issues in .ts files
  const resultNodes: React.ReactNode[] = parts.map((part, index): React.ReactNode => // Explicitly type map's return
    part.toLowerCase() === highlight.toLowerCase()
      ? React.createElement('mark', { key: `mark-${index}` }, toPersianDigits(part))
      : React.createElement(React.Fragment, { key: `fragment-${index}` }, toPersianDigits(part))
  );

  return React.createElement(
    React.Fragment,
    null, 
    ...resultNodes
  );
};

/**
 * Parses a JSON string, potentially removing markdown code fences.
 * @param jsonString The string to parse.
 * @returns The parsed JSON object, or null if parsing fails.
 */
export const parseJsonFromString = <T = any>(jsonString: string | undefined | null): T | null => {
  if (!jsonString) {
    return null;
  }
  let str = jsonString.trim();
  const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
  const match = str.match(fenceRegex);
  if (match && match[2]) {
    str = match[2].trim();
  }
  try {
    return JSON.parse(str) as T;
  } catch (e) {
    console.error("Failed to parse JSON string:", str, e);
    return null;
  }
};
