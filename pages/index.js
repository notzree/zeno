import Message from "./components/messages";
import {useEffect, useState } from "react";
import Account from "./components/Account";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { createClient } from '@supabase/supabase-js'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'



export async function getServerSideProps(ctx) {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  const serverSupabase = createServerSupabaseClient(ctx)
  const {
    data: { session },
  } = await serverSupabase.auth.getSession()

  const {data,error} = await supabase
    .from('messages')
    .select()
    .eq('authorId',session?.user?.id)
  
 
   if (!session){
    return {
     props:{
      initialMessages: data,
      user: "not signed in"
     }
   }
   }
    
  return {
    props: {
      initialMessages: data,
      user: session.user
    },
  };
}
export default function Home({ initialMessages,user }) {
  const [accountVisible, setAccountVisible] = useState(false);
  const session = useSession();
  const supabase = useSupabaseClient();



  const handleClick = ()=>{
    setAccountVisible(current=>!current);
  };
  


  return (
    <div className="flex justify-center min-w-full my-10">
      {!session ? (
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
        />
      ) : (
        
        <div className="mt-9 flex">
          <Message propMsg={initialMessages} propUserId = {user.id} propSession= {session}/>
          <div className=" px-9">
            <button onClick={handleClick} className = "btn btn-ghost"> Account settings </button>
            {accountVisible && (<Account session={session}/>)}
          </div>
        </div>
      )}
    </div>
  );
}
