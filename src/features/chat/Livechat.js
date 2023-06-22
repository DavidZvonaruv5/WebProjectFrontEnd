import useAuth from '../../hooks/useAuth'
import React, { useRef, useState } from 'react'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import './chatStyle.css'
import { useEffect } from 'react';



import { useCollectionData } from 'react-firebase-hooks/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBsQjyCjeoPPYx6tVKwE9A3uYGqfGT5j-E",
    authDomain: "livachat-b9b5e.firebaseapp.com",
    projectId: "livachat-b9b5e",
    storageBucket: "livachat-b9b5e.appspot.com",
    messagingSenderId: "247290249060",
    appId: "1:247290249060:web:d0d19073f05d028868c471"
  }
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const firestore = firebase.firestore()



const Livechat = () => {
  
    
    //we are using the useAuth hook to get the username and status of the user
    const {username,isAdmin} = useAuth()
    

  let AdminButton = null
  if (isAdmin) {
    AdminButton = (
      <button className="AdminButton"
        onClick={async () => {
          const messagesRef = firestore.collection('messages')
          const snapshot = await messagesRef.get()
          const batch = firestore.batch()

          snapshot.docs.forEach((doc) => {
            batch.delete(doc.ref)
        })

        await batch.commit()
      }}
      >
        Clear Chat
      </button>
    )
  }

    let content

    content = (
        <>
          <h1>This is a live chat for the company</h1>
          <h4 className="userTitle">User: {username}</h4>
          <hr></hr>
        <div>
            <ChatRoom></ChatRoom>
          </div>
          {AdminButton}
        </>
    )
  function ChatRoom() {
        const dummy = useRef()
        const messagesRef = firestore.collection('messages')
        const query = messagesRef.orderBy('createdAt')
      
        const [messages] = useCollectionData(query, { idField: 'id' })
      
        const [formValue, setFormValue] = useState('')
      
      
        const sendMessage = async (e) => {
          e.preventDefault()
          await messagesRef.add({
              text: formValue,
              uid: username,
              createdAt: firebase.firestore.FieldValue.serverTimestamp()
          })
      
          setFormValue('');
          dummy.current.scrollIntoView({ behavior: 'smooth' });
        }
        
        useEffect(() => {
          if(dummy.current) {
            dummy.current.scrollIntoView({ behavior: 'smooth' });
          }
        }, [messages]);
    
        return (<>
          <main className="Chatroom">
      
            {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
      
            <span ref={dummy}></span>
      
          </main>
      
          <form className="chat-form" onSubmit={sendMessage}>
      
            <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something" />
      
            <button className='SendToChatButton' type="submit" disabled={!formValue}>🕊️</button>
      
          </form>
        </>)
      }
      
      
      function ChatMessage(props) {
        const { text, uid } = props.message;
    
      
        return (<>
          <div className={`chat-message ${uid === username ? 'self' : 'others'}`}>
            <p>{uid}: {text}</p>
          </div>
        </>)
      }
    return content
}

export default Livechat
