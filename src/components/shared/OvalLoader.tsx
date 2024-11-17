import { Oval } from "react-loader-spinner";

interface OvalLoaderProps {
  size?: string;
  strokeWidth?: string;
  color?: string;
  secondaryColor?: string;
}

const OvalLoader = ({
  size = "50",
  color = "#008000",
  strokeWidth = "10",
  secondaryColor = "#eeeeee",
}: OvalLoaderProps) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Oval
        visible={true}
        height={size}
        width={size}
        strokeWidth={strokeWidth}
        color={color}
        secondaryColor={secondaryColor}
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default OvalLoader;
