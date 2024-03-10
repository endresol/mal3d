export const getStatusFromPhase = (phase: number) => {
  console.log("phase", phase);
  if (phase === 0) {
    return "Closed"
  } else if (phase === 1) {
    return "Staff mint"
  } else if (phase === 2) {
    return "Ambassador mint"
  } else if (phase === 3) {
    return "Snatshot I mint"
  } else if (phase === 4) {
    return "Snatshot II mint"
  } else if (phase === 5) {
    return "Partner Collection mint"
  } else if (phase === 6) {
    return "Public mint"
  } else {
    return "Unknown"
  }
};


