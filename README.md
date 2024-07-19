# Monaco for Desktop

This project is a simple Tauri wrapper around Monaco, with the addition of file reading and writing.

The original plan was to use Vue.js, but wrapping Monaco presented a challange I'm not really in the mood for right now, so the frontend ended up in React using the [@monaco-editor/react](https://github.com/suren-atoyan/monaco-react) package

> [!IMPORTANT]
> Currently only building from source is available. As soon as all basic features are completed, prebuilt binaries will be available for download directly from GitHub.

## Basic Features

- [X] "Open file" and "Save file"
- [X] Save As...
- [ ] Tabs
- [ ] Open from context menu

## Planned

- [ ] Themes
- [ ] Syntax Highlighting
- [ ] Line count, cursor position
- [ ] File encoding
- [ ] Automated build pipeline
