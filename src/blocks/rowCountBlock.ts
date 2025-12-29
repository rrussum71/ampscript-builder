/**
 * RowCount block definition.
 *
 * Example output:
 * SET @rowCount = RowCount(@rows)
 */

import { BlockDefinition } from "../types/builder";

export interface RowCountBlockConfig {
  /**
   * Rowset variable (must start with @).
   */
  rowsetVariable: string;

  /**
   * Output variable to store count.
   */
  outputVariable: string;
}

export const rowCountBlock: BlockDefinition<RowCountBlockConfig> = {
  type: "ampscript.rowCount",
  label: "Row Count",
  category: "AMPscript",

  template: `SET {{outputVariable}} = RowCount({{rowsetVariable}})`,

  settings: {
    rowsetVariable: {
      type: "string",
      label: "Rowset Variable",
      required: true,
      description: "Must reference a LookupRows output (e.g. @rows)",
    },
    outputVariable: {
      type: "string",
      label: "Output Variable",
      required: true,
      description: "Must start with @ (e.g. @rowCount)",
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

    return errors;
  },
};