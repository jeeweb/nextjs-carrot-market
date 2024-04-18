import type { NextPage } from "next";
import Button from "nextJS-12/components/button";
import Layout from "nextJS-12/components/layout";
import TextArea from "nextJS-12/components/textarea";

const Write: NextPage = () => {
  return (
    <Layout canGoBack title="Write Post">
      <form className="p-4 space-y-4">
        <TextArea required placeholder="Ask a question!" />
        <Button text="Submit" />
      </form>
    </Layout>
  );
};
