/**
 * Row block definition.
 *
 * Example output:
 * SET @row = Row(@rows, 1)
 */

import { BlockDefinition } from "../types/builder";

export interface RowBlockConfig {
  /**
   * Rowset variable to pull from.
   */
  rowsetVariable: string;

  /**
   * Row number (1-based).
   */
  rowNumber: number;

  /**
   * Output variable to store row.
   */
  outputVariable: string;
}

export const rowBlock: BlockDefinition<RowBlockConfig> = {
  type: "ampscript.row",
  label: "Row",
  category: "AMPscript",

  template: `SET {{outputVariable}} = Row({{rowsetVariable}}, {{rowNumber}})`,

  settings: {
    rowsetVariable: {
      type: "string",
      label: "Rowset Variable",
      required: true,
      description: "Rowset variable (e.g. @rows)",
    },
    rowNumber: {
      type: "number",
      label: "Row Number",
      required: true,
      min: 1,
    },
    outputVariable: {
      type: "string",
      label: "Output Variable",
      required: true,
      description: "Must start with @",
    },
  },

  validate: (config) => {
    const errors = [];

    if (!config.rowsetVariable.startsWith("@")) {
      errors.push({
        field: "rowsetVariable",
        message: "Rowset variable must start with @",
      });
    }

    if (!config.outputVariable.startsWith("@")) {
      errors.push({
        field: "outputVariable",
        message: "Output variable must start with @",
      });
    }

    if (config.rowNumber < 1) {
      errors.push({
        field: "rowNumber",
        message: "Row number must be 1 or greater",
      });
    }

    return errors;
  },
};