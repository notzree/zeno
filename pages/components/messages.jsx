import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
async function saveMessages(messageInfo) {
  const response = await fetch("/api/message", {
    method: "POST",
    body: JSON.stringify(messageInfo),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  document.getElementById("inputBox").value = "";
  return await response.json();
  
}

const Message = ({ propMsg,propUserId,propSession}) => {
  const [realMsg, setRealMsg] = useState(propMsg);

  useEffect(() => {
    
    const listener = async(event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        const temp = document.getElementById("inputBox").value;
        const messageBody = {
          Message: temp,
          authorId: propUserId,
        };
       await saveMessages(messageBody);
       setRealMsg([... realMsg, {Message: temp} ]);
        

      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [realMsg,propMsg]);

  const router = useRouter();
  // Call this function whenever you want to
  // refresh props!
  const refreshData = () => {
    router.replace(router.asPath);
    setRealMsg(propMsg);
  }



  useEffect(()=>{
    if(realMsg!=propMsg|| realMsg==null){
      refreshData();
    }
  },[propUserId])
  console.log(propUserId);
  console.log(propMsg);
  console.log(realMsg);
  return (
    <>
      <div className="mockup-code overflow-hidden break ">
        <ul className="">
          {realMsg?.map((m,i) => (
            <li key={i} className="w-96 break-normal overflow-hidden">
              <pre data-prefix=">">
                <code className="w-">
                  {m.Message}
                </code>
              </pre>
            </li>
          ))}
        </ul> 
        <input
          id="inputBox"
          type="text"
          name="Message"
          placeholder="   ..."
          className="input w-full max-w-sm input-ghost mt-2"
        ></input>
      </div>
    </>
  );
};

export default Message;
