interface KakaoShareLink {
    sendDefault(options: {
        objectType: string
        text: string
        link: { webUrl: string; mobileWebUrl: string }
    }): void
}

interface Kakao {
    init(appKey: string): void
    isInitialized(): boolean
    Share: KakaoShareLink
}

interface Window {
    Kakao: Kakao
}
