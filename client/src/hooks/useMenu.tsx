import { useRouter } from "next/router";
import { useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Input } from "src/components";
import { api } from "src/constants/api";
import { useAppSelector } from "src/redux/hooks";
import { setUser, updateUser } from "src/redux/reducers/user";
import { getUser } from "src/redux/selectors";
import { useApi } from "./useApi";
import { useOnClickOutside } from "./useOnClickOutside";

export const useMenu = () => {
  const router = useRouter();
  const { request: logout }: any = useApi();
  const { request: deleteAccount, isLoading: isDeleteLoading }: any = useApi();
  const { request: changeNickname, isLoading: isChangeLoading }: any = useApi();

  const user = useAppSelector(getUser);
  const [isOpen, setIsOpen] = useState(false);
  const [dialogClass, setDialogClass] = useState<any>(null);
  const dispatch = useDispatch();

  const menuRef: any = useRef();
  const inputRef: any = useRef();

  const isLoading = useMemo(
    () => isDeleteLoading || isChangeLoading,
    [isDeleteLoading, isChangeLoading]
  );

  useOnClickOutside(menuRef, () => {
    if (!dialogClass) {
      setIsOpen(false);
    }
  });

  const onLogout = async () => {
    const res = await logout(api.auth.logout);
    if (res?.ok) {
      localStorage.clear();
      dispatch(setUser(null));
      router.push({
        pathname: "/login",
      });
    }
  };

  const onChangeNickname = () => {
    const _dialogClass = {
      title: "Change nickname",
      description: (
        <Input
          className="my-0"
          inputRef={inputRef}
          defaultValue={user?.nickname}
        />
      ),
      onCancel: () => setDialogClass(null),
      onSubbmit: async () => {
        const newData = {
          nickname: inputRef.current?.value?.trim(),
        };
        const res = await changeNickname(api.user.updateNickname, newData);
        if (res?.ok) {
          dispatch(updateUser(newData));
          setDialogClass(null);
        }
      },
    };
    setDialogClass(_dialogClass);
  };

  const onDeleteAccount = () => {
    const _dialogClass = {
      title: "Account deleting",
      description:
        "Are you sure that you want to delete your account? It won't be possible to cancel.",
      onSubbmit: async () => {
        const res = await deleteAccount(api.user.deleteAccount);
        if (res?.ok) {
          localStorage.clear();
          router.push({
            pathname: "/login",
          });
        }
      },
      onCancel: () => setDialogClass(null),
    };
    setDialogClass(_dialogClass);
  };

  return {
    user,
    onLogout,
    isOpen,
    setIsOpen,
    menuRef,
    dialogClass,
    onChangeNickname,
    onDeleteAccount,
    isLoading,
  };
};
