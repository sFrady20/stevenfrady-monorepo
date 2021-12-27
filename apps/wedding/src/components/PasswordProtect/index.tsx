import { times } from "lodash";
import React, { ReactNode, useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";

const PasswordProtect = (props: {
  children?: ReactNode;
  key?: string;
  password?: string;
}) => {
  const { key = "_a&s_pw", password = "2468", children } = props;

  const [localVal, setLocalVal] = useLocalStorage(key, "");
  const [fieldVal, setFieldVal] = useState("");

  useEffect(() => {
    if (fieldVal.length >= password.length) {
      setLocalVal(fieldVal);
      setFieldVal("");
    }
  }, [fieldVal, password, setLocalVal, setFieldVal]);

  useEffect(() => {
    if (localVal === password) return;
    const listener = (e: KeyboardEvent) => {
      if (e.key === "Backspace") setFieldVal("");
      if (/^[\d\w]$/i.test(e.key)) setFieldVal((f) => f + e.key);
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [setFieldVal, localVal, fieldVal, password]);

  return localVal !== password ? (
    <div className="fixed flex flex-col bg-gray-900 items-center justify-center inset-0">
      <div className="bg-gray-800 p-5 rounded-md">
        <div className="flex flex-row space-x-4">
          {times(password.length, (i) => (
            <div
              className={`rounded-full ${
                fieldVal[i] ? "bg-gray-50" : "bg-gray-700"
              } w-5 h-5`}
            />
          ))}
        </div>
      </div>
    </div>
  ) : (
    <>{children}</>
  );
};

export default PasswordProtect;
