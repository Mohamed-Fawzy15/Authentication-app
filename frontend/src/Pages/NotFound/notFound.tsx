import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <h3 className="text-[#2B3A67] font-bold text-9xl">404</h3>
      <p className="text-[#2B3A67] font-semibold">Page not found</p>
      <span>The page you're looking for doesn't exist or has been moved.</span>
      <button
        className="bg-[#2B3A67] text-white py-2 px-4 rounded-md cursor-pointer hover:bg-[#2B3A67] transition-all duration-300 ease-in-out"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
};
export default NotFound;
