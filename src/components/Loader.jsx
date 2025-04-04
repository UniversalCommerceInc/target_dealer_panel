const Loader = () => {
    return (
      <div className="flex h-screen items-center dark:bg-customBlue justify-center bg-white">
        <div className="relative h-32 w-32">
          <div className="absolute top-0 left-0 h-32 w-32 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
          <div className="absolute top-2 left-2 h-28 w-28 animate-spin-1.5 rounded-full border-4 border-solid border-primary border-t-transparent"></div>
          <div className="absolute top-4 left-4 h-24 w-24 animate-spin-3 rounded-full border-4 border-solid border-primary border-t-transparent"></div>
        </div>
      </div>
    );
  };
  
  export default Loader;
  