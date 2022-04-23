import { getDocs, collection, query } from "firebase/firestore";
import { useState } from "react";
import { useAsync } from "react-async-hook";
import { firestore } from "~/services/firebase";
import { RsvpEntry } from "../../components/RsvpForm";

const fetchDocs = async () =>
  await getDocs(query(collection(firestore, "rsvp")));

function Guestlist() {
  const docsFetcher = useAsync(fetchDocs, [], { executeOnUpdate: false });

  return (
    <div className="flex flex-col items-center max-w-1024px w-full border-w-1 rounded-sm p-5 bg-white mx-auto my-10">
      <div className="p-5 w-full text-right">
        Total Count:{" "}
        {docsFetcher.result?.docs
          .map(
            (d) =>
              (d.get("isAttending")
                ? d.get("isBringingGuest")
                  ? 2
                  : 1
                : 0) as number
          )
          .reduce((a, b) => a + b, 0)}
      </div>
      <div className="text-left flex w-full items-start border-b-1 children:(flex-1 px-5 py-4 font-bold)">
        <div className="">Name</div>
        <div className="text-center">Is Attending?</div>
        <div className="text-center">Is Bringing Guest</div>
        <div className="">Message</div>
      </div>
      {docsFetcher.result?.docs?.map((doc, i) => (
        <div className="text-left flex w-full items-start children:(flex-1 px-5 py-4) odd:bg-light-200">
          <div className="">{doc.get("name")}</div>
          <div className="text-center">
            {doc.get("isAttending") ? "Yes" : "No"}
          </div>
          <div className="text-center">
            {doc.get("isBringingGuest") ? "Yes" : "No"}
          </div>
          <div className="text-xs text-gray-500 italic ">
            {doc.get("message")}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Guestlist;
