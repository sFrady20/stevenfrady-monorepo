import React from "react";
import { useImmer } from "use-immer";
import { useAsync } from "react-async-hook";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "~/services/firebase";

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
    <div className="bg-white p-12 flex flex-col space-y-8 w-600px">
      <input
        value={form.name}
        disabled={submission.loading}
        placeholder="Name"
        className="bg-transparent border-b-width-1px border-gray-300 py-2 px-4"
        onChange={(e) => {
          const val = e.target.value;
          updateForm((form) => {
            form.name = val;
          });
        }}
      />
      <input
        value={form.message}
        disabled={submission.loading}
        placeholder="Short Message (Optional)"
        className="bg-transparent border-b-width-1px border-gray-300 py-2 px-4"
        onChange={(e) => {
          const val = e.target.value;
          updateForm((form) => {
            form.message = val;
          });
        }}
      />
      {submission.error && (
        <div className="color-red-500">{submission.error.message}</div>
      )}
      <button
        className="border border-solid border-black px-12 py-4 text-lg"
        disabled={submission.loading}
        onClick={() => {
          submission.execute(form);
        }}
      >
        Send
      </button>
    </div>
  );
};

export default RsvpForm;
