// navigation.types.ts
export type NavDisplayType =
 | 'horizontal'      // Main top navigation bar items
 | 'vertical'        // Sidebar navigation items
 | 'mobile'          // Items shown in mobile/responsive menu
 | 'footer';         // Footer navigation items

export interface NavItem {
 id: string;         // Unique identifier for the nav item
 label: string;      // Display text shown to users
 path: string;       // URL path for routing
 icon?: string;      // Material icon name
 displayType: NavDisplayType[];  // Where/how this item should be displayed
 children?: NavItem[];  // Nested navigation items
 order?: number;     // Display order within its context
 mobileOrder?: number; // Specific ordering for mobile display
 parentId?: string;  // Reference to parent item for breadcrumbs/hierarchy
 isDynamic?: boolean;  // Indicates if route contains dynamic parameters
 isExternal?: boolean; // Indicates external URL vs internal route
 hasDropdown?: boolean; // Indicates if item has dropdown menu items
 dropdownItems?: NavItem[]; // Items to show in dropdown menu

 grouping?: {
   category?: string;   // Logical grouping category (e.g., "admin", "user")
   priority?: number;   // Priority within its category
 };

 visibility?: {
   roles?: string[];      // Required user roles to see this item
   features?: string[];   // Feature flags that must be enabled
   environment?: string[]; // Environments where item should be shown
 };
}
