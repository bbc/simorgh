type Dictionary = Record<string, string>;

/**
 * Replaces `%token%` placeholders in a string with values from a dictionary.
 * Tokens with no matching dictionary entry are left untouched.
 * Returns `null` when either argument is not of the expected type.
 */
const detokenise = (text?: string, dictionary?: Dictionary): string | null => {
  if (typeof text !== 'string' || dictionary !== Object(dictionary)) {
    return null;
  }

  return text.replace(
    /%\w+%/g,
    match => (dictionary as Dictionary)[match] || match,
  );
};

export default detokenise;
