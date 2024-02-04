import { ScaleLoader } from "react-spinners";

const Loading = () => (
  <div className="flex justify-center">
    <ScaleLoader color="#d63636" data-testid="loader" />
  </div>
);

export default Loading;
