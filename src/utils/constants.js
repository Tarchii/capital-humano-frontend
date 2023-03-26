export const theme = {
  primary: "#1b2a4e",
  success: "#42ba96",
  white: "#ffffff",
  radius: "8px",
  shadow: "2px 2px 2px 0px rgba(0, 0, 0, 0.2)",
  mask: "rgba(27, 42, 78, 0.8)",
  warning: "#ff5722",
};

export const getUserAvatar = () => {
  return localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).avatar
    : null;
};

export const getUserName = () => {
  return localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).name
    : null;
};

export const getUserRole = () => {
  return localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).role
    : null;
};

export const getUser = () => {
  return localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
};
