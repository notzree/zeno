import { useState, useEffect,  } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router';
export default function Account({ session}) {
  const supabase = useSupabaseClient()
  

  const user = useUser()
   //figure out how to set to null rather than undefined. 
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const router = useRouter();
  // Call this function whenever you want to
  // refresh props!
  const refreshData = () => {
    router.replace(router.asPath);
  }




  async function getProfile() {
    try {
      setLoading(true)

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({ username, website, avatar_url }) {
    try {
      setLoading(true)

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      }

      let { error } = await supabase.from('profiles').upsert(updates)
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(()=>{
    getProfile()
  },[])

  return (
    <div className=" form-control ">
      <div >
        <label htmlFor="email" className='label'>Email</label>
        <input id="email" type="text" defaultValue={session?.user?.email}  className='input input-disabled min-w-min'/>
      </div>
      <div>
        <label htmlFor="username" className='label'>Username</label>
        <input
          id="username"
          type="text"
          defaultValue={username || ''}
          onChange={(e) => setUsername(e.target.value)}
          className='input min-w-min'
        />
      </div>
      <div>
        <label htmlFor="website" className='label'>Website</label>
        <input
          id="website"
          type="website"
          defaultValue={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
          className='input min-w-min'
        />
      </div>

      <div className='py-4'>
        <button
          className="btn btn-primary"
          onClick={() => updateProfile({ username, website, avatar_url })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <button className="btn" onClick={async () => 
          { await supabase.auth.signOut()
            refreshData();
          }}>
          Sign out
        </button>
      </div>
    </div>
  )
}