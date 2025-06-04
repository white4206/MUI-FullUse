import { createTheme } from "@mui/material/styles";

// 增加调色板参数，加入wMain主题色
declare module "@mui/material/styles" {
  interface Palette {
    wMain: Palette["primary"];
    appBarColor: string;
  }

  interface PaletteOptions {
    wMain?: PaletteOptions["primary"];
    appBarColor?: string;
  }
}

// 更新badge,Chip的颜色选项，使其包含wMain主题色选项
declare module "@mui/material/Badge" {
  interface BadgePropsColorOverrides {
    wMain: true;
  }
}
declare module "@mui/material/Chip" {
  interface ChipPropsColorOverrides {
    wMain: true;
  }
}

let lightTheme = createTheme({});
lightTheme = createTheme(lightTheme, {
  // 用augmentColor创建的自定义主题色
  palette: {
    primary: lightTheme.palette.augmentColor({
      color: {
        main: "#9286d1",
      },
      name: "wMain",
    }),
    wMain: lightTheme.palette.augmentColor({
      color: {
        main: "#9286d1",
      },
      name: "wMain",
    }),
    appBarColor: "#ffffff",
  },
});
let darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
darkTheme = createTheme(darkTheme, {
  // 用augmentColor创建的自定义主题色
  palette: {
    primary: darkTheme.palette.augmentColor({
      color: {
        main: "#9286d1",
      },
      name: "wMain",
    }),
    wMain: darkTheme.palette.augmentColor({
      color: {
        main: "#9286d1",
      },
      name: "wMain",
    }),
  },
});
export { lightTheme, darkTheme };
