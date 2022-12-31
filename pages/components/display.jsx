import { useState } from "react";

const Display = ({ propUsers }) => {
  
  return (
    <div className="mockup-code w-96">
      <ul>
        {propUsers?.map((m) => (
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
