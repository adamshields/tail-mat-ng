import json
from pathlib import Path

"""
Terraform JSONForms UI Schema Generator

This module generates JSONForms UI schemas from Terraform JSON Schema definitions.
It's designed to be used with the enhanced_terraform_schema.py script to create
user-friendly form definitions for Terraform variables.

The module translates JSON Schema types, formats, and constraints into appropriate
JSONForms UI controls and layouts. It uses source file information to organize
form fields into logical groups.

Main functions:
- generate_ui_schema(): Creates a UI schema with controls grouped by source file
- create_ui_element(): Generates appropriate UI controls based on variable type and constraints
- generate_layout_schema(): Creates an alternative horizontal layout definition
- add_jsonforms_output(): Main entry point that generates and saves all JSONForms files

The UI schema maps Terraform variable types to appropriate form controls:
- Enums -> Dropdowns
- Booleans -> Toggles
- Number ranges -> Sliders
- String with pattern -> Regex-validated inputs
- Arrays -> List builders or multi-select controls
- Objects -> Nested form sections or key-value editors

"""

def generate_ui_schema(json_schema):
    """Generate JSONForms UI Schema from JSON Schema"""
    
    # Start with the base UI schema
    ui_schema = {
        "type": "VerticalLayout",
        "elements": []
    }
    
    # Track categories for grouping
    categories = {}
    uncategorized = []
    
    # Process each property in the schema
    properties = json_schema.get("properties", {})
    for prop_name, prop_schema in properties.items():
        # Determine category from source file if available
        category = "Uncategorized"
        if "source" in prop_schema:
            # Remove file extension for category name
            category = prop_schema["source"].split('.')[0].title()
        
        # Create UI element for this property
        ui_element = create_ui_element(prop_name, prop_schema)
        
        # Add to appropriate category
        if category not in categories:
            categories[category] = []
        
        categories[category].append(ui_element)
    
    # Create categorized layout
    for category, elements in sorted(categories.items()):
        if category == "Uncategorized":
            # Add these at the end
            uncategorized = elements
            continue
            
        # Add category group
        ui_schema["elements"].append({
            "type": "Group",
            "label": category,
            "elements": elements
        })
    
    # Add uncategorized elements at the end if any
    if uncategorized:
        ui_schema["elements"].append({
            "type": "Group",
            "label": "Additional Settings",
            "elements": uncategorized
        })
    
    return ui_schema

def create_ui_element(prop_name, prop_schema):
    """Create appropriate UI element based on property type and constraints"""
    
    # Default UI element structure
    ui_element = {
        "type": "Control",
        "scope": f"#/properties/{prop_name}"
    }
    
    # Add label if there's a title
    if "title" in prop_schema:
        ui_element["label"] = prop_schema["title"]
    
    # Add UI options based on property type and constraints
    ui_options = {}
    prop_type = prop_schema.get("type", "string")
    
    # Handle specific types
    if prop_type == "string":
        if "enum" in prop_schema:
            # Dropdown for enum values
            ui_options["format"] = "dropdown"
        elif "pattern" in prop_schema:
            # Text input with pattern
            ui_options["format"] = "regex"
            ui_options["pattern"] = prop_schema["pattern"]
        elif prop_schema.get("maxLength", 100) > 200:
            # Textarea for long strings
            ui_options["multi"] = True
    
    elif prop_type == "number" or prop_type == "integer":
        if "minimum" in prop_schema and "maximum" in prop_schema:
            # Slider for number ranges
            ui_options["format"] = "range"
    
    elif prop_type == "boolean":
        # Toggle for booleans
        ui_options["format"] = "toggle"
    
    elif prop_type == "array":
        # Array specific handling
        if "prefixItems" in prop_schema:
            # Tuple-like array with mixed types
            ui_options["format"] = "tuple"
        elif "enum" in prop_schema.get("items", {}):
            # Multi-select for arrays with enum items
            ui_options["format"] = "select"
            ui_options["multi"] = True
    
    elif prop_type == "object":
        if "additionalProperties" in prop_schema:
            # Key-value editor for maps
            ui_options["format"] = "keyvalue"
            # Pass through additional properties type
            if "type" in prop_schema.get("additionalProperties", {}):
                ui_options["valueType"] = prop_schema["additionalProperties"]["type"]
    
    # Add options to UI element if any were determined
    if ui_options:
        ui_element["options"] = ui_options
    
    return ui_element

def generate_layout_schema(json_schema):
    """Generate JSONForms layout schema"""
    
    # Create standard horizontal layout
    layout = {
        "type": "HorizontalLayout",
        "elements": [
            {
                "type": "VerticalLayout",
                "elements": []
            }
        ]
    }
    
    # Add categories as vertical groups
    categories = set()
    for prop_name, prop_schema in json_schema.get("properties", {}).items():
        if "source" in prop_schema:
            category = prop_schema["source"].split('.')[0].title()
            categories.add(category)
    
    # Add a section for each category
    elements = layout["elements"][0]["elements"]
    
    for category in sorted(categories):
        elements.append({
            "type": "Group",
            "label": category,
            "elements": []  # These would be filled by JSONForms
        })
    
    # Add uncategorized section at the end
    elements.append({
        "type": "Group", 
        "label": "Additional Settings",
        "elements": []  # These would be filled by JSONForms
    })
    
    return layout

def add_jsonforms_output(terraform_schema, output_dir):
    """
    Add JSONForms output to the schema generator
    Call this function after generating the Terraform schema
    """
    # Generate UI Schema
    ui_schema = generate_ui_schema(terraform_schema)
    
    # Generate Layout Schema
    layout_schema = generate_layout_schema(terraform_schema)
    
    # Ensure output_dir is a Path
    if isinstance(output_dir, str):
        output_dir = Path(output_dir)
    
    # Write UI Schema
    ui_schema_path = output_dir / "terraform_ui_schema.json"
    with open(ui_schema_path, 'w') as f:
        json.dump(ui_schema, f, indent=2)
    
    # Write Layout Schema
    layout_schema_path = output_dir / "terraform_layout.json"
    with open(layout_schema_path, 'w') as f:
        json.dump(layout_schema, f, indent=2)
    
    print(f"Generated JSONForms UI Schema: {ui_schema_path}")
    print(f"Generated Layout Schema: {layout_schema_path}")
    
    return ui_schema_path, layout_schema_path
