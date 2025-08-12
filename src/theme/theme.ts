import { createTheme } from "@mui/material/styles"

export const theme = createTheme({
  palette: {
    primary: {
      main: "#2563eb", // Blue-500
      light: "#60a5fa", // Blue-400
      dark: "#1d4ed8", // Blue-700
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ec4899", // Pink-500
      light: "#f472b6", // Pink-400
      dark: "#be185d", // Pink-700
      contrastText: "#ffffff",
    },
    error: {
      main: "#ef4444", // Red-500
      light: "#f87171", // Red-400
      dark: "#b91c1c", // Red-700
      contrastText: "#ffffff",
    },
    warning: {
      main: "#f59e0b", // Orange-500
      light: "#fbbf24", // Orange-400
      dark: "#d97706", // Orange-700
      contrastText: "#ffffff",
    },
    info: {
      main: "#06b6d4", // Cyan-500
      light: "#22d3ee", // Cyan-400
      dark: "#0e7490", // Cyan-700
      contrastText: "#ffffff",
    },
    success: {
      main: "#10b981", // Emerald-500
      light: "#34d399", // Emerald-400
      dark: "#059669", // Emerald-700
      contrastText: "#ffffff",
    },
    text: {
      primary: "#1f2937", // Gray-900
      secondary: "#4b5563", // Gray-600
      disabled: "#9ca3af", // Gray-400
    },
    background: {
      default: "#f8fafc", // Gray-50
      paper: "#ffffff",
    },
    divider: "#e5e7eb", // Gray-200
  },
  typography: {
    fontFamily: "Pretendard, sans-serif",
    h1: {
      fontSize: "3rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 700,
    },
    h4: {
      fontSize: "1.75rem",
      fontWeight: 700,
    },
    h5: {
      fontSize: "1.5rem",
      fontWeight: 700,
    },
    h6: {
      fontSize: "1.25rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 4, // Default border radius for components
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true, // Disable shadow for all buttons by default
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
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)", // Tailwind-like shadow-md
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16, // Larger border radius for cards
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)", // Tailwind-like shadow-lg
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none", // No shadow for app bar
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          textTransform: "none",
          borderRadius: 4,
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)", // action.hover 색상
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
            background: "linear-gradient(45deg, #2563eb 30%, #10b981 90%)",
          },
          "& .MuiTabs-flexContainer": {
            gap: 4,
          },
        },
        // 세로 방향 탭
        vertical: {
          "& .MuiTabs-indicator": {
            width: 3,
            height: "auto",
            borderRadius: "4px 0 0 4px",
            background: "linear-gradient(45deg, #2563eb 30%, #10b981 90%)",
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
            ".MuiBottomNavigationAction-label": {
              fontSize: "0.75rem", // 클릭해도 동일 크기
            },
          },
        },
        label: {
          fontSize: "0.75rem", // 기본 크기
        },
      },
    },
    // 페이지 헤더 스타일을 위한 컨테이너 설정
    MuiContainer: {
      styleOverrides: {
        root: {
          // 페이지 헤더 섹션을 위한 클래스
          "&.page-header": {
            marginBottom: "1.5rem",
            "@media (min-width: 768px)": {
              marginBottom: "3rem",
            },
            "& .MuiTypography-h4": {
              fontSize: "1.75rem",
              "@media (min-width: 768px)": {
                fontSize: "2.5rem",
              },
            },
            "& .MuiTypography-h6": {
              fontSize: "1rem",
              "@media (min-width: 768px)": {
                fontSize: "1.25rem",
              },
            },
          },
        },
      },
    },
  },
})