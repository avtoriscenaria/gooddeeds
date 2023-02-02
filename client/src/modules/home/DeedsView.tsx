import React from "react";

import { Button, Dialog, Loader } from "src/components";
import { DeedCard } from "src/modules/home/components";
import { useDeeds } from "./hooks";

interface PropTypes {
  isFriend?: boolean;
}

export const DeedsView = ({ isFriend }: PropTypes) => {
  const {
    deeds,
    onDelete,
    dialogClass,
    onCancel,
    isLoading,
    onAddDeed,
    isDeedDeleting,
  } = useDeeds(isFriend);

  return (
    <div className="w-full overflow-hidden flex flex-col">
      <div className="p-3">DEEDS</div>
      {!isFriend && (
        <div className="px-3 flex items-center py-2">
          <Button onClick={onAddDeed} label="Add deed" />
        </div>
      )}
      <div className="overflow-auto">
        {isLoading ? (
          <Loader className="ml-3" />
        ) : deeds.length > 0 ? (
          deeds.map((deed: any, i: number) => (
            <DeedCard
              key={i}
              deed={deed}
              isEditable={!isFriend}
              onDelete={onDelete}
            />
          ))
        ) : (
          <div className="ml-3">
            {isFriend
              ? "There are no good deeds =("
              : "    Are you a bad guy? You have no good deeds..."}
          </div>
        )}
      </div>
      {Boolean(dialogClass) && !isFriend && (
        <Dialog
          {...dialogClass}
          onCancel={onCancel}
          isLoading={isDeedDeleting}
        />
      )}
    </div>
  );
};
