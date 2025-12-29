/**
 * Core types for the AMPscript Email Builder.
 * 
 * These are architectural contracts only.
 * No runtime logic should exist in this file.
 */

/**
 * Supported block categories.
 * Used for grouping and ordering in the UI.
 */
export type BlockCategory = "AMPscript" | "Logic" | "Layout";

/**
 * Supported setting field types.
 * These drive sidebar rendering and validation.
 */
export type SettingField =
  | {
      type: "string";
      label: string;
      required?: boolean;
      description?: string;
    }
  | {
      type: "number";
      label: string;
      required?: boolean;
      min?: number;
      max?: number;
    }
  | {
      type: "boolean";
      label: string;
      description?: string;
    }
  | {
      type: "select";
      label: string;
      options: string[];
      required?: boolean;
    }
  | {
      type: "expression";
      label: string;
      required?: boolean;
      description?: string;
    };

/**
 * A schema describing all configurable settings
 * for a given block.
 */
export type SettingsSchema<TConfig> = {
  [K in keyof TConfig]: SettingField;
};

/**
 * Validation error returned by block validators.
 */
export interface ValidationError {
  field?: string;
  message: string;
}

/**
 * A registered block definition.
 * This is the source of truth for how a block behaves.
 */
export interface BlockDefinition<TConfig> {
  /**
   * Unique block type identifier.
   */
  type: string;

  /**
   * Human-readable label shown in the UI.
   */
  label: string;

  /**
   * High-level category for grouping.
   */
  category: BlockCategory;

  /**
   * AMPscript template using token interpolation.
   * Example: {{outputVar}}
   */
  template: string;

  /**
   * Settings schema that drives the sidebar UI.
   */
  settings: SettingsSchema<TConfig>;

  /**
   * Optional validation logic for the block.
   */
  validate?: (config: TConfig) => ValidationError[];
}

/**
 * A block instance placed on the canvas.
 * Contains user-provided configuration only.
 */
export interface BuilderBlock<TConfig> {
  /**
   * Unique instance ID.
   */
  id: string;

  /**
   * References a BlockDefinition.type.
   */
  type: string;

  /**
   * User-configured values for this block.
   */
  config: TConfig;
}