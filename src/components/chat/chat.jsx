import { getAuth } from "firebase/auth";
import { addDoc, collection, limit, orderBy, query, serverTimestamp } from "firebase/firestore";
import { useRef, useState } from "react";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "./style.css";
import { app, databaseApp } from "./firebaseConfig";

const auth = getAuth(app);

export const Chat = () => {
  const [user] = useAuthState(auth);
  return (
    <div className='App'>
      <header>
         <h1>ReactChat⚛️</h1>
        <SignOut />
      </header>
      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
};

export const ChatRoom = () => {
  const dummy = useRef()
  const messagesRef = collection(databaseApp, "messages");
  const q = query(messagesRef, orderBy("createdAt"), limit(25));
  const [messages] = useCollectionData(q, { idField: "id" });

  const [formValue, setFormValue] = useState("");
  const sendMessage = async (e) => {
    e.preventDefault();
    const { photoURL, uid } = auth.currentUser;

    await addDoc(messagesRef, {
      text: formValue,
      uid,
      photoURL,
      createdAt: serverTimestamp()
    });
    setFormValue('')
    dummy.current.scrollIntoView({behavior: 'smooth'})
  };

  return (
    <>
      <main className="containerMessage">
        {messages &&
          messages.map((msg, index) => <ChatMessage key={index} message={msg} />)}
          <div ref={dummy}></div>
      </main>
      <form className="formMensagem" onSubmit={sendMessage}>
        <input className="inputMensagem"
          type="text"
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button className="button_login" type="submit"  disabled={!formValue}>Enviar</button>
      </form>
    </>
  );
};

export const ChatMessage = (props) => {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  return (
    <div className={`message ${messageClass}`}>
      <img className="chat" src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
      <p className="mensagem">{text}</p>
    </div>
  );
};

export const SignIn = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return <button className="sign-in" onClick={() => signInWithGoogle()}>logar com Google</button>;
};

export const SignOut = () => {
  return (
    auth.currentUser && <button className="sign-out" onClick={() => auth.signOut()}>Sair</button>
  );
};