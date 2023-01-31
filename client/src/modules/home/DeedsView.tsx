import React from "react";

import { A, Dialog } from "src/components";
import { Accordion } from "src/modules/home/components";
import { useDeeds } from "./hooks";

interface PropTypes {
  deeds: any[];
  onDelete: (id: string) => void;
}

export const DeedsView = () => {
  const { deeds, onDelete, dialogClass, onCancel } = useDeeds();

  return (
    <div className="w-full overflow-hidden flex flex-col">
      <div className="p-3">DEEDS</div>
      <div className="px-3 flex items-center py-2">
        <A href="/deed" label="Add deed" />
      </div>
      <div className="overflow-auto">
        {deeds.map((deed: any, i: number) => (
          <Accordion
            key={i}
            deed={deed}
            isEditable={true}
            onDelete={onDelete}
          />
        ))}
      </div>
      {Boolean(dialogClass) && <Dialog {...dialogClass} onCancel={onCancel} />}
    </div>
  );
};
