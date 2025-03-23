variable "simple_string" {
  type        = string
  description = "Just a plain string"
  default     = "example"
}

variable "simple_number" {
  type        = number
  description = "A number variable"
  default     = 42
}

variable "a_bool" {
  type        = bool
  description = "A boolean value"
  default     = true
}

variable "a_list_of_strings" {
  type        = list(string)
  description = "A list of strings"
  default     = ["a", "b", "c"]
}

variable "a_map_of_strings" {
  type        = map(string)
  description = "A map of string values"
  default     = {
    key1 = "value1"
    key2 = "value2"
  }
}

variable "an_object" {
  type = object({
    name = string
    age  = number
    tags = list(string)
  })
  description = "An object with nested types"
}

variable "a_tuple" {
  type = tuple([string, number, bool])
  description = "A tuple with specific type positions"
}


variable "a_enum_cloud_region" {
  type        = string
  description = "An enum of AWS cloud regions"
  validation {
    condition     = contains(["us-east-1", "us-west-2", "eu-central-1"], var.a_enum_cloud_region)
    error_message = "Must be a valid AWS region"
  }
}

variable "a_enum_env_name" {
  type        = string
  description = "Environment name"
  validation {
    condition     = contains(["dev", "staging", "prod"], var.a_enum_env_name)
    error_message = "Must be one of: dev, staging, prod"
  }
}

variable "a_number_with_limits" {
  type        = number
  description = "A number that must be between 1 and 100"
  validation {
    condition     = var.a_number_with_limits >= 1 && var.a_number_with_limits <= 100
    error_message = "Must be between 1 and 100"
  }
}

variable "a_string_with_length" {
  type        = string
  description = "A string that must be between 5 and 10 characters"
  validation {
    condition     = length(var.a_string_with_length) >= 5 && length(var.a_string_with_length) <= 10
    error_message = "Must be 5-10 characters"
  }
}

variable "a_string_with_pattern" {
  type        = string
  description = "A string that must match the pattern ^app-"
  validation {
    condition     = can(regex("^app-", var.a_string_with_pattern))
    error_message = "Must start with 'app-'"
  }
}

# Existing ones
simple_string        = "hello"
simple_number        = 123
a_bool               = false
a_list_of_strings    = ["a", "b", "c"]
a_map_of_strings     = { a = "1", b = "2" }
an_object = {
  name = "adam"
  age  = 99
  tags = ["dev", "test"]
}
a_tuple              = ["foo", 123, true]

# New enum test values
a_enum_cloud_region    = "us-west-2"
a_enum_env_name        = "prod"
a_number_with_limits   = 42
a_string_with_length   = "hellooo"
a_string_with_pattern  = "app-main"



variable "simple_string" {}
variable "simple_number" {}
variable "a_bool"  {}
variable "a_list_of_strings" {}
variable "a_map_of_strings" {}
variable "an_object" {}
variable "a_tuple" { }
variable "a_enum_cloud_region" {}
variable "a_enum_env_name" {}
variable "a_number_with_limits"  {}
variable "a_string_with_length" {}
variable "a_string_with_pattern" {}


    {
      "Key": "test-module-types",
      "Source": "../../modules/test-module-types",
      "Dir": "../../modules/test-module-types"
    },
