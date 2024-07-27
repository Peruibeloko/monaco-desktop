# Monaco for Desktop

This project is a simple Tauri wrapper around Monaco, with the addition of file reading and writing.

The original plan was to use Vue.js, but wrapping Monaco presented a challenge I'm not really in the mood for right now, so the frontend ended up in React using the [@monaco-editor/react](https://github.com/suren-atoyan/monaco-react) package

> [!IMPORTANT]
> Currently only building from source is available. As soon as all basic features are completed, prebuilt binaries will be available for download directly from GitHub.

## Current Features

- Open, create, edit and save files
- Tabbed file management
- Open from context menu for quick access (Windows only)
- Syntax highlighting for included languages

## Planned Features

- Themes
- Line count, cursor position
- Monaco settings
- Monarch Editor
