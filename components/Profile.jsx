import { useSession } from "next-auth/react";
import ReactPlaceholder from "react-placeholder/lib";
import { AiFillWarning } from "react-icons/ai";
import { RectShape, TextRow } from "react-placeholder/lib/placeholders";
import { useRouter } from "next/router";
import { useEffect } from "react";

function Profile() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const router = useRouter();
  useEffect(() => {
    if (!session && !isLoading) router.replace("/login");
  }, [isLoading, router, session]);

  return (
    <ReactPlaceholder
      ready={!isLoading}
      customPlaceholder={
        <div className="w-50 mx-auto my-5 py-5">
          <RectShape
            color="gray"
            className="w-75 mx-auto rounded-1"
            style={{ height: "5rem" }}
          />
          <TextRow color="gray" className="w-75 mx-auto rounded-1" />
          <TextRow color="gray" className="w-75 mx-auto rounded-1" />
          <RectShape
            color="gray"
            className="w-75 mx-auto rounded-1 my-3"
            style={{ height: "5rem" }}
          />
          <RectShape
            color="gray"
            className="w-75 mx-auto rounded-1"
            style={{ height: "5rem" }}
          />
          <TextRow color="gray" className="w-75 mx-auto rounded-1" />
          <TextRow color="gray" className="w-75 mx-auto rounded-1" />
          <RectShape
            color="gray"
            className="w-75 mx-auto rounded-1 my-3"
            style={{ height: "5rem" }}
          />
        </div>
      }
      showLoadingAnimation
    >
      {session && (
        <div className="card col-7 col-lg-4 text-white bg-primary my-5 mx-auto">
          <div className="card-header bg-info">
            <h6>Account Name:</h6>
          </div>
          <div className="card-body">
            <h4 className="card-title ml-5">{session.user.name}</h4>
          </div>
          <div className="card-header bg-info">
            <h6>Email:</h6>
          </div>
          <div className="card-body">
            <h4 className="card-title ml-5">{session.user.email}</h4>
          </div>
          <div className="card-header bg-info text-center">
            <button className="btn btn-primary mx-2 my-2">
              Reset Password
            </button>
          </div>
          <div className="card-header bg-warning text-danger text-center">
            <h6>
              Danger Zone <AiFillWarning size="20px" />
            </h6>
          </div>
          <div className="card-body text-center">
            <button className="btn btn-danger mx-2 my-2">
              Delete my account
            </button>
            <button className="btn btn-warning mx-2 my-2">
              Disable my account
            </button>
          </div>
        </div>
      )}
    </ReactPlaceholder>
  );
}

export default Profile;
