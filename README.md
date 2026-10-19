## Open Minds Project

This repository provides a template for the Open Minds project.

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **In case some dependencies are missing**

   ```bash
   npm install dependencyname@version --save-dev
   ```


3. **Start the application**

   ```bash
   npm start
   ```

The output will provide options to open the application in:

- [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for evaluating app development with Expo

If you wish to developp on android, you will need to install expo go, and connect your phone to your computer or have an emulator
Then choose "open in android", it should launch expo go, if not, scan the generated QR Code with expo go.

Development can begin by editing files within the **src/app** directory. This project utilizes [file-based routing](https://docs.expo.dev/router/introduction).

The main source code is organized in the `src/` directory:

- `src/app`: Main application entry point and routes (file-based routing)
- `src/components`: Reusable UI components
- `src/constants`: Constants and theme
- `src/hooks`: Custom React hooks

Assets (images, fonts, etc.) are located in the `assets/` directory at the root.

## Development vs. Production Build

- `npx expo start` (or `npm start`) launches the application in development mode: hot reload, debugging, detailed logs, and unoptimized code.
- `npx expo build` or `npm run build` build the project but don't generate an apk, usefull to know if the project is compiling or not (it can have errors even if it works un development).
- `npm run build:apk` creates an apk of the application, it can be found in \android\app\build\outputs\apk\release\app-release.apk 

(the 2 last commands are run automatically in github workflows, see below)

## GitHub Actions Workflows

This project includes three workflows:

### 1. Automatic CI (`.github/workflows/ci.yml`)

Runs automatically on each push or pull request:

- Checks TypeScript and ESLint
- Tests bundle export (`npx expo export`)
- Validates code without native compilation
- No Expo dependencies required

### 2. Production Build (`.github/workflows/build.yml`)

Triggered manually to generate a standalone APK:

- 100% Gradle build (no EAS)
- Standalone APK ready for distribution
- Does not require an Expo server
- APK is downloadable from artifacts
- **No dependencies required** (no Expo token)

```bash
# Equivalent local usage
npm run build:apk
```

### 3. Development Build (`.github/workflows/build-dev.yml`)

Triggered manually to generate an APK with hot reload (needed when using dependancies not included with expo go):

- Local EAS build (compiles locally, not on remote servers)
- Includes Expo Dev Client (replaces Expo Go)
- Enables hot reload and debugging
- APK is downloadable from artifacts
- **Requires `EXPO_TOKEN`** (see below)

```bash
# Equivalent local usage
eas build --platform android --profile development --local
```

