import { useState } from "react";

const Display = ({ propUsers }) => {
  const [messageState, setMessageState] = useState(propUsers);
  return (
    <div className="mockup-code w-96">
      <ul>
        {messageState?.map((m) => (
          <li key = {m.id}>
            <pre data-prefix=">">
              <code>{m.Message}</code>
            </pre>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Display;
