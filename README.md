![cover (1)](https://github.com/Texagon-Dev/react-supabase-auth-template/assets/76134547/d94e5efc-af0e-40ed-a393-23d3d35e34f7)

# React + TypeScript + Vite + Supabase Authentication Template!

## Introduction

This project is a template for a React application using TypeScript and Vite for the build process. It includes user authentication functionality using Supabase, a modern backend-as-a-service platform.

## Tech Stack

- React: A JavaScript library for building user interfaces.
- TypeScript: A typed superset of JavaScript that compiles to plain JavaScript.
- Vite: A build tool that aims to provide a faster and leaner development experience for modern web projects.
- Supabase: An open-source Firebase alternative that provides user authentication and real-time database.

## Setup

1. Clone the repository to your local machine.
2. Install the dependencies by running `npm install`.
3. Create a [`.env.local`](command:_github.copilot.openRelativePath?%5B%22.env.local%22%5D ".env.local") file in the root directory of the project and add your Supabase URL and anon key.
4. Start the development server by running `npm run dev`.

## File Structure

- [`src/App.tsx`](command:_github.copilot.openRelativePath?%5B%22src%2FApp.tsx%22%5D "src/App.tsx"): This is the main component of the application. It sets up the routing for the app.
- [`src/pages/Home.tsx`](command:_github.copilot.openRelativePath?%5B%22src%2Fpages%2FHome.tsx%22%5D "src/pages/Home.tsx"), [`src/pages/Signup.tsx`](command:_github.copilot.openRelativePath?%5B%22src%2Fpages%2FSignup.tsx%22%5D "src/pages/Signup.tsx"), [`src/pages/User.tsx`](command:_github.copilot.openRelativePath?%5B%22src%2Fpages%2FUser.tsx%22%5D "src/pages/User.tsx"): These files are the different pages of the app. Each file corresponds to a different route.
- [`src/components/Protected.tsx`](command:_github.copilot.openRelativePath?%5B%22src%2Fcomponents%2FProtected.tsx%22%5D "src/components/Protected.tsx"): This component is used to protect routes that require authentication.
- [`src/hooks/Auth.tsx`](command:_github.copilot.openRelativePath?%5B%22src%2Fhooks%2FAuth.tsx%22%5D "src/hooks/Auth.tsx"): This file contains the authentication logic of the app. It provides a context that can be used by other components to access and modify the authentication state.
- [`src/config/supabase.ts`](command:_github.copilot.openRelativePath?%5B%22src%2Fconfig%2Fsupabase.ts%22%5D "src/config/supabase.ts"): This file sets up the Supabase client that is used for authentication.
- [`src/index.css`](command:_github.copilot.openRelativePath?%5B%22src%2Findex.css%22%5D "src/index.css"), [`src/App.css`](command:_github.copilot.openRelativePath?%5B%22src%2FApp.css%22%5D "src/App.css"): These files contain the global and app-specific styles respectively.
- [`vite.config.ts`](command:_github.copilot.openRelativePath?%5B%22vite.config.ts%22%5D "vite.config.ts"): This file contains the configuration for Vite.
- [`tsconfig.json`](command:_github.copilot.openRelativePath?%5B%22tsconfig.json%22%5D "tsconfig.json"): This file contains the configuration for TypeScript.
- [`package.json`](command:_github.copilot.openRelativePath?%5B%22package.json%22%5D "package.json"): This file contains the list of project dependencies and scripts.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
