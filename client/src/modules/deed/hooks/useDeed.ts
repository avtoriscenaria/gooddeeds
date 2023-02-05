import { useRouter } from "next/router";
import { ChangeEvent, useState, useEffect, useMemo } from "react";
import { DEED_EDITOR_TYPE } from "src/constants";
import { api } from "src/constants/api";
import { useApi } from "src/hooks";
import { V_deed } from "../validators";

export const useDeed = (type?: string) => {
  const [isLoad, setIsLoad] = useState(false);
  const router = useRouter();
  const deedId: any = router.query.id;
  const { request: subbmitDeed, isLoading: isSaving } = useApi();
  const {
    request: getDeed,
    data: initialDeed,
    isLoading: _isLoading,
  }: any = useApi();
  const [deedName, setDeedName] = useState("");
  const [deedText, setDeedText] = useState("");
  const [error, setError] = useState<any>(null);

  const isLoading = useMemo(
    () => type === DEED_EDITOR_TYPE && _isLoading,
    [_isLoading]
  );

  useEffect(() => {
    if (type === DEED_EDITOR_TYPE && deedId) {
      getDeed(api.deeds.getDeed(deedId));
    } else if (type !== DEED_EDITOR_TYPE) {
      setIsLoad(true);
    }
  }, [deedId]);

  useEffect(() => {
    if (type === DEED_EDITOR_TYPE && initialDeed && !isLoad) {
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
    const deedData = {
      name: deedName.trim(),
      text: deedText.trim(),
    };
    const { isValid, errors } = V_deed(deedData);

    if (isValid) {
      const res = await subbmitDeed(
        type === DEED_EDITOR_TYPE
          ? api.deeds.updateDeed(deedId)
          : api.deeds.addDeed,
        deedData
      );
      if (res.ok) {
        setError(null);
      }
      if (res?.ok && res?.data && type !== DEED_EDITOR_TYPE) {
        const { _id } = res.data;
        setDeedName("");
        setDeedText("");
        router.push({
          pathname: `/deed/${_id}`,
        });
      }
    } else {
      setError(errors);
    }
  };

  return {
    deedName,
    deedText,
    onChange,
    onSubbmit,
    isLoading,
    isSaving,
    error,
  };
};
