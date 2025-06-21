const getColor = (role: any) => {
  if (role === "auditor") {
    return "bg-[#0093DD]";
  } else if (role === "admin") {
    return "bg-[#E27303]";
  } else {
    return "bg-[#08B786]";
  }
};

const textColor = (role: any) => {
  if (role === "auditor") {
    return "text-[#0093DD]";
  } else if (role === "admin") {
    return "text-[#E27303]";
  } else {
    return "text-[#08B786]";
  }
};

export { getColor, textColor };
