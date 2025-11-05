import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    sidebar: Palette["primary"];
    private: Palette["primary"];
    tertiary: Palette["primary"];
    highlight: Palette["primary"];
    messageBubble: Palette["primary"];
    scrollbar: {
      track: string;
      thumb: string;
      thumbHover: string;
    };
  }

  interface PaletteOptions {
    sidebar?: PaletteOptions["primary"];
    private?: PaletteOptions["primary"];
    tertiary?: PaletteOptions["primary"];
    highlight?: PaletteOptions["primary"];
    messageBubble?: PaletteOptions["primary"];
    scrollbar?: {
      track?: string;
      thumb?: string;
      thumbHover?: string;
    };
  }
}
