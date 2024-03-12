export const etherscanTransaction = (hash: string) => {
  return `<a href="https://sepolia.etherscan.io/tx/${hash}>">${hash}>hash<a>`;
};
