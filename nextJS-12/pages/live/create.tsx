import type { NextPage } from "next";
import Button from "nextJS-12/components/button";
import Input from "nextJS-12/components/input";
import Layout from "nextJS-12/components/layout";
import TextArea from "nextJS-12/components/textarea";

const Create: NextPage = () => {
  return (
    <Layout canGoBack title="Go Live">
      <form className=" space-y-4 py-10 px-4">
        <Input required label="Name" name="name" type="text" />
        <Input
          required
          label="Price"
          placeholder="0.00"
          name="price"
          type="text"
          kind="price"
        />
        <TextArea name="description" label="Description" />
        <Button text="Go live" />
      </form>
    </Layout>
  );
};

export default Create;
