import { createTheme, ThemeOptions } from "@mui/material/styles"

// 공통 스타일 설정 (라이트/다크 모드 공통)
const baseTheme: ThemeOptions = {
  typography: {
    fontFamily: "Pretendard, sans-serif",
    h1: { fontSize: "3rem", fontWeight: 700 },
    h2: { fontSize: "2.5rem", fontWeight: 700 },
    h3: { fontSize: "2rem", fontWeight: 700 },
    h4: { fontSize: "1.75rem", fontWeight: 700 },
    h5: { fontSize: "1.5rem", fontWeight: 700 },
    h6: { fontSize: "1.25rem", fontWeight: 600 },
    body1: { fontSize: "1rem", lineHeight: 1.6 },
    body2: { fontSize: "0.875rem", lineHeight: 1.5 },
    button: {
      textTransform: "none" as const, // 문자열 리터럴 타입으로 지정
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 500 },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          textTransform: "none" as const,
          borderRadius: 4,
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.04)",
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          "& .MuiTabs-indicator": {
            height: 3,
            borderRadius: "4px 4px 0 0",
            background: "linear-gradient(45deg, #10b981 30%, #34d399 90%)",
          },
          "& .MuiTabs-flexContainer": {
            gap: 4,
          },
        },
        vertical: {
          "& .MuiTabs-indicator": {
            width: 3,
            height: "auto",
            borderRadius: "4px 0 0 4px",
            background: "linear-gradient(45deg, #10b981 30%, #34d399 90%)",
            left: 0,
            right: "auto",
          },
          "& .MuiTab-root": {
            alignItems: "flex-start",
            textAlign: "left",
            minWidth: 140,
            wordBreak: "keep-all",
            whiteSpace: "nowrap",
            "& .MuiTab-iconWrapper": {
              marginRight: 8,
              marginBottom: 0,
            },
          },
          "& .MuiTabs-flexContainer": {
            justifyContent: "flex-start",
            gap: 4,
          },
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            ".MuiBottomNavigationAction-label": { fontSize: "0.75rem" },
          },
        },
        label: { fontSize: "0.75rem" },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          "&.page-header": {
            marginBottom: "1.5rem",
            "@media (min-width:768px)": { marginBottom: "3rem" },
            "& .MuiTypography-h4": {
              fontSize: "1.75rem",
              "@media (min-width:768px)": { fontSize: "2.5rem" },
            },
            "& .MuiTypography-h6": {
              fontSize: "1rem",
              "@media (min-width:768px)": { fontSize: "1.25rem" },
            },
          },
        },
      },
    },
  },
}

// 라이트 테마
export const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: "light",
    primary: { main: "#10b981", light: "#34d399", dark: "#059669", contrastText: "#fff" },
    secondary: { main: "#ec4899", light: "#f472b6", dark: "#be185d", contrastText: "#fff" },
    error: { main: "#ef4444", light: "#f87171", dark: "#b91c1c", contrastText: "#fff" },
    warning: { main: "#f59e0b", light: "#fbbf24", dark: "#d97706", contrastText: "#fff" },
    info: { main: "#06b6d4", light: "#22d3ee", dark: "#0e7490", contrastText: "#fff" },
    success: { main: "#10b981", light: "#34d399", dark: "#059669", contrastText: "#fff" },
    text: { primary: "#1f2937", secondary: "#4b5563", disabled: "#9ca3af" },
    background: { default: "#f8fafc", paper: "#fff" },
    divider: "#e5e7eb",
  },
})

// 다크 테마
export const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: "dark",
    primary: { main: "#10b981", light: "#34d399", dark: "#059669", contrastText: "#fff" },
    secondary: { main: "#f472b6", light: "#fbbf24", dark: "#ec4899", contrastText: "#000" },
    error: { main: "#f87171", light: "#fca5a5", dark: "#ef4444", contrastText: "#000" },
    warning: { main: "#fbbf24", light: "#fcd34d", dark: "#f59e0b", contrastText: "#000" },
    info: { main: "#22d3ee", light: "#67e8f9", dark: "#06b6d4", contrastText: "#000" },
    success: { main: "#34d399", light: "#6ee7b7", dark: "#10b981", contrastText: "#000" },
    text: { primary: "#f1f5f9", secondary: "#94a3b8", disabled: "#64748b" },
    background: { default: "#0f172a", paper: "#1e293b" },
    divider: "#334155",
  },
  components: {
    ...baseTheme.components,
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 3px 0 rgba(0,0,0,0.3), 0 1px 2px 0 rgba(0,0,0,0.2)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.3), 0 2px 4px -1px rgba(0,0,0,0.2)",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          textTransform: "none" as const,
          borderRadius: 4,
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.08)",
          },
        },
      },
    },
  },
})

// 기본 테마 (라이트 모드)
export const theme = lightTheme
