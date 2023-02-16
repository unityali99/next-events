import { DANGER } from "../utils/aliases";
import Alert from "./Alert";

const NetworkError = () => {
  return <Alert type={DANGER} message="Network Error" dismissible={false} />;
};

export default NetworkError;
