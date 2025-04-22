import { useSyncExternalStore } from 'react';

export const useVideoProgress = (video: HTMLVideoElement | null) => {
    // useSyncExternalStore: hook React được sử dụng để kết nối với dữ liệu ngoài (external store) và cập nhật UI khi dữ liệu thay đổi mà không cần phải sử dụng useState hoặc useEffect
    return useSyncExternalStore(
        // subscribe: dùng callback() báo hiệu với React rằng snapshot mới cần được đọc lại mà không cần cập nhật state
        (callback) => {
            let frameId: number;

            const tick = () => {
                frameId = requestAnimationFrame(tick);
                callback(); // trigger subscriber
            };
            frameId = requestAnimationFrame(tick);

            return () => cancelAnimationFrame(frameId);
        },
        // getSnapshot: lấy giá trị theo real-time
        () => {
            if (!video || !video.duration) return 0;
            return (video.currentTime / video.duration) * 100;
        },
    );
};
