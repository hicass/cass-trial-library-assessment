// Component to render a loading animation
export const Loader = () => {
  return (
    <svg
      viewBox="25 25 50 50"
      className="w-[3.25em] origin-center animate-spin"
    >
      <circle
        r="20"
        cy="50"
        cx="50"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth={2}
        strokeDasharray="1,200"
        strokeDashoffset={0}
        strokeLinecap="round"
        style={{
          animation: 'dash4 1.5s ease-in-out infinite',
        }}
      ></circle>
    </svg>
  );
};

export default Loader;
