/**
 * Prompt management utilities for agent prompt tuning
 */

/**
 * Type for prompt template variables
 */
export type PromptVariables<T = undefined> = T extends undefined
  ? Record<string, string | number | boolean | undefined>
  : Partial<T>;

/**
 * Type for prompt template definition
 */
export type PromptTemplate<T = undefined> = {
  template: string;
  variables?: PromptVariables<T>;
};

/**
 * Creates a customizable prompt from a template with variable placeholders
 *
 * @param options - Template configuration with default variables
 * @returns Function that generates the prompt with provided variables
 */
export const createPrompt = <T>(options: PromptTemplate<T>) => {
  const { template, variables: defaultVariables = {} } = options;

  /**
   * Generate a prompt with given variables merged with defaults
   *
   * @param customVariables - Custom variables to override defaults
   * @returns The processed prompt string with variables inserted
   */
  return (customVariables: PromptVariables<T> = {} as PromptVariables<T>): string => {
    const mergedVariables = { ...defaultVariables, ...customVariables };

    return template.replace(/\{\{([^}]+)\}\}/g, (_, key) => {
      const trimmedKey = key.trim() as keyof PromptVariables<T>;
      return mergedVariables[trimmedKey]?.toString() || "";
    });
  };
};
