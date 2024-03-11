import { BigNumber } from "ethers";

export const getStatusFromPhase = (phase: BigNumber) => {
  console.log("status phase", phase);

  if (phase.toNumber() === 0) {
    return "Closed";
  } else if (phase.toNumber() === 1) {
    return "Snatshot I mint";
  } else if (phase.toNumber() === 2) {
    return "Snatshot II mint";
  } else if (phase.toNumber() === 3) {
    return "Ambassador mint";
  } else if (phase.toNumber() === 4) {
    return "Team mint";
  } else if (phase.toNumber() === 5) {
    return "Staff mint";
  } else if (phase.toNumber() === 6) {
    return "Partner Collection mint";
  } else if (phase.toNumber() === 7) {
    return "Public mint";
  } else {
    return "Unknown";
  }
};
