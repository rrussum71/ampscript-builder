/**
 * Field block definition.
 *
 * Example output:
 * SET @firstName = Field(@row, "First_Name")
 */

import { BlockDefinition } from "../types/builder";

export interface FieldBlockConfig {
  /**
   * Row variable to extract from (e.g. @row).
   */
  rowVariable: string;

  /**
   * Field name to retrieve from the row.
   */
  fieldName: string;

  /**
   * Output variable to store the field value.
   */
  outputVariable: string;
}

export const fieldBlock: BlockDefinition<FieldBlockConfig> = {
  type: "ampscript.field",
  label: "Field",
  category: "AMPscript",

  template: `SET {{outputVariable}} = Field({{rowVariable}}, "{{fieldName}}")`,

  settings: {
    rowVariable: {
      type: "string",
      label: "Row Variable",
      required: true,
      description: "Row variable (e.g. @row)",
    },
    fieldName: {
      type: "string",
      label: "Field Name",
      required: true,
      description: "Exact field name from the Data Extension",
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

    if (!config.rowVariable.startsWith("@")) {
      errors.push({
        field: "rowVariable",
        message: "Row variable must start with @",
      });
    }

    if (!config.outputVariable.startsWith("@")) {
      errors.push({
        field: "outputVariable",
        message: "Output variable must start with @",
      });
    }

    if (!config.fieldName || config.fieldName.trim().length === 0) {
      errors.push({
        field: "fieldName",
        message: "Field name cannot be empty",
      });
    }

    return errors;
  },
};