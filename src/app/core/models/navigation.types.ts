// // src/app/core/models/navigation.types.ts
// export type NavLocation = 'top' | 'side' | 'admin';

// export interface NavItem {
//   id: string;                 // Unique identifier
//   label: string;             // Display label
//   path?: string;             // Optional because group items might not have a path
//   icon?: string;             // Material icon name
//   location: NavLocation[];   // Where this item can appear
//   children?: NavItem[];      // For nested items
//   group?: string;            // Group identifier for organization
//   roles?: string[];         // Role-based access control
//   visible?: boolean;        // Control visibility (default: true)
//   disabled?: boolean;       // Control disabled state
//   order?: number;          // Control display order within location/group
// }

// src/app/core/models/navigation.types.ts
export type NavLocation = 'top' | 'side' ;

export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
  location: NavLocation[];
  children?: NavItem[];
  roles?: string[];
  visible?: boolean;
  disabled?: boolean;
  order?: number;
  group?: string;
  isDynamic?: boolean;  // Flag for dynamic routes
  parentParam?: string; // Parameter from parent route to pass down
}
