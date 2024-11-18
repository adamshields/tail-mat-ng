# TailMatNg

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

```
src/
├── app/
│   ├── core/                  # Core services, guards, configs
│   │   ├── configs/           # Application-wide configuration files
│   │   ├── guards/            # Route guards for authentication, etc.
│   │   ├── interceptors/      # HTTP interceptors
│   │   ├── services/          # Singleton services like authentication
│   ├── shared/                # Reusable components, directives, and pipes
│   │   ├── components/        # Shared UI components like buttons, modals
│   │   ├── directives/        # Custom directives
│   │   ├── pipes/             # Custom pipes
│   │   ├── models/            # Shared types and interfaces
│   │   ├── utils/             # Shared utility functions
│   ├── features/              # Each feature lives here
│   │   ├── applications/      # Feature: Applications
│   │   │   ├── components/    # Components specific to Applications
│   │   │   ├── routes.ts      # Route definitions for Applications
│   │   │   ├── services/      # Services specific to Applications
│   │   │   ├── index.ts       # Barrel file for exporting
│   │   ├── admin/             # Feature: Admin
│   │   │   ├── components/
│   │   │   ├── routes.ts
│   │   │   ├── index.ts
│   │   ├── documents/         # Feature: Documents
│   │   │   ├── components/
│   │   │   ├── routes.ts
│   │   │   ├── index.ts
│   │   ├── lab/               # Feature: Lab
│   │   ├── test/              # Feature: Test
│   ├── layouts/               # Layouts for different sections
│   │   ├── main-layout/       # Main layout with side nav and toolbar
│   │   │   ├── main-layout.component.ts
│   │   │   ├── main-layout.component.html
│   │   │   ├── index.ts
│   │   ├── auth-layout/       # Authentication layout
│   │       ├── auth-layout.component.ts
│   │       ├── auth-layout.component.html
│   │       ├── index.ts
│   ├── app.config.ts          # App-wide configuration
│   ├── app.routes.ts          # Root routing configuration
```
