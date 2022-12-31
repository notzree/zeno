import { useEffect,useState } from "react";

async function saveMessages(messageInfo) {
  
  const response = await fetch('/api/message', {
    method: "POST",
    body: JSON.stringify(messageInfo)
    
  });
   if (!response.ok) {
     throw new Error(response.statusText);
   }
  return await response.json();

}




const Message = () => {

  // useEffect(() => {
  //   const listener = (event) => {
  //     if (event.code === "Enter" || event.code === "NumpadEnter") {
  //       console.log("Enter key was pressed. Run your function.");
  //       event.preventDefault();
  //       try {
  //         saveMessages(messageData.value);
  //       } catch (e) {
  //         console.log(e);
  //       }
  //     }
  //   };
  //   document.addEventListener("keydown", listener);
  //   return () => {
  //     document.removeEventListener("keydown", listener);
  //   };
  // }, []);






  const handleSubmit = async (event) =>{
    try{
       event.preventDefault();
       const messageBody = {Message: event.target.Message.value, authorId: 1}
      saveMessages(messageBody);
      

   }catch(e){
       console.log(e);
   }
}
  return (
    <>
      <div className="mockup-code">
        <form className=" form-control" onSubmit={handleSubmit}>
          <input
            type="text"
            name="Message"
            placeholder=". . . "
            className="input w-full max-w-sm input-primary"
          ></input>
          <button type = "submit" className="btn btn-primary">Submit</button>
        </form>
         
      </div>
    </>
  );
};

export default Message;
