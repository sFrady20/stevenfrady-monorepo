import React from "react";
import { useImmer } from "use-immer";
import { useAsync } from "react-async-hook";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "~/services/firebase";
import shortid from "shortid";

type FormState = {
  name: string;
  message: string;
  isAttending?: true;
  isBringingGuest?: true;
};

const submit = async (form: FormState) => {
  const result = await addDoc(collection(firestore, "rsvp"), form);
  console.log(result);
};

const RsvpForm = () => {
  const [form, updateForm] = useImmer<FormState>({
    name: "",
    message: "",
    isAttending: true,
    isBringingGuest: true,
  });

  const submission = useAsync(submit, [form], {
    executeOnMount: false,
    executeOnUpdate: false,
  });

  return (
    <>
      <input
        value={form.name}
        disabled={submission.loading}
        className="bg-transparent border-b-width-2px border-white"
        onChange={(e) => {
          const val = e.target.value;
          updateForm((form) => {
            form.name = val;
          });
        }}
      />
      {submission.error && (
        <div className="color-red-500">{submission.error.message}</div>
      )}
      <button
        disabled={submission.loading}
        onClick={() => {
          submission.execute(form);
        }}
      >
        Send
      </button>
    </>
  );
};

export default RsvpForm;
