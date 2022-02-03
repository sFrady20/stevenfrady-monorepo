import React, { useState } from "react";
import { useImmer } from "use-immer";
import { useAsync } from "react-async-hook";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "~/services/firebase";

type FormState = {
  name: string;
  message: string;
  isAttending?: boolean;
  isBringingGuest?: boolean;
};

const submit = async (form: FormState) => {
  if (!form.name) throw new Error("Name is required");
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

  const [isSuccess, setSuccess] = useState(false);

  const submission = useAsync(submit, [form], {
    executeOnMount: false,
    executeOnUpdate: false,
    onSuccess: () => setSuccess(true),
  });

  return (
    <div id="rsvp" className="bg-white p-12 flex flex-col space-y-8 w-600px">
      <h2 className="text-size-32px text-center">RSVP</h2>
      <div className="relative flex flex-col space-y-8">
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
        <div className="flex flex-row space-x-6">
          <div className="space-y-2 flex-1">
            <div className="text-sm">Will you be attending?</div>
            <div className="flex flex-row divide-x-1 border-1 text-center">
              <div
                className={`px-5 py-3 flex-1 cursor-pointer ${
                  form.isAttending ? `bg-green-100` : ``
                }`}
                onClick={() =>
                  updateForm((f) => {
                    f.isAttending = true;
                  })
                }
              >
                Yes
              </div>
              <div
                className={`px-5 py-3 flex-1 cursor-pointer ${
                  !form.isAttending ? `bg-red-100` : ``
                }`}
                onClick={() =>
                  updateForm((f) => {
                    f.isAttending = false;
                  })
                }
              >
                No
              </div>
            </div>
          </div>
          <div className="space-y-2 flex-1">
            <div className="text-sm">Will you be bringing a guest?</div>
            <div className="flex flex-row divide-x-1 border-1 text-center">
              <div
                className={`px-5 py-3 flex-1 cursor-pointer ${
                  form.isBringingGuest ? `bg-green-100` : ``
                }`}
                onClick={() =>
                  updateForm((f) => {
                    f.isBringingGuest = true;
                  })
                }
              >
                Yes
              </div>
              <div
                className={`px-5 py-3 flex-1 cursor-pointer ${
                  !form.isBringingGuest ? `bg-red-100` : ``
                }`}
                onClick={() =>
                  updateForm((f) => {
                    f.isBringingGuest = false;
                  })
                }
              >
                No
              </div>
            </div>
          </div>
        </div>
        {submission.error && (
          <div className="text-red-500 text-sm text-center">
            {submission.error.message}
          </div>
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
    </div>
  );
};

export default RsvpForm;
