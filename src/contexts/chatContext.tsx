import React, { createContext, useContext, useState, useCallback } from "react"

export type Message = {
    id: string
    content: string
    timestamp: string
    isFromMe: boolean
    isRead?: boolean
}

type MessagesMap = Record<string, Message[]> // roomId -> messages

type ChatContextType = {
    messagesMap: MessagesMap
    getMessages: (roomId: string) => Message[]
    sendMessage: (roomId: string, content: string) => Promise<Message>

}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [messagesMap, setMessagesMap] = useState<MessagesMap>({})

    const getMessages = useCallback((roomId: string) => {
        return messagesMap[roomId] ?? []
    }, [messagesMap])

    const sendMessage = useCallback(async (roomId: string, content: string) => {
        // 옵티미스틱 업데이트 (실제론 여기서 API 호출하면 됨)
        const newMsg: Message = {
            id: `msg-${Date.now()}`,
            content,
            timestamp: new Date().toISOString(),
            isFromMe: true,
            isRead: true,
        }

        setMessagesMap(prev => {
            const prevRoom = prev[roomId] ?? []
            return { ...prev, [roomId]: [...prevRoom, newMsg] }
        })

        // TODO: 실제 API 호출
        // await api.post(`/rooms/${roomId}/messages`, { content })

        return newMsg
    }, [])

    return (
        <ChatContext.Provider value={{ messagesMap, getMessages, sendMessage }}>
            {children}
        </ChatContext.Provider>
    )
}

export const useChat = () => {
    const ctx = useContext(ChatContext)
    if (!ctx) throw new Error("useChat must be used within ChatProvider")
    return ctx
}
