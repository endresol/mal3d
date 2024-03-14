export const etherscanTransaction = (hash: string) => {
  return (
    <div>
      Transaction started{" "}
      <a target='_blank' href={`${process.env.NEXT_PUBLIC_SCANNER_URL}${hash}`}>
        {hash}
      </a>
    </div>
  );
};
