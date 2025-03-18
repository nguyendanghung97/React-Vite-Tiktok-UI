export const toggleVideoProperty = <T extends { [key: string]: any }>(
    setState: React.Dispatch<React.SetStateAction<T[]>>,
    index: number,
    key: keyof T,
) => {
    setState((prevVideos) => prevVideos.map((video, i) => (i === index ? { ...video, [key]: !video[key] } : video)));
};
