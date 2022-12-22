import {
  TextBlock,
  TextRow,
  RectShape,
  RoundShape,
} from "react-placeholder/lib/placeholders";

const Placeholder = ({ shaped }) => {
  if (shaped)
    return (
      <div className="my-5">
        <div className="text-center">
          <RoundShape
            className="mx-auto d-inline-block me-2"
            color="gray"
            style={{ width: "10rem", height: "10rem" }}
          />
          <RectShape
            className="mx-auto rounded-3 d-inline-block"
            style={{ width: "40rem", height: "10rem" }}
            color="gray"
          />
        </div>
        <TextBlock
          className="mx-auto my-2"
          rows={3}
          color="gray"
          style={{ width: "49rem", height: "10rem" }}
        />
      </div>
    );

  return (
    <div className="my-awesome-placeholder my-3 text-center">
      <TextRow color="gray" className="w-75 mx-auto " />
      <TextRow color="gray" className="w-75 mx-auto " />
      <TextRow color="gray" className="w-75 mx-auto " />
      <br />
      <RectShape
        color="gray"
        className="mx-auto"
        style={{ width: "65rem", height: "10rem", borderRadius: ".5rem" }}
      />
      <TextBlock
        color="gray"
        rows={3}
        lineSpacing={10}
        className="w-75 mx-auto my-3"
      />
    </div>
  );
};

export default Placeholder;
