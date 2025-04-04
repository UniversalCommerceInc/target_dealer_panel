import React from 'react';

const sharedClasses = {
  primaryColor: "text-primary",
  secondaryColor: "text-secondary",
  primaryBgColor: "bg-primary",
  secondaryBgColor: "bg-secondary",
  primaryFgColor: "text-primary-foreground",
  secondaryFgColor: "text-secondary-foreground",
};

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background dark:bg-background">
      <div className="max-w-md w-full text-center">
        {/* <img src="https://placehold.co/300?text=Page+Not+Found" alt="Page Not Found" className="mx-auto" /> */}
        <h1 className={`${sharedClasses.primaryColor} ${sharedClasses.primaryFgColor} text-4xl mt-8`}>404</h1>
        <p className={`${sharedClasses.secondaryColor} ${sharedClasses.secondaryFgColor} mt-4`}>Oops! The page you are looking for could not be found.</p>
        <a
          href="/"
          className={`mt-8 text-white inline-block ${sharedClasses.primaryBgColor} ${sharedClasses.primaryFgColor} font-semibold px-6 py-3 rounded-md transition duration-300 ease-in-out hover:bg-primary/80 dark:hover:bg-primary/60`}
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default PageNotFound;
