import { useEffect, useState } from "react";
import style from "@/pages/components/ChatRoom.module.scss";
import getMessages from "@/api/get-messages";

interface ChatRoomProps{
    from: string
    to: string
    senderName: string
}

const ChatRoom = (props: ChatRoomProps) => {

    const { from, to, senderName } = props;

    const [socket, setSocket] = useState<any>();

    const [messages, setMessages] = useState<Array<any>>([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const skt = new WebSocket('ws://localhost:8080/send-message', from);

        skt.onopen = () => {
            console.log('WebSocket connection established.');
        };

        skt.onmessage = (event: any) => {

            const newMessage = JSON.parse(event.data);
            console.log(newMessage)

            if (newMessage.to == from && newMessage.from == to ||
                newMessage.to == to && newMessage.from == from) 
                setMessages([...messages, newMessage]);

        };

        skt.onerror = (error: any) => {
            console.error('WebSocket error:', error);
        };

        skt.onclose = (event: any) => {
            console.log('WebSocket connection closed:', event.code, event.reason);
        };

        setSocket(skt)

    },[messages]);

    useEffect(() => {
        const get = async () => {

            const response = await getMessages(from, to);
            if (response != -1){

                if (response) setMessages(response);

            }

        }

        get();

    }, [from, to]);

    const onSendButtonClicked = async (e: any) => {
        e.preventDefault();

        if (message === "") return;

        const newMessage = {
            from: from,
            to: to,
            message: message
        }

        setMessage("");

        // Send Message to Database
        socket.send(JSON.stringify(newMessage));
    }

    return ( 
        <div className={style.chat_room}>
            <div className={style.chat_container}>
                <div className={style.top}>
                {
                messages.map((message: any) => {

                    return message.from === from ?
                        <div className={style.from} key={message.ID}>
                        <h6>You</h6>
                        <div className={style.bubble}>{message.message}</div>
                        </div> :
                        <div className={style.to} key={message.ID}>
                        <h6>{senderName}</h6>
                        <div className={style.bubble}>{message.message}</div>
                    </div>

                })
                }
            </div>
            <form className={style.bottom} onSubmit={ onSendButtonClicked }>
                <input 
                    type="text" 
                    className={style.textfield} 
                    value={message}
                    onChange={(e: any) => setMessage(e.target.value)}
                />
                <button 
                className={style.button}
                >
                Send
                </button>
            </form>
            </div>
        </div> 
    );

}

export default ChatRoom;