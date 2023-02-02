import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { api } from "src/constants/api";
import { useApi } from "src/hooks";

export const useDeeds = (isFriend?: boolean) => {
  const router = useRouter();
  const {
    request: getDeedsRequest,
    data: deeds,
    update,
    isLoading: isDeedsLoading,
  }: any = useApi();
  const { request: deleteDeed, isLoading: isDeedDeleting }: any = useApi();
  const [dialogClass, setDialogClass] = useState<any>(null);
  const [isLoad, setIsLoad] = useState(false);
  const friend_id: any = router.query.id;

  const isLoading = useMemo(
    () => !isLoad || isDeedsLoading,
    [isLoad, isDeedsLoading]
  );

  const gedDeeds = useCallback(async () => {
    if (isFriend && friend_id && !isLoad) {
      await getDeedsRequest(api.deeds.getUserDeeds(friend_id));
      setIsLoad(true);
    } else if (!isFriend) {
      await getDeedsRequest(api.deeds.getDeeds);
      setIsLoad(true);
    }
  }, [friend_id, isLoad]);

  useEffect(() => {
    gedDeeds();
  }, [gedDeeds]);

  const onDelete = (deed: any) => () => {
    const _dialogClass = {
      title: "Deleting",
      description: `Are you sure that you want to deleter ${deed.name}?`,
      onSubbmit: async () => {
        const res = await deleteDeed(api.deeds.deleteDeed(deed._id));
        if (res?.ok) {
          update(deeds.filter((_deed: any) => _deed._id !== deed._id));
          setDialogClass(null);
        }
      },
    };
    setDialogClass(_dialogClass);
  };

  const onCancel = () => {
    setDialogClass(null);
  };

  const onAddDeed = () => {
    router.push({
      pathname: `/deed`,
    });
  };

  return {
    deeds: deeds || [],
    onDelete,
    dialogClass,
    onCancel,
    isLoading,
    onAddDeed,
    isDeedDeleting,
  };
};
