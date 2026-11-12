const paths = {
  arrow: "M5 12h14m-6-6 6 6-6 6",
  book: "M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22V5.5Zm0 0A2.5 2.5 0 0 1 6.5 8H20",
  check: "m5 12 4 4L19 6",
  eye: "M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  lock: "M6 10V7a6 6 0 0 1 12 0v3m-13 0h14v11H5V10Z",
  mail: "M3 5h18v14H3V5Zm0 1 9 7 9-7",
  profile: "M20 21a8 8 0 0 0-16 0m12-13a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
};

export default function Icon({ name, size = 20 }) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={paths[name]} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}
