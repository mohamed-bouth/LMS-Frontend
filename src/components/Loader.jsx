const sizes = {
  5: "w-5 h-5",
  10: "w-10 h-10",
  12: "w-12 h-12",
};

function Loader({ darkMode, size = 10}) {

    if (darkMode) {
        return (
        <div
            className={`${sizes[size]} border-4 border-t-[#4f46d9]  border-gray-300 rounded-full animate-spin`}
        />
        );
    }
    return (
        <div
        className={`${sizes[size]} border-4 border-t-[#4f46d9] border-gray-300 rounded-full animate-spin`}
        />
    );
}

export default Loader;
