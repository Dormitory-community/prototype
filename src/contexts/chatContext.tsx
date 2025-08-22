import React, { createContext, useContext, useState, useCallback } from "react"

export type Message = {
    id: string
    content: string
    timestamp: string
    isFromMe: boolean
    isRead?: boolean
}

type MessagesMap = Record<string, Message[]> // roomId -> messages
type HasMoreMap = Record<string, boolean> // roomId -> hasMore

type ChatContextType = {
    messagesMap: MessagesMap
    getMessages: (roomId: string) => Message[]
    sendMessage: (roomId: string, content: string) => Promise<Message>
    loadMoreMessages: (roomId: string, cursor: string) => Promise<Message[]>
    hasMoreMessages: (roomId: string) => boolean
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [messagesMap, setMessagesMap] = useState<MessagesMap>({})
    const [hasMoreMap, setHasMoreMap] = useState<HasMoreMap>({})

    const getMessages = useCallback((roomId: string) => {
        return messagesMap[roomId] ?? []
    }, [messagesMap])

    const hasMoreMessages = useCallback((roomId: string) => {
        return hasMoreMap[roomId] ?? true
    }, [hasMoreMap])

    const sendMessage = useCallback(async (roomId: string, content: string) => {
        // 옵티미스틱 업데이트
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

        try {
            // TODO: 실제 API 호출
            // const response = await api.post(`/rooms/${roomId}/messages`, { content })
            // newMsg.id = response.data.id // 서버에서 받은 실제 ID로 업데이트
        } catch (error) {
            // 실패 시 메시지 제거
            setMessagesMap(prev => {
                const prevRoom = prev[roomId] ?? []
                return {
                    ...prev,
                    [roomId]: prevRoom.filter(msg => msg.id !== newMsg.id)
                }
            })
            throw error
        }

        return newMsg
    }, [])

    const loadMoreMessages = useCallback(async (roomId: string, cursor: string) => {
        try {
            // TODO: 실제 API 호출
            // const response = await api.get(`/rooms/${roomId}/messages?cursor=${cursor}&limit=20`)
            // const newMessages: Message[] = response.data.messages
            // const hasMore = response.data.hasMore

            // Mock API 응답 시뮬레이션
            await new Promise(resolve => setTimeout(resolve, 1000)) // 로딩 시뮬레이션

            // Mock 데이터 생성 (실제로는 서버에서 받아올 데이터)
            const mockOlderMessages: Message[] = Array.from({ length: 15 }, (_, i) => {
                const msgIndex = parseInt(cursor.replace('msg-', '')) - i - 1
                if (msgIndex <= 0) return null

                return {
                    id: `msg-${msgIndex}`,
                    content: `이전 메시지 ${msgIndex}입니다. 페이지네이션 테스트용 메시지입니다.`,
                    timestamp: `2024-01-${Math.max(1, 15 - Math.floor(i / 5))} ${Math.max(10, 14 - Math.floor(i / 3))}:${Math.max(10, 60 - (i * 3))}`,
                    isFromMe: i % 3 === 1,
                    isRead: true,
                }
            }).filter(Boolean) as Message[]

            const hasMore = mockOlderMessages.length === 15 && parseInt(cursor.replace('msg-', '')) > 15

            // 상태 업데이트
            if (mockOlderMessages.length > 0) {
                setMessagesMap(prev => {
                    const prevRoom = prev[roomId] ?? []
                    return {
                        ...prev,
                        [roomId]: [...mockOlderMessages, ...prevRoom]
                    }
                })
            }

            setHasMoreMap(prev => ({
                ...prev,
                [roomId]: hasMore
            }))

            return mockOlderMessages
        } catch (error) {
            console.error('Failed to load more messages:', error)
            throw error
        }
    }, [])

    return (
        <ChatContext.Provider value={{
            messagesMap,
            getMessages,
            sendMessage,
            loadMoreMessages,
            hasMoreMessages
        }}>
            {children}
        </ChatContext.Provider>
    )
}

export const useChat = () => {
    const ctx = useContext(ChatContext)
    if (!ctx) throw new Error("useChat must be used within ChatProvider")
    return ctx
}