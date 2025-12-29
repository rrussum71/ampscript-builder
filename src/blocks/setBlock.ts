/**
 * SET block definition.
 *
 * Generates a simple AMPscript SET statement.
 *
 * Example output:
 * %%[
 *   SET @firstName = FirstName
 * ]%%
 */

import { BlockDefinition } from "../types/builder";

/**
 * Configuration for the SET block.
 */
export interface SetBlockConfig {
  /**
   * AMPscript variable name (must start with @).
   */
  variable: string;

  /**
   * AMPscript expression or value.
   * Example: FirstName, AttributeValue("Email"), "Hello"
   */
  value: string;
}

/**
 * SET block definition.
 */
export const setBlock: BlockDefinition<SetBlockConfig> = {
  type: "ampscript.set",
  label: "SET Variable",
  category: "AMPscript",

  template: `SET {{variable}} = {{value}}`,

  settings: {
    variable: {
      type: "string",
      label: "Variable Name",
      required: true,
      description: "Must start with @ (e.g. @firstName)",
    },
    value: {
      type: "expression",
      label: "Value / Expression",
      required: true,
      description: "AMPscript value or expression",
    },
  },

  validate: (config) => {
    const errors = [];

    if (!config.variable.startsWith("@")) {
      errors.push({
        field: "variable",
        message: "Variable name must start with @",
      });
    }

    if (!config.value || config.value.trim().length === 0) {
      errors.push({
        field: "value",
        message: "Value cannot be empty",
      });
    }

    return errors;
  },
};