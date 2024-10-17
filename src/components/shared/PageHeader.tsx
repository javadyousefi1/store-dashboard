import { useNavigate } from "react-router-dom";

const PageHeader: React.FC<{
  title: string;
  leftSection?: JSX.Element;
  hasBack?: true;
}> = ({ title, leftSection, hasBack }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div className="flex items-center justify-start pb-3 mb-4 border-b border-gray-200 md:h-[58px] px-4 md:px-0">
      {hasBack && (
        <button
          onClick={handleClick}
          className="ml-3 border border-middle-border p-1.5 rounded-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="1.5"
              d="M14.43 5.93L20.5 12l-6.07 6.07M3.5 12h16.83"
            ></path>
          </svg>
        </button>
      )}
      <h1 className="text-lg font-bold">{title}</h1>
      <div className="text-sm md:text-md flex-1 flex justify-end">
        {leftSection}
      </div>
    </div>
  );
};

export default PageHeader;
