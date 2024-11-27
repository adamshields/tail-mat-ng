/**
 * Defines metadata for form fields used in dialogs (Add/Edit/View).
 */
export interface FieldConfig {
  /** The key in the data object corresponding to this field (e.g., 'name', 'email'). */
  key: string;

  /** The display label for the field (e.g., 'Name', 'Email'). */
  label: string;

  /** The input type for the field (e.g., 'text', 'number', 'email', 'date', 'select'). */
  type: 'text' | 'number' | 'email' | 'date' | 'select';

  /** Optional dropdown options (only applicable when type is 'select'). */
  options?: { value: any; display: string }[];

  /** Whether the field is required. */
  required?: boolean;

  /** Optional validation rules for the field. */
  validations?: {
    /** Minimum length of the input value (only for applicable types). */
    minLength?: number;

    /** Maximum length of the input value (only for applicable types). */
    maxLength?: number;

    /** Regular expression pattern for validation. */
    pattern?: string;
  };
}

/**
 * Configuration for table columns, defining what is displayed and how it behaves.
 */
export interface ColumnConfig {
  /** The key in the data object corresponding to this column (e.g., 'firstName'). */
  key: string;

  /** The display label for the column header (e.g., 'First Name'). */
  label: string;

  /** Whether the column is sortable. */
  sortable?: boolean;

  /** Whether the column is visible in the table. Default is true. */
  visible?: boolean;
}

export interface TableActionConfig {
  /** The icon to display for the action (e.g., Material icon name). */
  icon: string;

  /** Tooltip text for the action button. */
  tooltip: string;

  /** The callback function to execute when the action button is clicked. */
  callback: (row: any) => void;
}


/**
 * Unified configuration for the table component, including columns, data, toolbar, and form fields.
 */
export interface TableConfig {
  /** Defines the columns to display in the table. */
  columns: ColumnConfig[];

  /** The data displayed in the table rows. */
  data: any[];

  /** Number of rows to display per page. */
  pageSize: number;

  /** Configuration for the toolbar, defining available actions. */
  toolbar?: TableToolbarConfig;

  /** Whether sorting is enabled for the table. */
  sortable?: boolean;

  /** Whether filtering is enabled for the table. */
  filterable?: boolean;

  /** Configuration for the fields displayed in Add/Edit dialogs. */
  formConfig?: FieldConfig[];

  /** Configuration for row-specific actions. */
  actions?: TableActionConfig[]; // New property for row-specific actions
}


/**
 * Configuration for the toolbar, including available actions and features.
 */
export interface TableToolbarConfig {
  /** List of actions (e.g., Add, Edit, Delete) available in the toolbar. */
  actions: TableAction[];

  /** Whether a search bar is included in the toolbar. */
  searchEnabled?: boolean;

  /** Whether a "Clear Filters" button is included in the toolbar. */
  clearFiltersEnabled?: boolean;
}

/**
 * Defines individual toolbar actions, such as buttons for Add, Edit, Delete.
 */
export interface TableAction {
  /** The icon to display on the button (e.g., Material icon name). */
  icon: string;

  /** The label for the button (e.g., 'Add', 'Edit'). */
  label: string;

  /** The callback function to execute when the button is clicked. */
  callback: (context?: any) => void;

  /** Whether the button is disabled, or logic to determine its disabled state. */
  isDisabled?: boolean | ((context: any) => boolean);
}

/**
 * Defines the data passed to dialog components for Add/Edit/View/Duplicate operations.
 */
export interface DialogData {
  /** The title of the dialog (e.g., 'Add User', 'Edit Details'). */
  title: string;

  /** The mode of the dialog: 'add', 'edit', 'view', or 'duplicate'. */
  mode: 'add' | 'edit' | 'view' | 'duplicate';

  /** The fields to display in the dialog form. */
  fields: FieldConfig[];

  /** The initial data to populate the form (used for editing or duplicating). */
  initialData?: any;
}
