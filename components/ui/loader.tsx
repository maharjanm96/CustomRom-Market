import { Spinner } from "@nextui-org/spinner";

const Loader = () => {
  return (
    <div className="flex gap-4">
      <div className="flex gap-4">
        <Spinner label="Default" color="default" labelColor="foreground" />
        <Spinner label="Primary" color="primary" labelColor="primary" />
        <Spinner label="Secondary" color="secondary" labelColor="secondary" />
        <Spinner label="Success" color="success" labelColor="success" />
        <Spinner label="Warning" color="warning" labelColor="warning" />
        <Spinner label="Danger" color="danger" labelColor="danger" />
      </div>
    </div>
  );
};

export default Loader;
