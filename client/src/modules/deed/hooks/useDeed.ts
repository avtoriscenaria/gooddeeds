import { useRouter } from "next/router";
import { ChangeEvent, useState, useEffect } from "react";
import { api } from "src/constants/api";
import { useApi } from "src/hooks";

export const useDeed = (type?: string) => {
  const [isLoad, setIsLoad] = useState(false);
  const router = useRouter();
  const deedId: any = router.query.id;
  const { request: subbmitDeed } = useApi();
  const { request: getDeed, data: initialDeed }: any = useApi();
  const [deedName, setDeedName] = useState("");
  const [deedText, setDeedText] = useState("");

  useEffect(() => {
    if (type === "editor" && deedId) {
      getDeed(api.deads.getDeed(deedId));
    } else if (type !== "editor") {
      setIsLoad(true);
    }
  }, [deedId]);

  useEffect(() => {
    console.log("initialDeed");
    if (type === "editor" && initialDeed && !isLoad) {
      setDeedName(initialDeed.name);
      setDeedText(initialDeed.text);
      setIsLoad(true);
    }
  }, [initialDeed]);

  const onChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (name === "deedName") {
      setDeedName(value);
    }
    if (name === "deedText") {
      setDeedText(value);
    }
  };

  const onSubbmit = async () => {
    subbmitDeed(
      type === "editor" ? api.deads.updateDeed(deedId) : api.deads.addDeed,
      { name: deedName, text: deedText }
    );
  };

  return { deedName, deedText, onChange, onSubbmit };
};
