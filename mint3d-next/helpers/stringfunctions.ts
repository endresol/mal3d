export const getStatusFromPhase = (phase: number) => {
  if (phase === 0) {
    return "Closed";
  } else if (phase === 1) {
    return "Snapshot I mint";
  } else if (phase === 2) {
    return "Snapshot II mint";
  } else if (phase === 3) {
    return "Ambassador mint";
  } else if (phase === 4) {
    return "Team mint";
  } else if (phase === 5) {
    return "Founders mint";
  } else if (phase === 6) {
    return "Partner Collection mint";
  } else if (phase === 7) {
    return "Public mint";
  } else {
    return "Unknown";
  }
};
