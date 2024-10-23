const Loader = () => {
  return (
    <div className="w-full flex justify-center">
      <video autoPlay loop muted style={{ width: "250px", height: "250px" }}>
        <source src="/videos/TennisBallWEBM.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Loader;
