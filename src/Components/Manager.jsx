import React from "react";
import { ToastContainer, toast , Bounce } from "react-toastify";
import { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");

    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const copyText = (text) => {
    toast('Copied to CLipboard!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce
        });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    if (ref.current.src.includes("eye.svg")) {
      passwordRef.current.type = "text";
      ref.current.src = "eye-open.svg";
    } else {
      passwordRef.current.type = "password";
      ref.current.src = "eye.svg";
    }
  };

  const savePassword = () => {
    console.log(form);
    if(form.site.length>3 && form.username.length>3 && form.password.length>3){
    setPasswordArray([...passwordArray, {...form, id:uuidv4()}]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id:uuidv4()}]));
    
    console.log(passwordArray);
    setForm({ site: "", username: "", password: "" })
    toast('Password Saved!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce
        });
    }
    else{
        toast('Error Password not saved!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce
            });
    }
  };
  const deletePassword = (id) => {
    console.log("Deleting password with id " , id);
    let c = confirm("Do you really want to delete this password ?")
    if(c){
     setPasswordArray(passwordArray.filter(item=>item.id!==id));
     localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
     toast('Password Deleted!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce
        });
    }
  };
  const editPassword = (id) => {
    console.log("Editing password with id " , id);
    setForm(passwordArray.filter(i=>i.id===id)[0])
    setPasswordArray(passwordArray.filter(item=>item.id!==id));

  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
     <ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover={false}
theme="light"
transition= {Bounce}
/>
      

      <div className="p-5  md:container md:px-40 md:py-16 md:mx-auto ">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-500"> &lt;</span>
          <span className="">Pass</span>
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your own password manager
        </p> 
        <div className=" flex flex-col p-4 gap-8 items-center">
        
          <input
            value={form.site}
            onChange={handleChange}
            className="rounded-full bg-white border border-green-500 w-full text-black p-4 py-1"
            type="text"
            placeholder="Enter Website URL"
            name="site"
            id=""
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8  ">
            <input
              value={form.username}
              onChange={handleChange}
              className="rounded-full bg-white border border-green-500 w-full text-black p-4 py-1"
              type="text"
              placeholder="Enter Username"
              name="username"
              id=""
            />
            
            <div className="relative flex items-center ">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                className="rounded-full bg-white border border-green-500 w-full text-black p-4 py-1 "
                type="text"
                placeholder="Enter Password"
                name="password"
                id=""
              />
              <span className="absolute right-0">
                {" "}
                <img
                  ref={ref}
                  src="eye-open.svg"
                  alt="eye"
                  width="40"
                  className="p-2 cursor-pointer   "
                  onClick={showPassword}
                />{" "}
              </span>
            </div>
          </div>
          

          <button
            onClick={savePassword}
            className="flex justify-center items-center bg-green-500 hover:bg-green-400 px-7 py-2 rounded-full w-fit gap-2 border-2 border-green-700"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save Password
          </button>
          </div> 
        <div className="passwords">
          <h2 className="text-2xl font-bold py-4 ">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 && (
            <table class="table-auto w-full rounded-md overflow-hidden mb-10 ">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100 ">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="  items-center justify-center py-2  text-center ">
                        <div
                          className="flex justify-center items-center copy "
                          onClick={() => {
                            copyText(item.site);
                          }}
                        >
                          <a href={item.site} target="_blank">
                            {" "}
                            {item.site}
                          </a>

                          <img
                            src="copy.svg"
                            alt="copy"
                            width={20}
                            className={" cursor-pointer "}
                          />
                        </div>
                      </td>

                      <td
                        className=" py-2  text-center copy  "
                        onClick={() => {
                          copyText(item.username);
                        }}
                      >
                        <div className="flex justify-center">
                          {" "}
                          {item.username}
                          <img
                            src="copy.svg"
                            alt="copy"
                            width={20}
                            className={" cursor-pointer "}
                          />
                        </div>
                      </td>

                      <td
                        className="py-2  text-center copy "
                        onClick={() => {
                          copyText(item.password);
                        }}
                      >
                        <div className="flex justify-center">
                          {item.password}
                          <img
                            src="copy.svg"
                            alt="copy"
                            width={20}
                            className={" cursor-pointer "}
                          />
                        </div>
                      </td>
                      <td
                        className="py-2 flex justify-center gap-2 text-center copy "
                      >
                      <span className="cursor-pointer"><img src="edit.svg" alt="edit" width={20} onClick={ ()=>{editPassword(item.id)}} /></span>
                      <span className="cursor-pointer"><img src="delete.svg" alt="edit" width={20}  onClick={ ()=>{deletePassword(item.id)}}/></span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
