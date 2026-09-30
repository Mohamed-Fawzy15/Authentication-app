import { useEffect } from "react";
import { useAuth } from "../../Hooks/Auth/useAuth";

const Home = () => {
  const { user, profile, isLoading, logoutUser } = useAuth();

  useEffect(() => {
    profile();
  }, []);

  return (
    <div className="min-h-screen bg-[#DBE3F7] flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md text-center flex flex-col gap-6">
        <div className="w-16 h-16 bg-[#2B3A67] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
          {user?.data?.name?.charAt(0).toUpperCase() || "A"}
        </div>
        <div>
          {/* Exact required welcome message */}
          <h1 className="text-2xl font-bold text-[#2B3A67]">
            Welcome to the application.
          </h1>
          {isLoading ? (
            <p className="text-sm text-gray-500 mt-2">Loading profile...</p>
          ) : user?.data ? (
            <div className="mt-4 text-left text-sm text-gray-600 bg-[#E9EDFA] p-4 rounded-xl flex flex-col gap-1">
              <p>
                <span className="font-semibold text-[#2B3A67]">Name:</span>{" "}
                {user.data.name}
              </p>
              <p>
                <span className="font-semibold text-[#2B3A67]">Email:</span>{" "}
                {user.data.email}
              </p>
            </div>
          ) : null}
        </div>
        <button
          onClick={logoutUser}
          className="w-full py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition duration-200 cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
