import { useEffect, useState } from "react";
import { api } from "src/constants/api";
import { useApi } from "src/hooks";

export const useDeeds = () => {
  const { request: getDeeds, data: deeds, update }: any = useApi();
  const { request: deleteDeed }: any = useApi();
  const [dialogClass, setDialogClass] = useState<any>(null);

  useEffect(() => {
    getDeeds(api.deeds.getDeeds);
  }, []);

  const onDelete = (deed: any) => () => {
    const dialogClass = {
      title: "Deleting",
      description: `Are you sure that you want to deleter ${deed.name}?`,
      onSubbmit: async () => {
        const { ok } = await deleteDeed(api.deeds.deleteDeed(deed._id));
        if (ok) {
          update(deeds.filter((_deed: any) => _deed._id !== deed._id));
          setDialogClass(null);
        }
      },
    };
    setDialogClass(dialogClass);
  };

  const onCancel = () => {
    setDialogClass(null);
  };

  return { deeds: deeds || [], onDelete, dialogClass, onCancel };
};
