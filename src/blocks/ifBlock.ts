/**
 * IF block definition.
 *
 * Example output:
 * IF @rowCount > 0 THEN
 */

import { BlockDefinition } from "../types/builder";

export interface IfBlockConfig {
  /**
   * AMPscript conditional expression.
   * Example: @rowCount > 0
   */
  condition: string;
}

export const ifBlock: BlockDefinition<IfBlockConfig> = {
  type: "ampscript.if",
  label: "IF",
  category: "Logic",

  template: `IF {{condition}} THEN`,

  settings: {
    condition: {
      type: "expression",
      label: "Condition",
      required: true,
      description: "AMPscript conditional expression",
    },
  },

  validate: (config) => {
    const errors = [];

    if (!config.condition || config.condition.trim().length === 0) {
      errors.push({
        field: "condition",
        message: "Condition cannot be empty",
      });
    }

    return errors;
  },
};