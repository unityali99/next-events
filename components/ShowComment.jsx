function ShowComment({ comments }) {
  return (
    <div className="row col-9 col-sm-7 col-md-6 mx-auto py-4 ">
      {comments.map((value) => (
        <div
          key={value.id}
          className="col-12 bg-gradient rounded-3 border border-success border-opacity-25 border-2 px-4 py-3 my-3 text-wrap "
        >
          <p className="fw-semibold">{value.comment}</p>
          <span className="float-end text-muted">
            <i>
              {"By "}
              {value.fullName}
            </i>
          </span>
        </div>
      ))}
    </div>
  );
}

export default ShowComment;
