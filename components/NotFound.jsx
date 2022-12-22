import { useRouter } from "next/router";

const NotFound = () => {
  const router = useRouter();
  return (
    <div className="container text-center py-5">
      <h2 className="display-2 bg-warning py-3 w-75 mx-auto rounded-2">
        404: Not Found
      </h2>
      <button
        onClick={router.back}
        className="btn btn-primary text-white my-4"
        style={{ width: "15%" }}
      >
        Return
      </button>
    </div>
  );
};

export default NotFound;
