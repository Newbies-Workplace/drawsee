# Drawsee

# Development

## Setup

1. Install https://bun.sh/
2. Install dependencies using bun
    ```bash
    bun install
    ```
3. Copy `.env.example` to `.env`
    ```bash
    cp .env.example .env
    ```
4. Fill environment variables in `.env`
5. Copy `google-services.json` and `GoogleService-Info.plist` to `/`
6. Prebuild the app
    ```bash
    bun prebuild
    ```
7. Run the app
    ```bash
    bun android
    ```
    or
    ```bash
    bun ios
    ```
   
