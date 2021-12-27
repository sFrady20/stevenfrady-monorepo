import React from "react";
import { useImmer } from "use-immer";
import { useAsync } from "react-async-hook";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "~/services/firebase";

type FormState = {
    name: string,
    message: string,
    isAttending?: boolean,
    isBringingGuest?: boolean
}

const submit = async (form: FormState) => {
    await addDoc(collection(firestore, "rsvp"), form);
}

const RsvpForm = () => {
    const [form, updateForm] = useImmer<FormState>({
        name: "",
        message: "",
        isAttending: undefined,
        isBringingGuest: undefined
    });

    const submission = useAsync(submit, [form], {
        executeOnMount: false,
        executeOnUpdate: false
    });

    return (
        <>
            <input
                value={form.name}
                disabled={submission.loading}
                onChange={e => {
                    const val = e.target.value;
                    updateForm(form => {
                        form.name = val;
                    });
                }} />
            <button
                disabled={submission.loading}
                onClick={() => {
                    submission.execute(form);
                }}>
                Send
            </button>
        </>
    )
}

export default RsvpForm;