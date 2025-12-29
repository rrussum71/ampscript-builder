/**
 * LookupRows block definition.
 *
 * Generates an AMPscript LookupRows call.
 *
 * Example output:
 * SET @rows = LookupRows("Ent.Consumers", "Email_Address", emailaddr)
 */

import { BlockDefinition } from "../types/builder";

/**
 * Configuration for the LookupRows block.
 */
export interface LookupRowsBlockConfig {
  /**
   * Data Extension name.
   */
  dataExtension: string;

  /**
   * Field name to match on.
   */
  lookupField: string;

  /**
   * AMPscript value or expression to match.
   * Example: emailaddr, @email, AttributeValue("Email")
   */
  lookupValue: string;

  /**
   * Output variable that stores the resulting rowset.
   * Must start with @.
   */
  outputVariable: string;
}

/**
 * LookupRows block definition.
 */
export const lookupRowsBlock: BlockDefinition<LookupRowsBlockConfig> = {
  type: "ampscript.lookupRows",
  label: "Lookup Rows",
  category: "AMPscript",

  template: `SET {{outputVariable}} = LookupRows("{{dataExtension}}", "{{lookupField}}", {{lookupValue}})`,

  settings: {
    dataExtension: {
      type: "string",
      label: "Data Extension Name",
      required: true,
      description: "Exact name of the Data Extension",
    },
    lookupField: {
      type: "string",
      label: "Lookup Field",
      required: true,
      description: "Field to match on",
    },
    lookupValue: {
      type: "expression",
      label: "Lookup Value",
      required: true,
      description: "AMPscript value or expression",
    },
    outputVariable: {
      type: "string",
      label: "Output Variable",
      required: true,
      description: "Must start with @ (e.g. @rows)",
    },
  },

  validate: (config) => {
    const errors = [];

    if (!config.outputVariable.startsWith("@")) {
      errors.push({
        field: "outputVariable",
        message: "Output variable must start with @",
      });
    }

    if (!config.dataExtension.trim()) {
      errors.push({
        field: "dataExtension",
        message: "Data Extension name cannot be empty",
      });
    }

    if (!config.lookupField.trim()) {
      errors.push({
        field: "lookupField",
        message: "Lookup field cannot be empty",
      });
    }

    if (!config.lookupValue || config.lookupValue.trim().length === 0) {
      errors.push({
        field: "lookupValue",
        message: "Lookup value cannot be empty",
      });
    }

    return errors;
  },
};