"use client"

export default function AuthPage({isSignin} : {
  isSignin : boolean
}) {

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="p-6 m-2 bg-white rounded">
          <div className="p-2">
          <input type="text" placeholder="Email" className="text-black"></input>
          </div>
          
          <div className="p-2">
          <input type="password" placeholder="Enter your password" className="text-black"/>
          </div>
          
          <div>
            <button
            className="pt-2 text-black"
            onClick={() => {

            }}
            >
              {isSignin ? "Sign in" : "Signup"}
            </button>
          </div>
      </div>
    </div>
  )

}