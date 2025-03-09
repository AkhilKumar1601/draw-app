"use client"

export default function AuthPage({isSignin} : {
  isSignin : boolean
}) {

   return (
    <div className="w-screen h-screen flex justify-center items-center">

      <div className="p-6 m-2 bg-white rounded">

        <div className="p-2">
          <input type="text" placeholder="Email" className="text-black" />
        </div>

        <div className="p-2">
          <input type="password" placeholder="Enter your password" className="text-black" />
        </div>
        

        <div className="pt-2">
          <button onClick={() => {

          }} className="text-black">
            {isSignin ? "Sign in" : "Sign up"}
          </button>
        </div>

      </div>
      
    </div>
   )

}